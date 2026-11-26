"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const GLYPHS = ".,:;~=+";
const CELL = { width: 12, height: 20 };
const REACH = 150;

type Particle = { x: number; y: number; glyph: string; pace: number };

/**
 * A field of ASCII characters carried by a slow current. Near the cursor they
 * swirl into an eddy and take the accent color. Purely decorative.
 */
export function AsciiDrift({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elapsedRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const [pausedOverride, setPausedOverride] = useState<boolean | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const paused = pausedOverride ?? reducedMotion;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const cursor = { x: 0, y: 0, inside: false };
    let width = 0;
    let height = 0;
    let frame = 0;
    let previous = 0;
    let visible = true;
    let colors = { base: "", accent: "", font: "" };

    // Theme colors come from CSS so the field follows light and dark mode.
    const readColors = () => {
      const style = getComputedStyle(canvas);
      colors = { base: style.color, accent: style.getPropertyValue("--color-primary").trim() || style.color, font: style.fontFamily };
    };

    const seed = () => {
      const count = Math.max(40, Math.min(260, Math.round((width * height) / 5200)));
      const particles = particlesRef.current;
      while (particles.length < count) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          pace: 0.6 + Math.random() * 0.8,
        });
      }
      particles.length = count;
    };

    const step = (delta: number) => {
      const time = elapsedRef.current;
      for (const particle of particlesRef.current) {
        const angle = Math.sin(particle.x * 0.004 + time * 0.12) * 1.2 + Math.cos(particle.y * 0.006 - time * 0.09) * 1.2;
        let vx = (10 + Math.cos(angle) * 14) * particle.pace;
        let vy = Math.sin(angle) * 14 * particle.pace;
        if (cursor.inside) {
          const dx = particle.x - cursor.x;
          const dy = particle.y - cursor.y;
          const distance = Math.hypot(dx, dy);
          if (distance < REACH && distance > 1) {
            const pull = 1 - distance / REACH;
            // Mostly around the cursor, slightly away from it.
            vx += (-dy / distance) * pull * 70 + (dx / distance) * pull * pull * 30;
            vy += (dx / distance) * pull * 70 + (dy / distance) * pull * pull * 30;
          }
        }
        particle.x = (particle.x + vx * delta + width) % width;
        particle.y = (particle.y + vy * delta + height) % height;
      }
    };

    const draw = () => {
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.font = `14px ${colors.font}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const particle of particlesRef.current) {
        const distance = cursor.inside ? Math.hypot(particle.x - cursor.x, particle.y - cursor.y) : REACH;
        const pull = Math.max(0, 1 - distance / REACH);
        ctx.globalAlpha = 0.34 + pull * 0.56;
        ctx.fillStyle = pull > 0.25 ? colors.accent : colors.base;
        // Snapping to a character grid keeps the motion typewritten rather than fluid.
        ctx.fillText(
          particle.glyph,
          (Math.floor(particle.x / CELL.width) + 0.5) * CELL.width,
          (Math.floor(particle.y / CELL.height) + 0.5) * CELL.height,
        );
      }
      ctx.globalAlpha = 1;
    };

    const tick = (timestamp: number) => {
      frame = 0;
      if (paused || !visible || document.hidden) return;
      const delta = previous ? Math.min(timestamp - previous, 100) / 1000 : 0;
      previous = timestamp;
      elapsedRef.current += delta;
      step(delta);
      draw();
      frame = requestAnimationFrame(tick);
    };

    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      if (!paused && visible && !document.hidden) frame = requestAnimationFrame(tick);
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      if (!width || !height) return;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      readColors();
      seed();
      draw();
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      cursor.x = event.clientX - rect.left;
      cursor.y = event.clientY - rect.top;
      cursor.inside = cursor.x >= 0 && cursor.y >= 0 && cursor.x <= rect.width && cursor.y <= rect.height;
    };
    const onLeave = () => {
      cursor.inside = false;
    };
    const onTheme = () => {
      readColors();
      draw();
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const themeObserver = new MutationObserver(onTheme);

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    // The canvas sits behind the page content, so the cursor is tracked on the window.
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", sync);
    resize();
    sync();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [paused]);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full font-mono text-muted-foreground" />
      <button
        type="button"
        onClick={() => setPausedOverride(!paused)}
        aria-label={paused ? "Play background animation" : "Pause background animation"}
        className="absolute right-4 bottom-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-input bg-background/85 text-foreground backdrop-blur-sm transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
      </button>
    </div>
  );
}
