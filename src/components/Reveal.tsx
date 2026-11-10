"use client";

import { useEffect, useRef, type ReactNode, type Ref } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
};

/**
 * The only in-view animation on the site: a section body below the fold fades up once as it
 * scrolls in (see `[data-reveal]` in globals.css). The server always renders the content
 * visible, so it reads the same without scripts, and nothing moves under prefers-reduced-motion.
 */
export function Reveal({ children, className, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Anything already on screen stays put; only content still below the fold waits for its entrance.
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    element.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.reveal = "in";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      delete element.dataset.reveal;
    };
  }, []);

  return (
    <Tag ref={ref as Ref<never>} className={className}>
      {children}
    </Tag>
  );
}
