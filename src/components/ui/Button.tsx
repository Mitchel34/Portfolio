import React from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline";

const base =
  "inline-flex h-11 items-center justify-center gap-2 rounded-[2px] px-5 text-sm font-medium transition-colors duration-200 ease-editorial focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  outline: "border border-input text-foreground hover:bg-muted",
};

/** Class string for anchors styled as buttons. One filled (primary) button per view. */
export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => {
    return <button ref={ref} type={type} className={buttonClass(variant, className)} {...props} />;
  },
);
Button.displayName = "Button";
