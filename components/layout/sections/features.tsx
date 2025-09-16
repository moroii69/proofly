"use client";
import React, { useState } from "react";
import { ArrowRight, Check, Copy, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const InstallationGuide = () => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text: string): void => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const requirements = [
        { text: "Python 3.8+ (64-bit recommended)" },
        { text: "pip 20.0+ package manager" },
        { text: "2GB available RAM" },
        { text: "Virtual environment (recommended)" },
    ];

    return (
        <section className="w-full bg-background py-24 sm:py-32">
            <div className="container max-w-5xl mx-auto px-4">
                {/* Header */}
                <div className="text-center space-y-4 mb-12">
                    <p className="text-sm font-semibold text-primary tracking-wide uppercase">
                        Python Package
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                        Proofly Health Analytics
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A powerful toolkit to analyze and track your health data
                        for better insights and decision-making
                    </p>
                </div>

                {/* Installation Card */}
                <Card className="border-0 shadow-light dark:shadow-dark">
                    <CardContent className="p-8 md:p-10">
                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Left Column - Installation */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold tracking-tight">
                                        Quick Installation
                                    </h2>
                                    <p className="text-muted-foreground">
                                        Start analyzing health metrics in
                                        minutes
                                    </p>
                                </div>

                                <div className="relative rounded-lg bg-muted/50 p-4 transition-all">
                                    <div className="flex items-center justify-between">
                                        <code className="text-sm font-mono">
                                            pip install proofly==1.2.4
                                        </code>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                copyToClipboard(
                                                    "pip install proofly==1.2.4"
                                                )
                                            }
                                            className="hover:bg-background/50"
                                        >
                                            {copied ? (
                                                <CheckCheck className="h-4 w-4 text-primary" />
                                            ) : (
                                                <Copy className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <Button
                                    variant="link"
                                    className="p-0 h-auto font-semibold hover:text-primary"
                                    onClick={() =>
                                        window.open(
                                            "https://docs.proofly.xyz/",
                                            "_blank"
                                        )
                                    }
                                >
                                    Explore Documentation{" "}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>

                            {/* Right Column - Requirements */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold">
                                    System Requirements
                                </h3>
                                <ul className="space-y-4">
                                    {requirements.map((req, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start"
                                        >
                                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                                                <Check className="h-4 w-4 text-primary" />
                                            </div>
                                            <span className="text-foreground/90">
                                                {req.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="rounded-lg bg-primary/10 p-4">
                                    <p className="text-sm text-primary font-medium">
                                        For production deployments, we recommend
                                        using Python 3.10+ for optimal
                                        performance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default InstallationGuide;
