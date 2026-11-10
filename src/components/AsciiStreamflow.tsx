"use client";

import { Pause, Play, Waves } from "lucide-react";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const TERRAIN = ".,:;+=x^";
const WATER = ".:-~=+";
const FLOW_SPEED = 0.085;
const FOAM_PARCELS = 30;

function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function readMotionPreference() {
  return window.matchMedia(MOTION_QUERY).matches;
}

function hash(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function channel(y: number) {
  const depth = Math.max(0, Math.min(1, (y - 0.34) / 0.66));
  return {
    center: 0.51 + Math.sin(depth * 7.1 - 0.7) * (0.025 + depth * 0.09),
    halfWidth: 0.009 + Math.pow(depth, 1.48) * 0.31,
    depth,
  };
}

/** Each parcel travels from the northern headwaters toward the southern foreground. */
function foamParcel(time: number, index: number) {
  const phase = hash(index, 41) + time * FLOW_SPEED;
  const progress = ((phase % 1) + 1) % 1;
  const y = 0.35 + Math.pow(progress, 1.45) * 0.66;
  const river = channel(y);
  const lane = (hash(index, 79) - 0.5) * 1.35;
  return { progress, y, x: river.center + lane * river.halfWidth, depth: river.depth };
}

function onBoulder(x: number, y: number) {
  return Math.pow((x - 0.43) / 0.028, 2) + Math.pow((y - 0.69) / 0.025, 2) < 1
    || Math.pow((x - 0.61) / 0.033, 2) + Math.pow((y - 0.88) / 0.022, 2) < 1;
}

type Scene = {
  background: HTMLCanvasElement;
  cols: number;
  rows: number;
  cellWidth: number;
  cellHeight: number;
  width: number;
  height: number;
};

function createScene(width: number, height: number, ratio: number): Scene | null {
  const background = document.createElement("canvas");
  background.width = Math.round(width * ratio);
  background.height = Math.round(height * ratio);
  const ctx = background.getContext("2d");
  if (!ctx) return null;
  ctx.scale(ratio, ratio);

  const cols = width < 380 ? 82 : 112;
  const cellWidth = width / cols;
  const cellHeight = cellWidth * 1.67;
  const rows = Math.ceil(height / cellHeight);
  const fontSize = cellHeight * 0.94;
  ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, "#080f1c");
  sky.addColorStop(0.42, "#102b36");
  sky.addColorStop(1, "#071a22");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  // Landscape geometry stays fixed. Only the river is redrawn during animation.
  for (let row = 0; row < rows; row += 1) {
    const y = (row + 0.5) / rows;
    for (let col = 0; col < cols; col += 1) {
      const x = (col + 0.5) / cols;
      const noise = hash(col, row);
      const ridge =
        0.3 -
        Math.exp(-Math.pow((x - 0.24) / 0.17, 2)) * 0.19 -
        Math.exp(-Math.pow((x - 0.73) / 0.21, 2)) * 0.15 +
        Math.sin(x * 65) * 0.008;
      let glyph = "";
      let color = "#263d4b";

      if (y < ridge) {
        if (noise > 0.992 && y < 0.23) {
          glyph = "+";
          color = "#61777c";
        } else if (y > 0.2 && noise > 0.91) {
          glyph = ".";
          color = "#2d4652";
        }
      } else if (y < 0.35) {
        const edge = y - ridge;
        glyph = edge < 0.025 ? (x < 0.5 ? "/" : "\\") : TERRAIN[Math.floor(noise * 4)];
        color = edge < 0.025 ? "#728d91" : noise > 0.7 ? "#3d5962" : "#28434e";
      } else {
        const river = channel(y);
        const distance = Math.abs(x - river.center);
        if (distance < river.halfWidth) continue;
        const bank = distance - river.halfWidth;
        const contour = Math.sin(x * 29 + y * 17) + Math.cos(x * 17 - y * 33);
        if (bank < 0.014 + river.depth * 0.012) {
          glyph = noise > 0.55 ? ":" : "=";
          color = noise > 0.7 ? "#a59d7d" : "#567769";
        } else if (noise > 0.48) {
          glyph = TERRAIN[Math.floor(noise * TERRAIN.length)];
          color = contour > 0.6 ? "#45665b" : contour < -0.3 ? "#263e3e" : "#35534b";
        }
      }

      if (glyph) {
        ctx.fillStyle = color;
        ctx.fillText(glyph, (col + 0.5) * cellWidth, (row + 0.5) * cellHeight);
      }
    }
  }

  // A few evergreens give the banks a readable scale without image assets.
  const trees = [
    [0.1, 0.56, 6], [0.23, 0.48, 4], [0.32, 0.43, 3],
    [0.8, 0.53, 5], [0.91, 0.66, 7], [0.69, 0.4, 3],
    [0.04, 0.83, 8], [0.84, 0.85, 7],
  ];
  for (const [x, y, size] of trees) {
    const top = Math.round(y * rows) - size;
    const center = Math.round(x * cols);
    for (let layer = 0; layer < size; layer += 1) {
      const spread = Math.floor(layer * 0.45);
      for (let branch = -spread; branch <= spread; branch += 1) {
        ctx.fillStyle = branch < 0 ? "#5d8070" : "#34584e";
        ctx.fillText(branch === 0 ? "^" : branch < 0 ? "/" : "\\", (center + branch) * cellWidth, (top + layer) * cellHeight);
      }
    }
    ctx.fillStyle = "#7e816a";
    ctx.fillText("|", center * cellWidth, (top + size) * cellHeight);
  }

  return { background, cols, rows, cellWidth, cellHeight, width, height };
}

