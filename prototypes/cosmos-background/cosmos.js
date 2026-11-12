/*
 * Bronze Cosmos — a dependency-free WebGL2 space backdrop.
 *
 *   const cosmos = Cosmos.create(canvas, options)
 *   cosmos.setProgress(f)        // camera keyframe index, fractional (0 … KEYS.length - 1)
 *   cosmos.set('lines', false)   // layers: lines | dust | sparks
 *   cosmos.destroy()
 *
 * Everything is procedural: no textures, no assets. The scene is a real 3D
 * layout (planets, sun, dust at finite distances; stars and the sky at
 * infinity), so pointer and scroll parallax fall out of one moving camera.
 */
(function (global) {
  'use strict';

  // ───────────────────────────── math ─────────────────────────────
  const TAU = Math.PI * 2;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const mix = (a, b, t) => a + (b - a) * t;
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const mul = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const len = (a) => Math.hypot(a[0], a[1], a[2]);
  const norm = (a) => { const l = len(a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
  const rotX = (v, a) => { const c = Math.cos(a), s = Math.sin(a); return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c]; };
  const rotY = (v, a) => { const c = Math.cos(a), s = Math.sin(a); return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c]; };
  const rotZ = (v, a) => { const c = Math.cos(a), s = Math.sin(a); return [v[0] * c - v[1] * s, v[0] * s + v[1] * c, v[2]]; };
  const catmull = (p0, p1, p2, p3, t) => {
    const t2 = t * t, t3 = t2 * t;
    return p1.map((_, i) => 0.5 * (2 * p1[i] + (-p0[i] + p2[i]) * t +
      (2 * p0[i] - 5 * p1[i] + 4 * p2[i] - p3[i]) * t2 + (-p0[i] + 3 * p1[i] - 3 * p2[i] + p3[i]) * t3));
  };
  // Deterministic PRNG so the sky is the same sky on every load.
  const rng = (seed) => {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  const gaussian = (R) => () => Math.sqrt(-2 * Math.log(1 - R() + 1e-9)) * Math.cos(TAU * R());
  // Orthonormal in-plane basis for a plane with normal n; e1 points along `hint`.
  const planeBasis = (n, hint) => { const e1 = norm(sub(hint, mul(n, dot(hint, n)))); return [e1, cross(n, e1)]; };

  // ───────────────────────── scene layout ─────────────────────────
  // World units are arbitrary; the opening camera sits at the origin looking down -Z.
  const SUN = [704, 488, -4000];
  const SUN_SIZE = 0.6;                      // glow quad half-size, in tan(angle)
  const SUN_COL = [3.0, 2.55, 2.0];
  const CORE_DIR = norm([-0.45, 0.38, -0.8]); // galactic core
  const GAL_N = norm(cross(CORE_DIR, norm([0.7, -0.3, -0.65]))); // Milky Way plane normal
  const GAL_B = cross(GAL_N, CORE_DIR);
  const ECLIPTIC_N = norm(cross(norm(SUN), norm([0.85, 0.42, 0.3])));
  const ECLIPTIC_A = norm(SUN);

  const HERO = [58, -9.4, -160], HERO_R = 44;
  const GIANT = [-520, 100, -800], GIANT_R = 46;
  const GIANT_AXIS = norm([0.15, 0.85, 0.5]);

  // Hero moon orbit: plane chosen to pass through the opening position of the moon.
  const MOON0 = sub([-4.8, -2.7, -110], HERO);
  const MOON_RHO = len(MOON0);
  const MOON_E1 = norm(MOON0);
  const MOON_N = norm(sub([0.1, 0.95, 0.3], mul(MOON_E1, dot([0.1, 0.95, 0.3], MOON_E1))));
  const MOON_E2 = cross(MOON_N, MOON_E1);
  // Giant's moon orbits in the ring plane.
  const [GM_E1, GM_E2] = planeBasis(GIANT_AXIS, [1, 0, 0]);
  const GM_RHO = GIANT_R * 3.1;

  const PLANETS = [
    { id: 'hero', pos: HERO, r: HERO_R, kind: 0, seed: 3.7, axis: norm([0.25, 1, 0.1]), spin: 0.004,
      colA: [0.045, 0.026, 0.017], colB: [0.34, 0.19, 0.095], colC: [0.8, 0.6, 0.4],
      atmo: [1.0, 0.5, 0.19], atmoH: 0.03, atmoGain: 1.0, ember: 1.0 },
    { id: 'moon', pos: [0, 0, 0], r: 4.2, kind: 0, seed: 11.3, axis: [0, 1, 0], spin: 0.01,
      colA: [0.07, 0.058, 0.05], colB: [0.4, 0.34, 0.28], colC: [0.82, 0.75, 0.66],
      atmo: [1.0, 0.72, 0.5], atmoH: 0.012, atmoGain: 0.1, ember: 0 },
    { id: 'giant', pos: GIANT, r: GIANT_R, kind: 1, seed: 5.1, axis: GIANT_AXIS, spin: 0.012,
      colA: [0.46, 0.27, 0.12], colB: [0.92, 0.74, 0.48], colC: [0.27, 0.13, 0.06],
      atmo: [1.0, 0.68, 0.34], atmoH: 0.03, atmoGain: 0.75, ember: 0,
      ring: [1.32, 2.3, 0.92], ringCol: [0.98, 0.8, 0.54] },
    { id: 'giantMoon', pos: [0, 0, 0], r: 3.0, kind: 0, seed: 23.9, axis: [0, 1, 0], spin: 0.01,
      colA: [0.09, 0.06, 0.04], colB: [0.5, 0.36, 0.24], colC: [0.86, 0.72, 0.56],
      atmo: [1.0, 0.72, 0.5], atmoH: 0.012, atmoGain: 0.1, ember: 0 },
    { id: 'far', pos: [-590, 190, -1330], r: 12, kind: 1, seed: 8.8, axis: norm([0.3, 0.9, -0.2]), spin: 0.01,
      colA: [0.5, 0.42, 0.34], colB: [0.86, 0.8, 0.72], colC: [0.34, 0.25, 0.19],
      atmo: [1.0, 0.8, 0.6], atmoH: 0.04, atmoGain: 0.7, ember: 0 },
  ];
  const GALAXY = { pos: [3500, 1750, -6000], scale: 860, axis: norm([0.3, 0.45, 0.84]) };

  // Camera keyframes. setProgress(i) puts the camera exactly on KEYS[i].
  const KEYS = [
    { pos: [0, 0, 0],          look: [0, 0, -300],        fov: 52 },  // eclipse
    { pos: [-370, 70, -610],   look: [-468, 100, -892],   fov: 50 },  // ringed giant, backlit
    { pos: [-410, 240, -910],  look: [-596, 330, -1126],  fov: 60 },  // open sky, galactic core
  ];

  // ──────────────────────────── shaders ────────────────────────────
  const HEAD = '#version 300 es\nprecision highp float;\n';
  const NOISE = `
float hash13(vec3 p){ p = fract(p * .1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float vnoise(vec3 x){
  vec3 i = floor(x), f = fract(x);
  vec3 u = f*f*f*(f*(f*6. - 15.) + 10.);
  return mix(mix(mix(hash13(i), hash13(i + vec3(1,0,0)), u.x), mix(hash13(i + vec3(0,1,0)), hash13(i + vec3(1,1,0)), u.x), u.y),
             mix(mix(hash13(i + vec3(0,0,1)), hash13(i + vec3(1,0,1)), u.x), mix(hash13(i + vec3(0,1,1)), hash13(i + vec3(1,1,1)), u.x), u.y), u.z);
}
const mat3 M3 = mat3(0.00, 0.80, 0.60, -0.80, 0.36, -0.48, -0.60, -0.48, 0.64);
float fbm3(vec3 p){ float s = 0., a = .5; for (int i = 0; i < 3; i++){ s += a*vnoise(p); p = M3*p*2.03; a *= .5; } return s/.875; }
float fbm4(vec3 p){ float s = 0., a = .5; for (int i = 0; i < 4; i++){ s += a*vnoise(p); p = M3*p*2.03; a *= .5; } return s/.9375; }
float fbm5(vec3 p){ float s = 0., a = .5; for (int i = 0; i < 5; i++){ s += a*vnoise(p); p = M3*p*2.03; a *= .5; } return s/.96875; }
`;
  const CAM = 'uniform vec3 uCam; uniform mat3 uCamRot; uniform vec2 uProj;\n' +
    'vec4 project(vec3 w){ vec3 v = (w - uCam) * uCamRot; return vec4(v.xy * uProj, 0., -v.z); }\n';

  const VS_FULL = HEAD + `
out vec2 vUv; out vec2 vNdc;
void main(){
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p; vNdc = p*2. - 1.; gl_Position = vec4(vNdc, 0., 1.);
}`;

  // A quad placed in the world: center + corner.x*U + corner.y*V.
  const VS_QUAD = HEAD + CAM + `
uniform vec3 uCenter, uU, uV;
out vec2 vUv; out vec3 vWorld;
void main(){
  vec2 c = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1))*2. - 1.;
  vUv = c; vWorld = uCenter + uU*c.x + uV*c.y;
  gl_Position = project(vWorld);
}`;

  // Sky: Milky Way band, bronze emission clouds, dust extinction. Alpha carries
  // star transmittance so stars dim behind dark dust.
  const FS_SKY = HEAD + NOISE + `
in vec2 vNdc; out vec4 o;
uniform mat3 uCamRot; uniform vec2 uTan; uniform float uTime, uSunVis;
uniform vec3 uSunDir, uGalN, uCoreDir;
void main(){
  vec3 rd = normalize(uCamRot * vec3(vNdc * uTan, -1.));
  float t = uTime;
  vec3 p = rd * 2.1;
  vec3 w = vec3(fbm3(p + vec3(1.7, 9.2, 3.1) + t*.006), fbm3(p + vec3(8.3, 2.8, 5.5) - t*.005), fbm3(p + vec3(4.1, 6.7, 1.3) + t*.004)) - .5;
  float n1 = fbm5(p + w*2.4);
  float n2 = fbm5(p*2.6 + w*3.5 + 11.);
  float big = fbm3(rd*.85 + 5.);

  float lat = dot(rd, uGalN);
  float cd = dot(rd, uCoreDir);
  float coreP = clamp(cd*.5 + .5, 0., 1.);
  float width = mix(.06, .2, coreP*coreP*coreP);
  float band = exp(-lat*lat/(2.*width*width));
  float sp = max(dot(rd, uSunDir), 0.);

  float rift = fbm5(rd*4.6 + w*1.8 + 3.);
  float lane = smoothstep(.46, .66, rift) * exp(-lat*lat/(2.*width*width*.36));
  float darkCloud = smoothstep(.55, .8, fbm4(p*1.3 + 20. + w));
  float trans = (1. - .88*lane) * (1. - .55*darkCloud);

  float mw = band * (.03 + .55*pow(coreP, 5.)) + .3*exp(-(1. - cd)*26.);
  mw *= .22 + 1.6*n2*n2;
  vec3 mwCol = mix(vec3(.44, .17, .07), vec3(1., .64, .29), smoothstep(0., .9, pow(coreP, 4.)*band));
  mwCol = mix(mwCol, vec3(.42, .17, .24), .28*band*(1. - coreP));
  vec3 col = vec3(.0048, .0032, .0028);
  col += mwCol * mw * trans * .3;

  // Billows are shaded by their density gradient toward the sun: lit rims, umber backs.
  vec3 st = uSunDir - rd*dot(uSunDir, rd); st /= length(st) + 1e-4;
  float rim = clamp((n1 - fbm5(p + w*2.4 + st*.09))*7. + .45, 0., 1.);
  float mask = smoothstep(.5, .82, big + .2*band + .35*pow(sp, 3.));
  float dens = smoothstep(.46, .86, n1) * mask;
  float fil = pow(1. - abs(2.*n2 - 1.), 4.);
  float cloud = dens * (.3 + 1.2*fil);
  vec3 cc = mix(vec3(.12, .038, .013), vec3(.95, .36, .075), rim);
  cc = mix(cc, vec3(1., .66, .26), fil*dens*rim*.8);
  col += cc * cloud * (.11 + .42*pow(sp, 6.)*(.3 + .7*uSunVis)) * (1. - .5*lane);

  col += vec3(1., .5, .18) * (.03*pow(sp, 10.) + .08*pow(sp, 90.)) * (.25 + .75*uSunVis);
  o = vec4(col, trans);
}`;

  const FS_COPY = HEAD + `
in vec2 vUv; out vec4 o; uniform sampler2D uTex;
void main(){ o = texture(uTex, vUv); }`;

  const VS_STARS = HEAD + CAM + `
layout(location=0) in vec3 aPos; layout(location=1) in vec4 aData; layout(location=2) in vec3 aCol;
uniform float uTime, uPx, uMaxPt; uniform sampler2D uSky;
out vec3 vCol; out float vSpike;
void main(){
  gl_Position = project(aPos);
  float tr = textureLod(uSky, gl_Position.xy/gl_Position.w*.5 + .5, 0.).a;
  float tw = 1. + aData.w*(.7*sin(uTime*aData.z + aData.y) + .3*sin(uTime*aData.z*2.7 + aData.y*1.7));
  float s = aData.x * uPx;
  float m = max(s, 1.5);
  gl_PointSize = min(m, uMaxPt);
  vSpike = smoothstep(7., 12., aData.x);
  vCol = aCol * tw * (s*s)/(m*m) * (.12 + .88*tr);
}`;
  const FS_STARS = HEAD + `
in vec3 vCol; in float vSpike; out vec4 o;
void main(){
  vec2 q = gl_PointCoord*2. - 1.; float d2 = dot(q, q);
  float a = exp(-d2*6.5);
  if (vSpike > 0.) {
    vec2 aq = abs(q);
    float sp = exp(-aq.y*30.)*exp(-aq.x*3.4) + exp(-aq.x*30.)*exp(-aq.y*3.4);
    float big = exp(-d2*46.)*1.7 + exp(-sqrt(d2)*7.5)*.3 + sp*.6;
    a = mix(a, big, vSpike);
  }
  o = vec4(vCol * a * smoothstep(1., .8, sqrt(d2)), 1.);
}`;

  const VS_GALAXY = HEAD + CAM + `
layout(location=0) in vec3 aPos; layout(location=1) in vec4 aData; layout(location=2) in vec3 aCol;
uniform float uTime, uPx, uScale; uniform vec3 uCenter; uniform mat3 uModel;
out vec3 vCol;
void main(){
  gl_Position = project(uCenter + uModel * (aPos * uScale));
  float s = aData.x * uPx; float m = max(s, 1.5);
  gl_PointSize = m;
  vCol = aCol * (s*s)/(m*m) * (1. + .22*sin(uTime*1.1 + aData.y));
}`;
  const FS_POINT = HEAD + `
in vec3 vCol; out vec4 o;
void main(){ vec2 q = gl_PointCoord*2. - 1.; float d2 = dot(q, q); o = vec4(vCol * exp(-d2*5.5) * smoothstep(1., .7, d2), 1.); }`;
  const FS_HAZE = HEAD + `
in vec2 vUv; out vec4 o; uniform float uGain;
void main(){
  float r = length(vUv); float a = atan(vUv.y, vUv.x);
  float arms = .5 + .5*cos(2.*(a - 2.5*log(r + 1e-3)));
  float core = exp(-r*r*46.)*1.5 + exp(-r*10.)*.55;
  float disc = exp(-r*3.4)*.3*(.35 + .65*arms);
  vec3 c = vec3(1., .84, .62)*core + vec3(.86, .47, .22)*disc;
  o = vec4(c * smoothstep(1., .45, r) * uGain, 1.);
}`;

  const FS_SUN = HEAD + `
in vec2 vUv; out vec4 o; uniform float uTime, uGain;
void main(){
  float d = length(vUv); float a = atan(vUv.y, vUv.x);
  float disc = smoothstep(.024, .017, d) * 10.;
  float core = exp(-d*d*1400.) * 5.;
  float corona = .006/(d*d + .0012) * exp(-d*2.6);
  float rays = pow(.5 + .5*sin(a*7. + sin(a*3. + uTime*.07)*1.7 + uTime*.03), 3.) * exp(-d*7.) * .3;
  vec3 c = vec3(1., .93, .82)*(disc + core) + vec3(1., .62, .28)*(corona + rays);
  o = vec4(c * smoothstep(1., .55, d) * uGain, 1.);
}`;

  // Sphere + atmosphere + optional ring system on a camera-facing quad.
  const FS_PLANET = HEAD + NOISE + `
in vec2 vUv; out vec4 o;
uniform vec3 uBx, uBy, uBz, uL, uSunCol;
uniform mat3 uRot;
uniform float uExt, uKind, uSeed, uEmber, uAtmoH, uAtmoGain;
uniform vec3 uColA, uColB, uColC, uAtmo;
uniform vec4 uRing; uniform vec3 uRingN, uRingCol;

float height(vec3 p){
  float h = fbm5(p*1.7 + uSeed);
  float rg = 1. - abs(2.*fbm4(p*3.4 + uSeed*1.3 + 7.) - 1.);
  return h*.62 + rg*rg*.38;
}
vec3 gasAlbedo(vec3 P){
  float lat = P.y;
  float turb = fbm4(vec3(P.x*1.5, lat*4.5, P.z*1.5) + uSeed);
  float y = lat*3.6 + (turb - .5)*.5;
  float b = fbm4(vec3(uSeed*3.1, y, 1.7));
  float b2 = fbm3(vec3(2.3, y*2.7 + 5., uSeed));
  vec3 c = mix(uColA, uColB, smoothstep(.3, .7, b));
  c = mix(c, uColC, smoothstep(.5, .78, b2)*.55);
  c *= .9 + .4*(fbm3(P*vec3(6., 22., 6.) + turb*2.) - .5);
  return c * mix(1., .68, smoothstep(.6, .95, abs(lat)));
}
float ringDensity(float rq, float fw){
  float t = (rq - uRing.x)/(uRing.y - uRing.x);
  if (t <= 0. || t >= 1.) return 0.;
  float k1 = 1. - smoothstep(.12, .5, fw*18.), k2 = 1. - smoothstep(.12, .5, fw*70.);
  float n = mix(.5, vnoise(vec3(rq*18., uSeed, 1.5)), k1);
  float n2 = mix(.5, vnoise(vec3(rq*70., 4.2, uSeed)), k2);
  float e = fw*1.5 + .012;
  float d = smoothstep(0., e, rq - uRing.x) * smoothstep(0., e, uRing.y - rq);
  d *= .2 + .8*smoothstep(.2, .8, n*.6 + n2*.4);
  d *= 1. - .93*(smoothstep(.56, .575, t) - smoothstep(.635, .65, t));
  d *= mix(.45, 1., smoothstep(0., .35, t));
  return d;
}
void main(){
  vec2 uv = vUv * uExt;
  float r = length(uv);
  float px = fwidth(r);

  // Ring-plane hit for the (orthographic) ray through this pixel.
  float dn = dot(uBz, uRingN);
  float zq = -(uv.x*dot(uBx, uRingN) + uv.y*dot(uBy, uRingN)) / (abs(dn) < 1e-3 ? 1e-3 : dn);
  vec3 q = uBx*uv.x + uBy*uv.y + uBz*zq;
  float rq = length(q);
  float fw = fwidth(rq);

  vec3 col = vec3(0.); float alpha = 0.; float z = -1e3;
  if (r < 1.) {
    z = sqrt(1. - r*r);
    vec3 N = normalize(uBx*uv.x + uBy*uv.y + uBz*z);
    vec3 P = uRot * N;
    float ndl = dot(N, uL);
    vec3 alb; float diff;
    if (uKind < .5) {
      vec3 Ll = uRot * uL;
      float h0 = height(P), h1 = height(P + Ll*.015);
      float bump = (h0 - h1)/.015;
      alb = mix(uColA, uColB, smoothstep(.3, .72, h0));
      alb = mix(alb, uColC, smoothstep(.62, .9, h0)*.6);
      diff = clamp(ndl*1.15 + bump*.2, 0., 1.) * smoothstep(-.03, .14, ndl);
    } else {
      alb = gasAlbedo(P);
      diff = smoothstep(-.12, .9, ndl) * pow(z, .25);
    }
    // Shadow of the rings on the globe.
    if (uRing.y > 0.) {
      float dl = dot(uL, uRingN);
      float s = -dot(N, uRingN) / (abs(dl) < 1e-3 ? 1e-3 : dl);
      if (s > 0.) diff *= 1. - .8*uRing.z*ringDensity(length(N + uL*s), .02);
    }
    vec3 surf = alb * (diff * uSunCol + vec3(.075, .05, .034) * (.55 + .45*N.y));
    if (uEmber > 0.) {
      float vn = 1. - abs(2.*fbm4(P*5.5 + uSeed*2.1) - 1.);
      float veins = pow(vn, 42.) * smoothstep(.5, .72, fbm3(P*1.3 + 9.));
      surf += vec3(1., .3, .06) * veins * uEmber * .45 * (1. - smoothstep(-.1, .25, ndl));
    }
    float fres = pow(1. - z, 2.6);
    surf += uAtmo * uAtmoGain * (fres * smoothstep(-.4, .5, ndl) * 1.5 + pow(1. - z, 5.)*.02);
    alpha = 1. - smoothstep(1. - 2.*px, 1., r);
    col = surf * alpha;
  }
  // Atmosphere seen past the limb; the sun-side arc flares when backlit.
  if (r > .9) {
    vec3 nl = normalize(uBx*uv.x + uBy*uv.y);
    float hgt = max(r - 1., 0.);
    float bz = dot(uBz, uL);
    float c = dot(nl, uL) / sqrt(max(1. - bz*bz, 1e-4));
    float back = clamp(-bz, 0., 1.);
    float arc = mix(smoothstep(-.55, .75, c), 1., smoothstep(.992, 1., back));
    float glow = (exp(-hgt/uAtmoH) + .25*exp(-hgt/(uAtmoH*5.))) * arc * (1. + 1.5*back*pow(max(c, 0.), 6.));
    col += uAtmo * uAtmoGain * glow * 1.4 * (1. - alpha);
  }
  if (uRing.y > 0.) {
    float dens = ringDensity(rq, fw);
    if (dens > 0. && (r >= 1. || zq > z)) {
      float b = dot(q, uL), hh = b*b - (rq*rq - 1.);
      float sh = b < 0. ? smoothstep(0., .06, hh) : 0.;
      float sameSide = step(0., dot(uRingN, uL) * dn);
      float fs = pow(max(-dot(uBz, uL), 0.), 3.);
      float lit = mix(dens*(1. - dens*.8)*2.6 + .05, .35 + .65*dens, sameSide);
      float tone = vnoise(vec3(rq*9., 2., uSeed));
      vec3 rc = uRingCol * mix(vec3(.72, .55, .4), vec3(1.), tone);
      vec3 rcol = rc * lit * (.5 + 1.6*fs) * (1. - .96*sh) * uSunCol * .5;
      float ra = dens * uRing.z;
      col = rcol*ra + col*(1. - ra);
      alpha = ra + alpha*(1. - ra);
    }
  }
  o = vec4(col, alpha);
}`;

  // Hairline orbital diagrams drawn on a plane in the world.
  const FS_LINES = HEAD + `
in vec2 vUv; in vec3 vWorld; out vec4 o;
uniform vec3 uCam, uOccC, uColor; uniform float uOccR, uExt, uAlpha, uTickR, uTickN, uDashR, uAxisX;
uniform vec4 uRings, uRingA; uniform vec3 uNodes[4];
float ln(float d, float px, float w){ return 1. - smoothstep(px*w*.3, px*w*.3 + px*.9, d); }
void main(){
  vec2 p = vUv * uExt; float r = length(p);
  float px = fwidth(r);
  float pxi = length(vec2(fwidth(p.x), fwidth(p.y))) * .7071;
  float a = atan(p.y, p.x);
  float I = 0.;
  for (int i = 0; i < 4; i++) { if (uRings[i] > 0.) I += ln(abs(r - uRings[i]), px, 1.2) * uRingA[i]; }
  if (uDashR > 0.) { float seg = fract(a/6.2831853*90.); I += ln(abs(r - uDashR), px, 1.2) * smoothstep(0., .08, seg) * smoothstep(.5, .42, seg) * .32; }
  if (uTickR > 0.) {
    float k = a/6.2831853*uTickN; float idx = floor(k + .5);
    float arc = abs(k - idx)/uTickN*6.2831853*r;
    float major = step(mod(abs(idx), 10.), .5);
    I += ln(arc, pxi, 1.) * step(uTickR, r) * step(r, uTickR*(1. + mix(.018, .046, major))) * .5;
  }
  for (int i = 0; i < 4; i++) {
    vec3 nd = uNodes[i]; float d = length(p - nd.xy);
    if (nd.z > 0.) I += (1. - smoothstep(nd.z, nd.z + pxi*1.5, d)) * .95;
    else if (nd.z < 0.) I += ln(abs(d + nd.z), pxi, 1.3) * .85;
  }
  if (uAxisX < 1e3) I += ln(abs(p.x - uAxisX), pxi, 1.) * smoothstep(uExt, uExt*.7, abs(p.y)) * .34;
  I *= smoothstep(1., .96, max(abs(vUv.x), abs(vUv.y)));
  vec3 rd = vWorld - uCam; float L = length(rd); rd /= L;
  vec3 oc = uCam - uOccC; float b = dot(oc, rd), h = b*b - (dot(oc, oc) - uOccR*uOccR);
  if (h > 0.) { float th = -b - sqrt(h); if (th > 0. && th < L) I = 0.; }
  o = vec4(uColor * I * uAlpha, 1.);
}`;

  // Great circles on the sky with degree ticks (an astrolabe's scales).
  const FS_CELESTIAL = HEAD + `
in vec2 vNdc; out vec4 o;
uniform mat3 uCamRot; uniform vec2 uTan; uniform vec3 uN, uA, uColor; uniform float uAlpha;
void main(){
  vec3 rd = normalize(uCamRot * vec3(vNdc * uTan, -1.));
  float d = dot(rd, uN); float w = fwidth(d);
  float line = 1. - smoothstep(w*.3, w*1.2, abs(d));
  vec3 ip = normalize(rd - uN*d);
  float deg = atan(dot(ip, cross(uN, uA)), dot(ip, uA)) * 57.29578;
  float nearest = floor(deg/2. + .5)*2.;
  float dAng = abs(deg - nearest) / 57.29578;
  float major = step(mod(abs(nearest), 10.), .5);
  float tick = (1. - smoothstep(w*.3, w*1.2, dAng)) * step(0., d) * step(d, mix(.006, .015, major));
  o = vec4(uColor * (line*.5 + tick*.42) * uAlpha, 1.);
}`;

  const VS_DUST = HEAD + `
layout(location=0) in vec3 aSeed; layout(location=1) in vec4 aRand;
uniform vec3 uCam, uSunDir; uniform mat3 uCamRot; uniform vec2 uProj;
uniform float uTime, uBox, uPxPerUnit, uMaxPt, uSunVis, uGain, uTravel;
out vec4 vCol; out float vBlur;
void main(){
  float ph = aRand.y * 6.2831853;
  vec3 p = aSeed * uBox + vec3(.6, .25, .35) * uTime * (.25 + aRand.z*.9);
  p += vec3(sin(uTime*.21 + ph), cos(uTime*.17 + ph*1.3), sin(uTime*.13 + ph*2.1)) * 1.4;
  vec3 rel = mod(p - uCam*uTravel, uBox) - uBox*.5;
  float dist = length(rel);
  vec3 v = rel * uCamRot;
  gl_Position = vec4(v.xy * uProj, 0., -v.z);
  float fade = smoothstep(uBox*.5, uBox*.3, dist) * smoothstep(3., 11., dist);
  float world = mix(.045, .22, aRand.x*aRand.x);
  float px = world / max(-v.z, .1) * uPxPerUnit;
  float coc = abs(1./dist - 1./34.) * .17 * uPxPerUnit;
  float m = clamp(px + coc, 1.5, uMaxPt);
  gl_PointSize = m;
  vBlur = smoothstep(3., 9., coc);
  vec3 dir = rel / dist;
  float ca = max(dot(dir, uSunDir), 0.);
  float phase = .32 + (1.5*pow(ca, 5.) + 6.*pow(ca, 48.)) * (.3 + .7*uSunVis);
  float flick = .75 + .25*sin(uTime*(.6 + aRand.z*2.) + ph*3.);
  vCol = vec4(mix(vec3(1., .66, .3), vec3(1., .9, .72), aRand.w) * phase * flick, fade * pow(min(px/m, 1.), 1.35) * uGain);
}`;
  const FS_DUST = HEAD + `
in vec4 vCol; in float vBlur; out vec4 o;
void main(){
  vec2 q = gl_PointCoord*2. - 1.; float d = length(q);
  float sharp = exp(-d*d*5.);
  float bokeh = smoothstep(1., .55, d) * (.45 + .4*smoothstep(.2, .8, d));
  o = vec4(vCol.rgb * mix(sharp, bokeh, vBlur) * vCol.a, 1.);
}`;

  const VS_SPARK = HEAD + CAM + `
layout(location=0) in vec3 aPos; layout(location=1) in vec3 aInfo;
uniform float uTime, uPx, uMaxPt;
out vec3 vCol;
void main(){
  gl_Position = project(aPos);
  float l = aInfo.x;
  gl_PointSize = clamp(aInfo.y * uPx * (.45 + .55*l) * 2.4, 1.5, uMaxPt);
  float tw = .7 + .3*sin(uTime*18. + aInfo.z*40.);
  vCol = mix(vec3(1., .4, .1), vec3(1., .76, .38), l) * (l*l) * tw * 3.2;
}`;

  const VS_STREAK = HEAD + `
uniform vec3 uA, uB; uniform mat3 uCamRot; uniform vec2 uProj, uRes; uniform float uWidth;
out vec2 vT;
void main(){
  float e = float(gl_VertexID & 1), s = float((gl_VertexID >> 1) & 1)*2. - 1.;
  vec3 va = uA * uCamRot, vb = uB * uCamRot;
  if (va.z > -.001 || vb.z > -.001) { gl_Position = vec4(2., 2., 2., 1.); vT = vec2(0.); return; }
  vec2 na = va.xy*uProj/-va.z, nb = vb.xy*uProj/-vb.z;
  vec2 d = normalize((nb - na)*uRes + 1e-6);
  gl_Position = vec4(mix(na, nb, e) + vec2(-d.y, d.x) * s * uWidth / uRes * 2., 0., 1.);
  vT = vec2(e, s);
}`;
  const FS_STREAK = HEAD + `
in vec2 vT; out vec4 o; uniform float uGain;
void main(){
  float a = pow(vT.x, 2.4) * exp(-vT.y*vT.y*6.) + smoothstep(.965, 1., vT.x) * exp(-vT.y*vT.y*2.5) * 2.;
  o = vec4(vec3(1., .88, .68) * a * uGain, 1.);
}`;

  const FS_FLARE = HEAD + `
in vec2 vNdc; out vec4 o; uniform vec2 uSun; uniform float uAspect, uVis;
float ghost(vec2 p, vec2 c, float r){ float d = length(p - c); return smoothstep(r, r*.55, d) * (.5 + .5*smoothstep(r*.3, r, d)); }
void main(){
  vec2 p = vec2(vNdc.x*uAspect, vNdc.y), s = vec2(uSun.x*uAspect, uSun.y);
  vec2 d = p - s; float rad = length(d); float ang = atan(d.y, d.x);
  float streak = exp(-abs(d.y)*70.)*exp(-abs(d.x)*2.6)*.24 + exp(-abs(d.y)*260.)*exp(-abs(d.x)*1.9)*.24;
  float spikes = pow(abs(cos(ang*3. + .4)), 70.) * exp(-rad*4.2) * .3;
  vec3 g = vec3(.9, .5, .22) * ghost(p, s*-.35, .09) * .045
         + vec3(.9, .62, .34) * ghost(p, s*-.72, .045) * .07
         + vec3(.7, .42, .26) * ghost(p, s*.42, .15) * .03
         + vec3(.95, .7, .4) * ghost(p, s*-1.25, .2) * .028;
  o = vec4((vec3(1., .7, .4)*streak + vec3(1., .86, .66)*spikes + g) * uVis, 1.);
}`;

  const FS_DOWN = HEAD + `
in vec2 vUv; out vec4 o; uniform sampler2D uTex; uniform vec2 uTexel; uniform float uThresh;
void main(){
  vec3 c = (texture(uTex, vUv + uTexel*vec2(-1., -1.)).rgb + texture(uTex, vUv + uTexel*vec2(1., -1.)).rgb
          + texture(uTex, vUv + uTexel*vec2(-1., 1.)).rgb + texture(uTex, vUv + uTexel*vec2(1., 1.)).rgb) * .25;
  if (uThresh > 0.) { float l = max(c.r, max(c.g, c.b)); c *= smoothstep(uThresh*.55, uThresh*1.7, l); c = min(c, vec3(8.)); }
  o = vec4(c, 1.);
}`;
  const FS_UP = HEAD + `
in vec2 vUv; out vec4 o; uniform sampler2D uTex; uniform vec2 uTexel;
void main(){
  vec2 t = uTexel;
  vec3 c = texture(uTex, vUv).rgb*4.
    + (texture(uTex, vUv + vec2(t.x, 0.)).rgb + texture(uTex, vUv - vec2(t.x, 0.)).rgb + texture(uTex, vUv + vec2(0., t.y)).rgb + texture(uTex, vUv - vec2(0., t.y)).rgb)*2.
    + texture(uTex, vUv + t).rgb + texture(uTex, vUv - t).rgb + texture(uTex, vUv + vec2(t.x, -t.y)).rgb + texture(uTex, vUv + vec2(-t.x, t.y)).rgb;
  o = vec4(c/16., 1.);
}`;
  const FS_FINAL = HEAD + `
in vec2 vUv; out vec4 o; uniform sampler2D uScene, uBloomTex; uniform float uTime, uBloom, uExposure, uGrain;
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec3 aces(vec3 x){ return clamp((x*(2.51*x + .03))/(x*(2.43*x + .59) + .14), 0., 1.); }
void main(){
  vec2 nd = vUv*2. - 1.;
  vec2 ca = nd * dot(nd, nd) * .0007;
  vec3 c = vec3(texture(uScene, vUv + ca).r, texture(uScene, vUv).g, texture(uScene, vUv - ca).b);
  c += texture(uBloomTex, vUv).rgb * uBloom;
  c *= 1. - .44*pow(min(length(nd*vec2(.82, 1.)), 1.5), 2.4);
  c = aces(c * uExposure);
  c = pow(c, vec3(1./2.2));
  c = max(mix(vec3(dot(c, vec3(.299, .587, .114))), c, 1.2), 0.);
  float n = hash12(gl_FragCoord.xy + fract(uTime)*91.7) + hash12(gl_FragCoord.xy*1.37 + fract(uTime*1.31)*57.3) - 1.;
  o = vec4(c + n*uGrain, 1.);
}`;

  // ─────────────────────────── geometry ───────────────────────────
  const starTint = (R) => { const r = R(); return r < 0.5 ? [1, 0.93, 0.82] : r < 0.76 ? [1, 0.8, 0.52] : r < 0.88 ? [1, 0.62, 0.36] : [0.78, 0.87, 1]; };
  const sphereDir = (R) => { const z = R() * 2 - 1, ph = R() * TAU, s = Math.sqrt(1 - z * z); return [s * Math.cos(ph), z, s * Math.sin(ph)]; };

  function buildStars() {
    const R = rng(1977), G = gaussian(R);
    const NF = 14000, NB = 32000, NH = 44, n = NF + NB + NH;
    const a = new Float32Array(n * 10); let o = 0;
    const put = (d, dist, size, tw, c, b) => {
      a[o++] = d[0] * dist; a[o++] = d[1] * dist; a[o++] = d[2] * dist;
      a[o++] = size; a[o++] = R() * TAU; a[o++] = 0.6 + R() * 2.4; a[o++] = tw;
      a[o++] = c[0] * b; a[o++] = c[1] * b; a[o++] = c[2] * b;
    };
    for (let i = 0; i < NF; i++) {           // field stars: finite distance, so travel shifts them
      const m = Math.pow(R(), 5);
      put(sphereDir(R), 5000 + R() * 9000, 1.1 + 3.6 * m, 0.12 + 0.3 * R(), starTint(R), 0.9 + 3.0 * m);
    }
    for (let i = 0; i < NB; i++) {           // Milky Way stars: concentrated on the band, denser at the core
      const lon = R() < 0.72 ? G() * 0.95 : (R() * 2 - 1) * Math.PI;
      const cp = Math.cos(lon) * 0.5 + 0.5;
      const lat = clamp(G() * mix(0.06, 0.2, cp * cp * cp) * 0.9, -0.9, 0.9);
      const cl = Math.sqrt(1 - lat * lat), cx = Math.cos(lon) * cl, sx = Math.sin(lon) * cl;
      const d = [0, 1, 2].map((k) => CORE_DIR[k] * cx + GAL_B[k] * sx + GAL_N[k] * lat);
      const m = Math.pow(R(), 3);
      put(d, 60000, 0.85 + 1.6 * m, 0.1 + 0.2 * R(), starTint(R), 0.55 + 1.0 * m);
    }
    for (let i = 0; i < NH; i++) put(sphereDir(R), 9000, 14 + 14 * R(), 0.08, starTint(R), 1.4 + 1.6 * R());
    return { data: a, count: n };
  }

  function buildGalaxy() {
    const R = rng(404), G = gaussian(R);
    const N = 16000, a = new Float32Array(N * 10); let o = 0;
    for (let i = 0; i < N; i++) {
      let r, th, y, c, b, size;
      if (R() < 0.22) {                      // bulge
        r = Math.abs(G()) * 0.11; th = R() * TAU; y = G() * 0.045;
        c = [1, 0.86, 0.66]; b = 0.5 + R() * 0.6; size = 0.9 + R() * 1.3;
      } else {                               // two logarithmic arms
        r = 0.06 + 0.94 * Math.pow(R(), 0.75);
        th = (R() < 0.5 ? 0 : Math.PI) + 2.5 * Math.log(r) + G() * (0.22 + 0.25 * (1 - r));
        if (R() < 0.12) th = R() * TAU;
        y = G() * 0.018;
        const k = R(); c = k < 0.14 ? [0.75, 0.85, 1] : k < 0.5 ? [1, 0.74, 0.46] : [1, 0.6, 0.34];
        b = (0.25 + R() * 0.6) * (1 - 0.5 * r); size = 0.8 + 1.6 * Math.pow(R(), 3);
      }
      a[o++] = r * Math.cos(th); a[o++] = y; a[o++] = r * Math.sin(th);
      a[o++] = size; a[o++] = R() * TAU; a[o++] = 0; a[o++] = 0;
      a[o++] = c[0] * b; a[o++] = c[1] * b; a[o++] = c[2] * b;
    }
    return { data: a, count: N };
  }

  function buildDust(N) {
    const R = rng(88), a = new Float32Array(N * 7);
    for (let i = 0; i < a.length; i++) a[i] = R();
    return { data: a, count: N };
  }

  // ──────────────────────────── engine ────────────────────────────
  function create(canvas, options) {
    const opts = Object.assign({ adaptive: true, maxPixels: 2.4e6, maxDpr: 2, dust: 9000 }, options || {});
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: 'high-performance' });
    if (!gl) return null;
    const reduced = !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);

    const compile = (type, src, name) => {
      const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error('[cosmos] ' + name + ': ' + gl.getShaderInfoLog(s));
      return s;
    };
    const program = (name, vs, fs) => {
      const p = gl.createProgram();
      gl.attachShader(p, compile(gl.VERTEX_SHADER, vs, name + '.vs'));
      gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs, name + '.fs'));
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error('[cosmos] ' + name + ': ' + gl.getProgramInfoLog(p));
      const u = {};
      for (let i = 0, n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS); i < n; i++) {
        const info = gl.getActiveUniform(p, i);
        u[info.name.replace(/\[0\]$/, '')] = gl.getUniformLocation(p, info.name);
      }
      return { p, u };
    };

    const P = {
      sky: program('sky', VS_FULL, FS_SKY), copy: program('copy', VS_FULL, FS_COPY),
      stars: program('stars', VS_STARS, FS_STARS), galaxy: program('galaxy', VS_GALAXY, FS_POINT),
      haze: program('haze', VS_QUAD, FS_HAZE), sun: program('sun', VS_QUAD, FS_SUN),
      planet: program('planet', VS_QUAD, FS_PLANET), lines: program('lines', VS_QUAD, FS_LINES),
      celestial: program('celestial', VS_FULL, FS_CELESTIAL), dust: program('dust', VS_DUST, FS_DUST),
      spark: program('spark', VS_SPARK, FS_POINT), streak: program('streak', VS_STREAK, FS_STREAK),
      flare: program('flare', VS_FULL, FS_FLARE), down: program('down', VS_FULL, FS_DOWN),
      up: program('up', VS_FULL, FS_UP), final: program('final', VS_FULL, FS_FINAL),
    };

    const emptyVao = gl.createVertexArray();
    const makeVao = (data, layout, usage) => {
      const vao = gl.createVertexArray(), buf = gl.createBuffer();
      gl.bindVertexArray(vao); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, data, usage || gl.STATIC_DRAW);
      const stride = layout.reduce((s, n) => s + n, 0) * 4; let off = 0;
      layout.forEach((n, i) => { gl.enableVertexAttribArray(i); gl.vertexAttribPointer(i, n, gl.FLOAT, false, stride, off); off += n * 4; });
      gl.bindVertexArray(null);
      return { vao, buf };
    };
    const stars = buildStars(), galaxy = buildGalaxy(), dust = buildDust(opts.dust);
    const starVao = makeVao(stars.data, [3, 4, 3]);
    const galaxyVao = makeVao(galaxy.data, [3, 4, 3]);
    const dustVao = makeVao(dust.data, [3, 4]);
    const SPARKS = 320, sparkData = new Float32Array(SPARKS * 6), sparkVel = new Float32Array(SPARKS * 3), sparkLife = new Float32Array(SPARKS * 2);
    const sparkVao = makeVao(sparkData, [3, 3], gl.DYNAMIC_DRAW);
    let sparkHead = 0;

    const maxPt = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)[1];
    gl.getExtension('EXT_color_buffer_float'); gl.getExtension('EXT_color_buffer_half_float');

    // ── render targets ──
    const makeTarget = (w, h, fmt) => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texStorage2D(gl.TEXTURE_2D, 1, fmt, w, h);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      return { tex, fbo, w, h };
    };
    const freeTarget = (t) => { if (t) { gl.deleteTexture(t.tex); gl.deleteFramebuffer(t.fbo); } };
    const probe = makeTarget(4, 4, gl.RGBA16F);
    const hdr = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    freeTarget(probe);
    const FMT = hdr ? gl.RGBA16F : gl.RGBA8;
    const T = { sky: null, scene: null, bloom: [] };

    // ── state ──
    const S = {
      time: 37, last: 0, raf: 0, alive: true,
      progress: 0, progressTarget: 0,
      px: 0, py: 0, tx: 0, ty: 0, lastPointer: -1e9, hasPointer: false,
      quality: 1, cssW: 1, cssH: 1, ratio: 1, intro: reduced ? 1 : 0,
      ema: 1 / 60, frames: 0, cool: 90, fps: 60,
      layers: { lines: true, dust: true, sparks: true },
      sunVis: 1, nextMeteor: 5, meteors: [],
    };
    const cam = { pos: [0, 0, 0], rot: new Float32Array(9), right: [1, 0, 0], up: [0, 1, 0], back: [0, 0, 1], tanX: 1, tanY: 1 };

    function resize() {
      const cssW = Math.max(1, canvas.clientWidth), cssH = Math.max(1, canvas.clientHeight);
      const dpr = Math.min(global.devicePixelRatio || 1, opts.maxDpr);
      const cap = Math.min(1, Math.sqrt(opts.maxPixels / (cssW * cssH * dpr * dpr)));
      const ratio = dpr * cap * S.quality;
      const W = Math.max(2, Math.round(cssW * ratio)), H = Math.max(2, Math.round(cssH * ratio));
      S.cssW = cssW; S.cssH = cssH; S.ratio = ratio;
      if (canvas.width === W && canvas.height === H && T.scene) return;
      canvas.width = W; canvas.height = H;
      freeTarget(T.sky); freeTarget(T.scene); T.bloom.forEach(freeTarget);
      T.sky = makeTarget(Math.max(2, W >> 1), Math.max(2, H >> 1), FMT);
      T.scene = makeTarget(W, H, FMT);
      T.bloom = [];
      for (let i = 1, w = W, h = H; i <= 6; i++) {
        w = Math.max(2, w >> 1); h = Math.max(2, h >> 1);
        T.bloom.push(makeTarget(w, h, FMT));
        if (w <= 4 || h <= 4) break;
      }
    }

    // ── camera ──
    function updateCamera() {
      const n = KEYS.length, f = clamp(S.progress, 0, n - 1);
      const i = Math.min(Math.floor(f), n - 2);
      let t = f - i; t = t * t * (3 - 2 * t);
      const k = (j) => KEYS[clamp(j, 0, n - 1)];
      const pos = catmull(k(i - 1).pos, k(i).pos, k(i + 1).pos, k(i + 2).pos, t);
      const look = catmull(k(i - 1).look, k(i).look, k(i + 1).look, k(i + 2).look, t);
      const fov = mix(k(i).fov, k(i + 1).fov, t);
      const d = norm(sub(look, pos));
      const ease = Math.pow(1 - S.intro, 3);   // 1 → 0 over the opening reveal
      const yaw = Math.atan2(-d[0], -d[2]) - S.px * 0.045 + ease * 0.07;
      const pitch = Math.asin(clamp(d[1], -1, 1)) + S.py * 0.03;
      const roll = (reduced ? 0 : Math.sin(S.time * 0.05) * 0.006) - S.px * 0.004;
      const basis = (v) => rotY(rotX(rotZ(v, roll), pitch), yaw);
      cam.right = basis([1, 0, 0]); cam.up = basis([0, 1, 0]); cam.back = basis([0, 0, 1]);
      cam.rot.set([...cam.right, ...cam.up, ...cam.back]);
      const sway = reduced ? [0, 0] : [Math.sin(S.time * 0.13) * 0.9, Math.sin(S.time * 0.09 + 1.3) * 0.6];
      cam.pos = add(add(pos, mul(cam.back, ease * 42)), add(mul(cam.right, S.px * 4 + sway[0]), mul(cam.up, S.py * 2.6 + sway[1])));
      // Keep a usable horizontal field of view on portrait screens.
      const aspect = canvas.width / canvas.height;
      cam.tanY = Math.min(1.1, Math.max(Math.tan(fov * Math.PI / 360), 0.42 / aspect));
      cam.tanX = cam.tanY * aspect;
    }
    const toCam = (w) => { const r = sub(w, cam.pos); return [dot(r, cam.right), dot(r, cam.up), dot(r, cam.back)]; };

    function updateBodies() {
      const a1 = S.time * 0.0022;
      PLANETS[1].pos = add(HERO, add(mul(MOON_E1, MOON_RHO * Math.cos(a1)), mul(MOON_E2, MOON_RHO * Math.sin(a1))));
      const a2 = -0.87 + S.time * 0.004;
      PLANETS[3].pos = add(GIANT, add(mul(GM_E1, GM_RHO * Math.cos(a2)), mul(GM_E2, GM_RHO * Math.sin(a2))));
      S.moonAngle = a1; S.giantMoonAngle = a2;
      // How much of the sun's disc clears every planet's limb, for the lens flare.
      const sr = sub(SUN, cam.pos), sd = len(sr), sdir = mul(sr, 1 / sd);
      let vis = 1;
      for (const b of PLANETS) {
        const rel = sub(b.pos, cam.pos), d = len(rel);
        if (d > sd || d <= b.r) continue;
        const ang = Math.acos(clamp(dot(sdir, rel) / d, -1, 1)), ar = Math.asin(b.r / d);
        vis *= smooth(ar - 0.007, ar + 0.011, ang);
      }
      S.sunVis = vis; S.sunDir = sdir;
    }

    // ── pointer sparks & meteors ──
    function spawnSpark(nx, ny, dx, dy) {
      const R = Math.random;
      const dir = norm(add(add(mul(cam.right, nx * cam.tanX), mul(cam.up, ny * cam.tanY)), mul(cam.back, -1)));
      const depth = 16 + R() * 14, i = sparkHead; sparkHead = (sparkHead + 1) % SPARKS;
      const p = add(cam.pos, mul(dir, depth));
      sparkData.set([p[0] + (R() - 0.5) * 0.4, p[1] + (R() - 0.5) * 0.4, p[2] + (R() - 0.5) * 0.4, 1, 2.2 + R() * 4.5, R()], i * 6);
      const push = depth * 0.9, v = add(add(mul(cam.right, dx * push * cam.tanX + (R() - 0.5) * 1.6), mul(cam.up, dy * push * cam.tanY + (R() - 0.5) * 1.6 + 0.4)), mul(cam.back, (R() - 0.5) * 2));
      sparkVel.set(v, i * 3);
      sparkLife[i * 2] = 1; sparkLife[i * 2 + 1] = 0.9 + R() * 1.5;
    }
    function updateSparks(dt) {
      const damp = Math.exp(-dt * 1.6);
      for (let i = 0; i < SPARKS; i++) {
        let l = sparkLife[i * 2]; if (l <= 0) continue;
        l = Math.max(0, l - dt / sparkLife[i * 2 + 1]); sparkLife[i * 2] = l;
        for (let k = 0; k < 3; k++) { sparkVel[i * 3 + k] *= damp; sparkData[i * 6 + k] += sparkVel[i * 3 + k] * dt; }
        sparkData[i * 6 + 3] = l;
      }
    }
    function updateMeteors(dt) {
      if (!reduced && S.time > S.nextMeteor) {
        const R = Math.random, side = R() < 0.5 ? -1 : 1;
        const a0 = norm(add(add(mul(cam.right, (R() * 1.4 - 0.7) * cam.tanX), mul(cam.up, (0.15 + R() * 0.75) * cam.tanY)), mul(cam.back, -1)));
        const tr = mul(norm(add(mul(cam.right, side * (0.6 + R() * 0.5)), mul(cam.up, -(0.25 + R() * 0.5)))), 0.3 + R() * 0.35);
        S.meteors.push({ a0, tr, t: 0, dur: 0.7 + R() * 0.7 });
        S.nextMeteor = S.time + 4 + R() * 8;
      }
      S.meteors = S.meteors.filter((m) => (m.t += dt / m.dur) < 1);
    }

    // ── drawing helpers ──
    const useProg = (pr) => { gl.useProgram(pr.p); return pr.u; };
    const setCam = (u) => { gl.uniform3fv(u.uCam, cam.pos); gl.uniformMatrix3fv(u.uCamRot, false, cam.rot); gl.uniform2f(u.uProj, 1 / cam.tanX, 1 / cam.tanY); };
    const bind = (t) => { gl.bindFramebuffer(gl.FRAMEBUFFER, t ? t.fbo : null); gl.viewport(0, 0, t ? t.w : canvas.width, t ? t.h : canvas.height); };
    const tex = (unit, t) => { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t); };
    const tri = () => { gl.bindVertexArray(emptyVao); gl.drawArrays(gl.TRIANGLES, 0, 3); };
    const quad = () => { gl.bindVertexArray(emptyVao); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); };

    function drawPlanet(b) {
      const u = useProg(P.planet); setCam(u);
      const bz = norm(sub(cam.pos, b.pos)), bx = norm(cross([0, 1, 0], bz)), by = cross(bz, bx);
      const ext = b.ring ? b.ring[1] * 1.04 : 1.6;
      gl.uniform3fv(u.uCenter, b.pos); gl.uniform3fv(u.uU, mul(bx, b.r * ext)); gl.uniform3fv(u.uV, mul(by, b.r * ext));
      gl.uniform3fv(u.uBx, bx); gl.uniform3fv(u.uBy, by); gl.uniform3fv(u.uBz, bz);
      gl.uniform3fv(u.uL, norm(sub(SUN, b.pos))); gl.uniform3fv(u.uSunCol, SUN_COL);
      // world → planet-local, spinning about the planet's own axis
      const [e1, e2] = planeBasis(b.axis, Math.abs(b.axis[0]) < 0.9 ? [1, 0, 0] : [0, 0, 1]);
      const sp = S.time * b.spin, c = Math.cos(sp), s = Math.sin(sp);
      const x = add(mul(e1, c), mul(e2, s)), z = add(mul(e1, -s), mul(e2, c)), y = b.axis;
      gl.uniformMatrix3fv(u.uRot, false, [x[0], y[0], z[0], x[1], y[1], z[1], x[2], y[2], z[2]]);
      gl.uniform1f(u.uExt, ext); gl.uniform1f(u.uKind, b.kind); gl.uniform1f(u.uSeed, b.seed);
      gl.uniform1f(u.uEmber, b.ember); gl.uniform1f(u.uAtmoH, b.atmoH); gl.uniform1f(u.uAtmoGain, b.atmoGain);
      gl.uniform3fv(u.uColA, b.colA); gl.uniform3fv(u.uColB, b.colB); gl.uniform3fv(u.uColC, b.colC); gl.uniform3fv(u.uAtmo, b.atmo);
      gl.uniform4f(u.uRing, b.ring ? b.ring[0] : 0, b.ring ? b.ring[1] : 0, b.ring ? b.ring[2] : 0, 0);
      gl.uniform3fv(u.uRingN, b.axis); gl.uniform3fv(u.uRingCol, b.ringCol || [1, 1, 1]);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      quad();
    }
    function drawSun() {
      const rel = sub(SUN, cam.pos), d = len(rel);
      const bz = mul(rel, -1 / d), bx = norm(cross([0, 1, 0], bz)), by = cross(bz, bx);
      const u = useProg(P.sun); setCam(u);
      gl.uniform3fv(u.uCenter, SUN); gl.uniform3fv(u.uU, mul(bx, d * SUN_SIZE)); gl.uniform3fv(u.uV, mul(by, d * SUN_SIZE));
      gl.uniform1f(u.uTime, S.time); gl.uniform1f(u.uGain, 1);
      gl.blendFunc(gl.ONE, gl.ONE);
      quad();
    }
    const GOLD = [1.0, 0.74, 0.42];
    function drawDiagram(d) {
      if (d.alpha <= 0.003) return;
      const u = useProg(P.lines); setCam(u);
      gl.uniform3fv(u.uCenter, d.center); gl.uniform3fv(u.uU, mul(d.e1, d.ext * d.unit)); gl.uniform3fv(u.uV, mul(d.e2, d.ext * d.unit));
      gl.uniform3fv(u.uOccC, d.center); gl.uniform1f(u.uOccR, d.unit); gl.uniform3fv(u.uColor, GOLD);
      gl.uniform1f(u.uExt, d.ext); gl.uniform1f(u.uAlpha, d.alpha);
      gl.uniform1f(u.uTickR, d.tickR || 0); gl.uniform1f(u.uTickN, d.tickN || 180);
      gl.uniform1f(u.uDashR, d.dashR || 0); gl.uniform1f(u.uAxisX, d.axisX === undefined ? 1e6 : d.axisX);
      gl.uniform4fv(u.uRings, d.rings); gl.uniform4fv(u.uRingA, d.ringA);
      const nodes = new Float32Array(12); (d.nodes || []).forEach((nd, i) => nodes.set(nd, i * 3));
      gl.uniform3fv(u.uNodes, nodes);
      quad();
    }

    function render() {
      const W = canvas.width, H = canvas.height;
      const pxScale = S.ratio * clamp(S.cssH / 900, 0.72, 1.35);
      let u;

      // 1 · sky at half resolution
      gl.disable(gl.BLEND);
      bind(T.sky); u = useProg(P.sky);
      gl.uniformMatrix3fv(u.uCamRot, false, cam.rot); gl.uniform2f(u.uTan, cam.tanX, cam.tanY);
      gl.uniform1f(u.uTime, S.time); gl.uniform1f(u.uSunVis, S.sunVis);
      gl.uniform3fv(u.uSunDir, S.sunDir); gl.uniform3fv(u.uGalN, GAL_N); gl.uniform3fv(u.uCoreDir, CORE_DIR);
      tri();

      // 2 · scene
      bind(T.scene); u = useProg(P.copy); tex(0, T.sky.tex); gl.uniform1i(u.uTex, 0); tri();
      gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);

      u = useProg(P.stars); setCam(u);
      gl.uniform1f(u.uTime, S.time); gl.uniform1f(u.uPx, pxScale); gl.uniform1f(u.uMaxPt, maxPt); gl.uniform1i(u.uSky, 0);
      gl.bindVertexArray(starVao.vao); gl.drawArrays(gl.POINTS, 0, stars.count);

      if (S.layers.lines) {
        u = useProg(P.celestial);
        gl.uniformMatrix3fv(u.uCamRot, false, cam.rot); gl.uniform2f(u.uTan, cam.tanX, cam.tanY);
        gl.uniform3fv(u.uN, ECLIPTIC_N); gl.uniform3fv(u.uA, ECLIPTIC_A); gl.uniform3fv(u.uColor, GOLD); gl.uniform1f(u.uAlpha, 0.15);
        tri();
      }

      if (S.meteors.length) {
        u = useProg(P.streak);
        gl.uniformMatrix3fv(u.uCamRot, false, cam.rot); gl.uniform2f(u.uProj, 1 / cam.tanX, 1 / cam.tanY);
        gl.uniform2f(u.uRes, W, H); gl.uniform1f(u.uWidth, 2.2 * pxScale);
        for (const m of S.meteors) {
          const e = 1 - Math.pow(1 - m.t, 2), tail = Math.max(0, e - 0.42 * Math.sin(Math.PI * m.t));
          gl.uniform3fv(u.uB, norm(add(m.a0, mul(m.tr, e)))); gl.uniform3fv(u.uA, norm(add(m.a0, mul(m.tr, tail))));
          gl.uniform1f(u.uGain, Math.sin(Math.PI * m.t) * 2.2);
          quad();
        }
      }

      // galaxy: a tilted disc of points over a soft haze
      const [g1, g2] = planeBasis(GALAXY.axis, [1, 0, 0]);
      const gs = S.time * 0.006, gc = Math.cos(gs), gn = Math.sin(gs);
      const gx = add(mul(g1, gc), mul(g2, gn)), gz = add(mul(g1, -gn), mul(g2, gc));
      u = useProg(P.haze); setCam(u);
      gl.uniform3fv(u.uCenter, GALAXY.pos); gl.uniform3fv(u.uU, mul(gx, GALAXY.scale * 1.25)); gl.uniform3fv(u.uV, mul(gz, GALAXY.scale * 1.25));
      gl.uniform1f(u.uGain, 0.42); quad();
      u = useProg(P.galaxy); setCam(u);
      gl.uniform1f(u.uTime, S.time); gl.uniform1f(u.uPx, pxScale); gl.uniform1f(u.uScale, GALAXY.scale);
      gl.uniform3fv(u.uCenter, GALAXY.pos);
      gl.uniformMatrix3fv(u.uModel, false, [...gx, ...GALAXY.axis, ...gz]);
      gl.bindVertexArray(galaxyVao.vao); gl.drawArrays(gl.POINTS, 0, galaxy.count);

      // sun and planets, far to near
      const order = PLANETS.map((b) => ({ b, d: len(sub(b.pos, cam.pos)) })).concat([{ b: null, d: len(sub(SUN, cam.pos)) }]).sort((a, b) => b.d - a.d);
      for (const it of order) { if (it.b) drawPlanet(it.b); else drawSun(); }
      gl.blendFunc(gl.ONE, gl.ONE);

      if (S.layers.lines) {
        const f = S.progress;
        const heroA = 1 - smooth(0.2, 0.7, f), giantA = smooth(0.35, 0.9, f) * (1 - smooth(1.35, 1.9, f));
        const hn = norm(sub(KEYS[0].pos, HERO)), hx = norm(cross([0, 1, 0], hn)), hy = cross(hn, hx);
        const na = S.time * 0.03, mr = MOON_RHO / HERO_R, gr = GM_RHO / GIANT_R;
        drawDiagram({ center: HERO, unit: HERO_R, e1: hx, e2: hy, ext: 2.5, alpha: 0.36 * heroA,
          rings: [1.2, 1.56, 0, 0], ringA: [0.55, 0.3, 0, 0], tickR: 1.56, tickN: 180, dashR: 2.1, axisX: -1.2,
          nodes: [[-1.2, 0, -0.045], [-1.2, 0.997, 0.02], [-1.2, -0.997, 0.02], [2.1 * Math.cos(na), 2.1 * Math.sin(na), 0.022]] });
        drawDiagram({ center: HERO, unit: HERO_R, e1: MOON_E1, e2: MOON_E2, ext: mr * 1.2, alpha: 0.32 * heroA,
          rings: [mr, 0, 0, 0], ringA: [0.5, 0, 0, 0] });
        drawDiagram({ center: GIANT, unit: GIANT_R, e1: GM_E1, e2: GM_E2, ext: 4.1, alpha: 0.3 * giantA,
          rings: [gr, 3.75, 0, 0], ringA: [0.5, 0.28, 0, 0], tickR: 3.75, tickN: 180 });
      }

      if (S.layers.dust) {
        u = useProg(P.dust);
        gl.uniform3fv(u.uCam, cam.pos); gl.uniformMatrix3fv(u.uCamRot, false, cam.rot); gl.uniform2f(u.uProj, 1 / cam.tanX, 1 / cam.tanY);
        gl.uniform3fv(u.uSunDir, S.sunDir); gl.uniform1f(u.uTime, S.time); gl.uniform1f(u.uBox, 150);
        gl.uniform1f(u.uPxPerUnit, H / (2 * cam.tanY)); gl.uniform1f(u.uMaxPt, maxPt);
        gl.uniform1f(u.uSunVis, S.sunVis); gl.uniform1f(u.uGain, 2.3); gl.uniform1f(u.uTravel, 0.45);
        gl.bindVertexArray(dustVao.vao); gl.drawArrays(gl.POINTS, 0, dust.count);
      }
      if (S.layers.sparks) {
        u = useProg(P.spark); setCam(u);
        gl.uniform1f(u.uTime, S.time); gl.uniform1f(u.uPx, pxScale); gl.uniform1f(u.uMaxPt, maxPt);
        gl.bindVertexArray(sparkVao.vao); gl.bindBuffer(gl.ARRAY_BUFFER, sparkVao.buf);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, sparkData);
        gl.drawArrays(gl.POINTS, 0, SPARKS);
      }

      // lens flare, scaled by how much of the sun is showing
      const sv = toCam(SUN);
      if (sv[2] < 0) {
        const nx = sv[0] / -sv[2] / cam.tanX, ny = sv[1] / -sv[2] / cam.tanY;
        const inView = 1 - smooth(1.0, 1.7, Math.max(Math.abs(nx), Math.abs(ny)));
        if (inView * S.sunVis > 0.002) {
          u = useProg(P.flare);
          gl.uniform2f(u.uSun, nx, ny); gl.uniform1f(u.uAspect, W / H); gl.uniform1f(u.uVis, S.sunVis * inView);
          tri();
        }
      }
      gl.disable(gl.BLEND);

      // 3 · bloom: threshold + downsample chain, then tent upsample back up
      u = useProg(P.down); gl.uniform1i(u.uTex, 0);
      let src = T.scene;
      T.bloom.forEach((t, i) => {
        bind(t); tex(0, src.tex);
        gl.uniform2f(u.uTexel, 1 / src.w, 1 / src.h); gl.uniform1f(u.uThresh, i === 0 ? (hdr ? 1.0 : 0.72) : 0);
        tri(); src = t;
      });
      gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);
      u = useProg(P.up); gl.uniform1i(u.uTex, 0);
      for (let i = T.bloom.length - 1; i > 0; i--) {
        const s = T.bloom[i];
        bind(T.bloom[i - 1]); tex(0, s.tex); gl.uniform2f(u.uTexel, 1 / s.w, 1 / s.h); tri();
      }
      gl.disable(gl.BLEND);

      // 4 · tone map to the screen
      bind(null); u = useProg(P.final);
      tex(0, T.scene.tex); tex(1, T.bloom[0].tex);
      gl.uniform1i(u.uScene, 0); gl.uniform1i(u.uBloomTex, 1);
      gl.uniform1f(u.uTime, reduced ? 0 : S.time); gl.uniform1f(u.uBloom, hdr ? 0.12 : 0.18);
      gl.uniform1f(u.uExposure, mix(0.1, 1, smooth(0, 0.55, S.intro))); gl.uniform1f(u.uGrain, 0.02);
      tri();
    }

    function step(dt) {
      S.time += dt * (reduced ? 0.2 : 1);
      S.intro = Math.min(1, S.intro + dt / 3.6);
      // With no pointer (touch, or an idle mouse) a slow drift keeps the layers sliding.
      const idle = (performance.now() - S.lastPointer) > 5000;
      let gx = S.tx, gy = S.ty;
      if (idle && !reduced) { gx = Math.sin(S.time * 0.11) * 0.42; gy = Math.sin(S.time * 0.083 + 0.8) * 0.3; }
      const kp = 1 - Math.exp(-dt * (idle ? 0.8 : 3.2));
      S.px += (gx - S.px) * kp; S.py += (gy - S.py) * kp;
      S.progress += (S.progressTarget - S.progress) * (1 - Math.exp(-dt * 3.4));
      updateCamera(); updateBodies(); updateSparks(dt); updateMeteors(dt);
    }

    function frame(now) {
      if (!S.alive) return;
      S.raf = requestAnimationFrame(frame);
      const raw = S.last ? (now - S.last) / 1000 : 1 / 60; S.last = now;
      const dt = Math.min(raw, 0.05);
      step(dt);
      render();
      // Drop resolution a notch if the frame rate will not hold. Never climbs back, so it cannot oscillate.
      S.ema += (raw - S.ema) * 0.05; S.fps = 1 / S.ema;
      if (opts.adaptive && --S.cool < 0 && S.ema > 1 / 42 && S.quality > 0.5) {
        S.quality = Math.max(0.5, S.quality * 0.84); S.cool = 80; S.ema = 1 / 60; resize();
      }
    }

    // ── input ──
    const onPointer = (e) => {
      const nx = (e.clientX / global.innerWidth) * 2 - 1, ny = -((e.clientY / global.innerHeight) * 2 - 1);
      const dx = nx - S.tx, dy = ny - S.ty;
      if (S.layers.sparks && S.hasPointer && !reduced) {
        const n = Math.min(6, Math.floor(Math.hypot(dx, dy) * 110 + Math.random()));
        for (let i = 0; i < n; i++) spawnSpark(nx - dx * Math.random(), ny - dy * Math.random(), dx, dy);
      }
      S.tx = nx; S.ty = ny; S.hasPointer = true; S.lastPointer = performance.now();
    };
    global.addEventListener('pointermove', onPointer, { passive: true });
    global.addEventListener('pointerdown', onPointer, { passive: true });
    let resizeTimer = 0;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 120); };
    const ro = global.ResizeObserver ? new ResizeObserver(onResize) : null;
    if (ro) ro.observe(canvas); else global.addEventListener('resize', onResize);
    const onLost = (e) => { e.preventDefault(); cancelAnimationFrame(S.raf); };
    canvas.addEventListener('webglcontextlost', onLost);

    resize();
    S.raf = requestAnimationFrame(frame);

    return {
      keys: KEYS.length,
      setProgress(f) { S.progressTarget = clamp(f, 0, KEYS.length - 1); },
      set(layer, on) { if (layer in S.layers) S.layers[layer] = !!on; },
      stats() { return { fps: S.fps, width: canvas.width, height: canvas.height, hdr, quality: S.quality }; },
      // Jump straight to the resting state (skips easing); used for stills and tests.
      settle(time) {
        if (time !== undefined) S.time = time;
        S.progress = S.progressTarget; S.px = S.tx; S.py = S.ty; S.lastPointer = performance.now(); S.intro = 1;
        resize(); step(0); render();
      },
      destroy() {
        S.alive = false; cancelAnimationFrame(S.raf);
        global.removeEventListener('pointermove', onPointer); global.removeEventListener('pointerdown', onPointer);
        if (ro) ro.disconnect(); else global.removeEventListener('resize', onResize);
        canvas.removeEventListener('webglcontextlost', onLost);
        const ext = gl.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext();
      },
    };
  }

  global.Cosmos = { create };
})(typeof window !== 'undefined' ? window : this);
