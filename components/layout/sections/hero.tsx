"use client";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, ExternalLink } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
    const [showScroll, setShowScroll] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            setShowScroll(scrollPosition < windowHeight * 0.1);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-6xl mx-auto text-center space-y-8">
                {/* Version Badge */}
                <div className="flex justify-center">
                    <Badge
                        variant="outline"
                        className="py-2 px-4 backdrop-blur-sm bg-background/50 hover:bg-background/80 transition-colors"
                    >
                        <span className="text-primary mr-2">📦</span>
                        <a
                            href="https://pypi.org/project/proofly/1.2.4/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-normal inline-flex items-center hover:text-primary transition-colors"
                        >
                            Latest Release: v1.2.4
                            <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                    </Badge>
                </div>

                {/* Main Heading */}
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
                        Unlock Your Potential with{" "}
                        <span className="relative">
                            <span className="relative z-10 text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text px-2">
                                AI-driven
                            </span>
                            <span className="absolute inset-0 bg-primary/10 blur-2xl" />
                        </span>{" "}
                        Insights
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Beyond predictions, we are committed to guiding you.
                        Receive personalized insights, expert advice, and
                        continuous support on your health journey.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
                    <Link href="/sign-up" className="w-full md:w-auto">
                        <Button
                            size="lg"
                            className="w-full md:w-auto min-w-[200px] font-semibold text-lg group"
                        >
                            Get Started
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>

                    <Link
                        href="https://docs.proofly.xyz/"
                        target="_blank"
                        className="w-full md:w-auto"
                    >
                        <Button
                            variant="secondary"
                            size="lg"
                            className="w-full md:w-auto min-w-[200px] font-semibold text-lg"
                        >
                            View Docs
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                className={`
          fixed bottom-8 left-1/2 -translate-x-1/2
          transition-all duration-500 ease-in-out
          ${
              showScroll
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
          }
          flex flex-col items-center gap-2 z-20
        `}
                onClick={() =>
                    window.scrollTo({
                        top: window.innerHeight,
                        behavior: "smooth",
                    })
                }
            >
                <p className="text-sm font-medium text-muted-foreground tracking-wide">
                    Scroll to explore
                </p>
                <div className="relative group cursor-pointer">
                    <ChevronDown
                        className="w-6 h-6 text-primary transition-transform group-hover:translate-y-1"
                        strokeWidth={2.5}
                    />
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
