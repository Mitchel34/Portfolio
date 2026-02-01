import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-foreground text-background hover:bg-foreground/90 shadow-sm":
                            variant === "primary",
                        "bg-surface text-foreground hover:bg-surface/80 shadow-sm":
                            variant === "secondary",
                        "border border-border bg-transparent shadow-sm hover:bg-surface hover:text-foreground":
                            variant === "outline",
                        "hover:bg-surface hover:text-foreground": variant === "ghost",
                        "h-8 px-3 text-xs": size === "sm",
                        "h-9 px-4 py-2": size === "md",
                        "h-10 px-8": size === "lg",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
