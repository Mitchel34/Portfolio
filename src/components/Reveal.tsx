"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
};

const EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1];

/**
 * The only in-view animation on the site: a 450ms opacity fade of a section body, once.
 * Keeps the surrounding section a server component. Disabled under prefers-reduced-motion.
 */
export function Reveal({ children, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div;

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
