"use client";

import { useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

type FieldPoint = {
  x: number;
  y: number;
  phase: number;
  speed: number;
  size: number;
  colorIndex: number;
};

type PointerState = {
  x: number;
  y: number;
  active: boolean;
};

const TAU = Math.PI * 2;

function createRandom(seed: number) {
  let value = seed >>> 0;

  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function createPoints(count: number) {
  const random = createRandom(0x4d4c5f41);

  return Array.from({ length: count }, (_, index): FieldPoint => {
    const column = index % 9;
    const row = Math.floor(index / 9);
    const x = (column + 0.35 + random() * 0.55) / 9;
    const y = (row + 0.25 + random() * 0.65) / Math.ceil(count / 9);

    return {
      x,
      y,
      phase: random() * TAU,
      speed: 0.28 + random() * 0.42,
      size: 1.1 + random() * 2.2,
      colorIndex: index % 3,
    };
  });
}

function readPalette() {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) =>
    styles.getPropertyValue(name).trim() || fallback;

  return [
    read("--color-primary", "#0b5fff"),
    read("--color-accent", "#0a5f59"),
    read("--color-secondary", "#9a5200"),
  ];
}

export function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, active: false });
  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const pointer = pointerRef.current;
    const palette = readPalette();
    let points: FieldPoint[] = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let isVisible = true;
    let documentVisible = !document.hidden;
    let disposed = false;
    let bounds = canvas.getBoundingClientRect();
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const render = (time = 0) => {
      if (disposed || width === 0 || height === 0) return;

      context.clearRect(0, 0, width, height);

      const t = time / 1000;
      const driftScale = prefersReducedMotion ? 0 : Math.min(16, width * 0.012);
      const positions = points.map((point) => {
        let x = point.x * width + Math.sin(t * point.speed + point.phase) * driftScale;
        let y = point.y * height + Math.cos(t * point.speed * 0.78 + point.phase) * driftScale;

        if (pointer.active && !prefersReducedMotion) {
          const deltaX = pointer.x - x;
          const deltaY = pointer.y - y;
          const distance = Math.hypot(deltaX, deltaY);
          const radius = Math.min(260, width * 0.24);

          if (distance > 0 && distance < radius) {
            const influence = (1 - distance / radius) * 22;
            x += (deltaX / distance) * influence;
            y += (deltaY / distance) * influence;
          }
        }

        return { ...point, x, y };
      });

      const connectionDistance = Math.max(92, Math.min(150, width * 0.11));

      for (let first = 0; first < positions.length; first += 1) {
        for (let second = first + 1; second < positions.length; second += 1) {
          const a = positions[first];
          const b = positions[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);

          if (distance >= connectionDistance) continue;

          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.strokeStyle = palette[(a.colorIndex + b.colorIndex) % palette.length];
          context.globalAlpha = (1 - distance / connectionDistance) * 0.18;
          context.lineWidth = 0.8;
          context.stroke();
        }
      }

      positions.forEach((point) => {
        const color = palette[point.colorIndex];
        const pulse = prefersReducedMotion ? 1 : 0.88 + Math.sin(t * 1.4 + point.phase) * 0.12;

        context.beginPath();
        context.arc(point.x, point.y, point.size * pulse, 0, TAU);
        context.fillStyle = color;
        context.globalAlpha = 0.62;
        context.fill();

        context.beginPath();
        context.arc(point.x, point.y, point.size * 3.8, 0, TAU);
        context.fillStyle = color;
        context.globalAlpha = 0.05;
        context.fill();
      });

      context.globalAlpha = 1;
    };

    const tick = (time: number) => {
      render(time);

      if (!prefersReducedMotion && isVisible && documentVisible && !disposed) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    const start = () => {
      cancelAnimationFrame(animationFrame);

      if (prefersReducedMotion) {
        render(0);
      } else if (isVisible && documentVisible) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    const resize = () => {
      bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      points = createPoints(width < 640 ? 30 : width < 1024 ? 42 : 54);
      start();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || !isVisible || !documentVisible) {
        pointer.active = false;
        return;
      }

      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handlePointerCapabilityChange = () => {
      if (!finePointer.matches) pointer.active = false;
    };

    const handleVisibilityChange = () => {
      documentVisible = !document.hidden;
      start();
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      start();
    });

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    window.addEventListener("scroll", handlePointerLeave, { passive: true });
    finePointer.addEventListener("change", handlePointerCapabilityChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    resize();

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handlePointerLeave);
      window.removeEventListener("scroll", handlePointerLeave);
      finePointer.removeEventListener("change", handlePointerCapabilityChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [prefersReducedMotion, resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="neural-field absolute inset-0 h-full w-full opacity-75 [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_82%,transparent_100%)] dark:opacity-60"
    />
  );
}
