"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { PopupModal } from "react-calendly";

import { site } from "@/lib/content";

interface CalendlyPopupButtonProps {
    children: React.ReactNode;
    className?: string;
}

export function CalendlyPopupButton({ children, className }: CalendlyPopupButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className={className} disabled>
                {children}
            </button>
        );
    }

    const isDark = resolvedTheme === "dark";
    const colors = {
        primary: isDark ? "2563eb" : "0b5fff",
        background: isDark ? "0d111c" : "f5f3ee",
        text: isDark ? "e2e8f0" : "12243a",
    };

    const url = `${site.calendlyUrl}?hide_gdpr_banner=1&primary_color=${colors.primary}&background_color=${colors.background}&text_color=${colors.text}`;

    return (
        <>
            <button onClick={() => setIsOpen(true)} className={className}>
                {children}
            </button>
            <PopupModal
                url={url}
                onModalClose={() => setIsOpen(false)}
                open={isOpen}
                rootElement={typeof window !== "undefined" ? document.body : null!}
            />
        </>
    );
}
