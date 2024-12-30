"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const [showScroll, setShowScroll] = useState(true);

  // Hide scroll indicator when user scrolls down
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
    <section className="min-h-screen w-full flex items-center justify-center relative">
      <div className="text-center space-y-8">
      <Badge variant="outline" className="text-sm py-2">
  <span className="mr-2 text-primary">
    <Badge className="font-normal">📦</Badge>
  </span>
  <a href="https://pypi.org/project/proofly/1.2.4/" target="_blank" rel="noopener noreferrer" className="font-normal">
    Latest Release: v1.2.4
    <span className="ml-2">→</span>
  </a>
</Badge>

        <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
          <h1>
            Unlock Your Potential with{" "}
            <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
              AI-driven
            </span>{" "}
            Insights
          </h1>
        </div>

        <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
          Beyond predictions, we are committed to guiding you. Receive personalized insights,
          expert advice, and continuous support on your health journey.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link href="/sign-up">
            <Button className="w-5/6 md:w-1/4 font-bold group/arrow">
              Get Started
              <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Button
            asChild
            variant="secondary"
            className="w-5/6 md:w-1/4 font-bold"
          >
            <Link href="/team">Meet the Team</Link>
          </Button>
        </div>
      </div>

      {/* Improved Scroll Indicator */}
      <div 
        className={`
          fixed bottom-8 left-1/2 -translate-x-1/2
          transition-all duration-500 ease-in-out
          ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          flex flex-col items-center gap-2
          cursor-pointer
          hover:scale-110 transition-transform
        `}
        onClick={() => window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        })}
      >
        <p className="text-base font-medium text-muted-foreground">
          Scroll to explore
        </p>
        <div className="relative">
          <ChevronDown 
            className="w-6 h-6 text-primary animate-bounce" 
            strokeWidth={2.5}
          />
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-lg -z-10" />
        </div>
      </div>
    </section>
  );
};