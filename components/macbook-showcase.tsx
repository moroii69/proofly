"use client";
import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { useTheme } from "next-themes";

export const MacbookShowcase = () => {
    const { theme } = useTheme();

    return (
        <div className="overflow-hidden w-full">
            <MacbookScroll
                title="Experience our AI-powered health dashboard"
                src={
                    theme === "light"
                        ? "/hero-image-light.jpeg"
                        : "/hero-image-dark.jpeg"
                }
                showGradient={true}
            />
        </div>
    );
};
