"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const finePointerQuery = "(hover: hover) and (pointer: fine) and (forced-colors: none)";

export function SemanticCursor() {
  const x = useMotionValue(-120);
  const y = useMotionValue(-120);
  const smoothX = useSpring(x, { stiffness: 620, damping: 42, mass: 0.16 });
  const smoothY = useSpring(y, { stiffness: 620, damping: 42, mass: 0.16 });
  const prefersReducedMotion = useReducedMotion();
  const [supportsFinePointer, setSupportsFinePointer] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const labelRef = useRef("");

  useEffect(() => {
    const media = window.matchMedia(finePointerQuery);
    const update = () => {
      setSupportsFinePointer(media.matches);
      if (media.matches) return;

      labelRef.current = "";
      setLabel("");
      setVisible(false);
    };
    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!supportsFinePointer || prefersReducedMotion) return;

    const updateLabel = (nextLabel: string) => {
      if (labelRef.current === nextLabel) return;
      labelRef.current = nextLabel;
      setLabel(nextLabel);
      setVisible(Boolean(nextLabel));
    };

    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target instanceof Element ? event.target : null;
      const cursorTarget = target?.closest<HTMLElement>("[data-cursor-label]");
      updateLabel(cursorTarget?.dataset.cursorLabel ?? "");
    };

    const handlePointerLeave = () => updateLabel("");

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handlePointerLeave);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [prefersReducedMotion, supportsFinePointer, x, y]);

  if (!supportsFinePointer || prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60]"
      style={{ x: smoothX, y: smoothY }}
    >
      <motion.div
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.72 }}
        transition={{ duration: 0.16, ease: "easeOut" }}
        className="-translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex h-9 items-center gap-2 rounded-full border border-primary/45 bg-card/95 px-3 text-[10px] font-mono uppercase tracking-[0.14em] text-foreground shadow-[0_10px_35px_-18px_rgba(11,95,255,0.85)] backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-45" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {label}
        </div>
      </motion.div>
    </motion.div>
  );
}