function drawRiver(ctx: CanvasRenderingContext2D, scene: Scene, time: number) {
  const { background, width, height, cols, rows, cellWidth, cellHeight } = scene;
  ctx.drawImage(background, 0, 0, width, height);
  ctx.font = `${cellHeight * 0.94}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let row = Math.floor(rows * 0.34); row < rows; row += 1) {
    const y = (row + 0.5) / rows;
    const river = channel(y);
    for (let col = 0; col < cols; col += 1) {
      const x = (col + 0.5) / cols;
      const across = (x - river.center) / river.halfWidth;
      if (Math.abs(across) >= 1) continue;
      const wave = Math.sin(y * 84 - time * 4.8 + across * 3.2);
      const ripple = Math.sin(y * 147 - time * 7.2 + x * 65);
      const noise = hash(col, row);
      const foam = wave * 0.68 + ripple * 0.32;
      let glyph = WATER[Math.floor(((foam + 1) / 2) * (WATER.length - 1))];
      let color = foam > 0.55 ? "#a6ddd5" : foam > -0.05 ? "#57aca9" : "#28767f";
      if (Math.abs(across) > 0.85) {
        color = "#749c8e";
        glyph = noise > 0.6 ? ":" : ".";
      }
      // Stationary boulders split the moving current into little whitewater wakes.
      if (onBoulder(x, y)) {
        glyph = noise > 0.6 ? "#" : "%";
        color = "#94a399";
      } else if ((Math.abs(x - 0.43) < 0.02 && y > 0.71 && y < 0.77) || (Math.abs(x - 0.61) < 0.025 && y > 0.9 && y < 0.98)) {
        glyph = foam > 0 ? "~" : ":";
        color = "#bcece0";
      }
      ctx.fillStyle = color;
      ctx.fillText(glyph, (col + 0.5) * cellWidth, (row + 0.5) * cellHeight);
    }
  }

  // Bright foam parcels make the downstream direction readable. Their heads move
  // monotonically down the screen; the dimmer trail always stays north of them.
  // The perspective curve accelerates them toward the viewer without reversing.
  for (let index = 0; index < FOAM_PARCELS; index += 1) {
    const head = foamParcel(time, index);
    if (head.y >= 0.995) continue;
    const alpha = Math.min(1, head.progress * 7) * Math.min(1, (1 - head.progress) * 12);
    for (let trail = 3; trail >= 0; trail -= 1) {
      const sampleTime = time - trail * 0.12;
      const parcel = foamParcel(sampleTime, index);
      // Do not draw a wrapped trail from the bottom back to the headwaters.
      if (parcel.progress > head.progress || onBoulder(parcel.x, parcel.y)) continue;
      const glyph = trail === 0 ? "~" : trail === 1 ? ":" : ".";
      ctx.globalAlpha = alpha * (1 - trail * 0.2);
      ctx.fillStyle = trail === 0 ? "#dbfff0" : "#89c9c2";
      ctx.fillText(glyph, parcel.x * width, parcel.y * height);
      if (trail === 0 && parcel.depth > 0.4) {
        ctx.globalAlpha *= 0.6;
        ctx.fillText(".", parcel.x * width + cellWidth, parcel.y * height - cellHeight * 0.2);
      }
    }
  }
  ctx.globalAlpha = 1;

  // The vignette gives the character field a quiet edge inside the frame.
  const shade = ctx.createRadialGradient(width / 2, height * 0.48, width * 0.15, width / 2, height / 2, width * 0.66);
  shade.addColorStop(0, "rgba(4, 12, 20, 0)");
  shade.addColorStop(1, "rgba(4, 12, 20, 0.48)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, width, height);
}

type AsciiStreamflowProps = {
  className?: string;
  embedded?: boolean;
  /** Says what the scene is. It is an illustration, never a research figure. */
  note?: string;
};

export function AsciiStreamflow({ className = "", embedded = false, note = "Decorative illustration" }: AsciiStreamflowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elapsedRef = useRef(0);
  const [pausedOverride, setPausedOverride] = useState<boolean | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, readMotionPreference, () => true);
  const paused = pausedOverride ?? reducedMotion;
  const captionId = useId();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx) return;

    let scene: Scene | null = null;
    let frame = 0;
    let previousTime = 0;
    let visible = true;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    const render = () => {
      if (scene) drawRiver(ctx, scene, elapsedRef.current);
    };

    const tick = (timestamp: number) => {
      frame = 0;
      if (paused || !visible || document.hidden) return;
      if (previousTime === 0) previousTime = timestamp;
      const delta = timestamp - previousTime;
      if (delta >= 1000 / 30) {
        const consumed = delta - (delta % (1000 / 30));
        elapsedRef.current += Math.min(consumed, 100) / 1000;
        previousTime = timestamp - (delta % (1000 / 30));
        render();
      }
      frame = requestAnimationFrame(tick);
    };

    const syncAnimation = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      if (!paused && visible && !document.hidden) frame = requestAnimationFrame(tick);
    };

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      scene = createScene(width, height, ratio);
      render();
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncAnimation();
    }, { threshold: 0.01 });

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    document.addEventListener("visibilitychange", syncAnimation);
    resize();
    syncAnimation();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", syncAnimation);
    };
  }, [paused]);

  return (
    <figure className={`flex h-full flex-col overflow-hidden bg-[#0a1722] text-[#b3c8c7] ${embedded ? "" : "rounded-[1.75rem] border border-[#31535b] shadow-[0_24px_70px_-35px_rgba(8,32,42,0.6)]"} ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-[#28404b] px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] sm:px-6">
        <span className="inline-flex items-center gap-2.5 text-[#b6d9d3]">
          <Waves className="h-3.5 w-3.5 text-[#70c1b8]" aria-hidden="true" />
          A study in streamflow
        </span>
        <span className="flex shrink-0 items-center gap-2 text-[#a8c6c1]" aria-label="Flow direction: north to south">
          <span aria-hidden="true">N ↓ S</span>
        </span>
      </div>
      <div className={`relative aspect-[7/5] w-full overflow-hidden ${embedded ? "min-h-[20rem] flex-1" : ""}`}>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="An ASCII mountain stream flowing north to south, from the top of the scene toward the bottom, past rocky banks and evergreen trees."
          aria-describedby={captionId}
          className="absolute inset-0 h-full w-full"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #a6ddd5 3px, transparent 4px)" }} />
        <button
          type="button"
          onClick={() => setPausedOverride(!paused)}
          aria-label={paused ? "Play streamflow animation" : "Pause streamflow animation"}
          className="absolute bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#668d8b]/60 bg-[#0a1722]/85 text-[#c5e8e1] backdrop-blur-sm transition hover:bg-[#1b3941] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8cd6c8]"
        >
          {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
        </button>
      </div>
      <figcaption id={captionId} className="border-t border-[#28404b] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[#91aaa9] sm:px-6">
        {note}
      </figcaption>
    </figure>
  );
}
