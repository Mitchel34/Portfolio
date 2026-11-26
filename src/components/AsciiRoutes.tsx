"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };
type Curve = [Point, Point, Point, Point];

/** The decorative route arcs, in the 600 × 300 space both the SVG and the canvas share. */
const VIEW = { width: 600, height: 300 };
const ROUTES: { d: string; curve: Curve }[] = [
  { d: "M250 300 C 330 170, 470 130, 600 190", curve: [{ x: 250, y: 300 }, { x: 330, y: 170 }, { x: 470, y: 130 }, { x: 600, y: 190 }] },
  { d: "M330 300 C 400 220, 500 200, 600 250", curve: [{ x: 330, y: 300 }, { x: 400, y: 220 }, { x: 500, y: 200 }, { x: 600, y: 250 }] },
  { d: "M150 300 C 280 90, 480 60, 600 120", curve: [{ x: 150, y: 300 }, { x: 280, y: 90 }, { x: 480, y: 60 }, { x: 600, y: 120 }] },
];

const TRAIL = ["+", ":", ".", ".", "."];
/** Seconds for one glyph to cross its arc, and how many share each arc. */
const CROSSING_SECONDS = 16;
const PER_ROUTE = 2;
const REACH = 120;
const MUTED = [180, 191, 208];
const ACCENT = [243, 160, 143];

function along([a, b, c, d]: Curve, t: number): Point {
  const u = 1 - t;
  const w0 = u * u * u, w1 = 3 * u * u * t, w2 = 3 * u * t * t, w3 = t * t * t;
  return { x: w0 * a.x + w1 * b.x + w2 * c.x + w3 * d.x, y: w0 * a.y + w1 * b.y + w2 * c.y + w3 * d.y };
}

/**
 * Decorative route arcs behind the Service heading. Not a map of real flights.
 * The dashed arcs are static. While a mouse is over the band, ASCII glyphs travel
 * along them and lean away from the cursor; they fade when it leaves, so nothing
 * moves on its own and touch or reduced-motion visitors see only the arcs.
 */
export function AsciiRoutes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const band = canvas?.closest("section");
    const ctx = canvas?.getContext("2d");
    if (!canvas || !band || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const fontFamily = getComputedStyle(canvas).fontFamily;
    const cursor = { x: 0, y: 0, inside: false };
    let presence = 0;
    let elapsed = 0;
    let previous = 0;
    let frame = 0;

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
      }
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);
      if (presence <= 0 || !width) return;

      const scale = width / VIEW.width;
      ctx.font = `500 ${Math.max(11, 13 * scale)}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ROUTES.forEach(({ curve }, route) => {
        for (let n = 0; n < PER_ROUTE; n += 1) {
          const head = (elapsed / CROSSING_SECONDS + route * 0.37 + n / PER_ROUTE) % 1;
          TRAIL.forEach((glyph, step) => {
            const t = head - step * 0.014;
            if (t <= 0) return;
            const point = along(curve, t);
            let x = point.x * scale;
            let y = point.y * scale;
            // Fade in from the origin and out before the band's edge.
            const edge = Math.min(1, t * 8) * Math.min(1, (1 - t) * 6);
            const dx = x - cursor.x;
            const dy = y - cursor.y;
            const distance = Math.hypot(dx, dy);
            const pull = cursor.inside ? Math.max(0, 1 - distance / REACH) : 0;
            if (pull > 0 && distance > 0.5) {
              const lean = pull * pull * 14;
              x += (dx / distance) * lean;
              y += (dy / distance) * lean;
            }
            const [r, g, b] = MUTED.map((channel, index) => Math.round(channel + (ACCENT[index] - channel) * pull));
            const alpha = presence * edge * (step === 0 ? 0.9 : 0.6 - step * 0.09) * (0.75 + pull * 0.25);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.fillText(glyph, x, y);
          });
        }
      });
    };

    const tick = (timestamp: number) => {
      frame = 0;
      const delta = previous ? Math.min(timestamp - previous, 100) / 1000 : 0;
      previous = timestamp;
      elapsed += delta;
      presence = Math.max(0, Math.min(1, presence + (cursor.inside ? delta / 0.6 : -delta / 1.4)));
      draw();
      if (cursor.inside || presence > 0) frame = requestAnimationFrame(tick);
      else previous = 0;
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      // The canvas is hidden below the lg breakpoint; a zero-size box means there is nothing to animate.
      if (event.pointerType === "touch" || motion.matches || !canvas.clientWidth) return;
      const rect = canvas.getBoundingClientRect();
      cursor.x = event.clientX - rect.left;
      cursor.y = event.clientY - rect.top;
      cursor.inside = true;
      start();
    };
    const onLeave = () => {
      cursor.inside = false;
    };

    band.addEventListener("pointermove", onMove);
    band.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      band.removeEventListener("pointermove", onMove);
      band.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute right-0 bottom-0 hidden aspect-[2/1] h-[22rem] lg:block">
      <svg
        focusable="false"
        viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
        className="absolute inset-0 h-full w-full text-navy-border opacity-70"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.25" strokeDasharray="2 7" strokeLinecap="round">
          {ROUTES.map((route) => (
            <path key={route.d} d={route.d} />
          ))}
        </g>
        <g fill="currentColor">
          {ROUTES.map((route) => (
            <circle key={route.d} cx={route.curve[0].x} cy={route.curve[0].y - 2} r="3" />
          ))}
        </g>
      </svg>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full font-mono" />
    </div>
  );
}
