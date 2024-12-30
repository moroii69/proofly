"use client";
import { ArrowRight, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const InstallationGuide = () => {
  interface CopyToClipboardProps {
    text: string;
  }

  const copyToClipboard = (text: CopyToClipboardProps['text']): void => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="container max-w-5xl space-y-4">
        <div className="text-center space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Python Package
          </p>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Proofly Health Analytics
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground">
          A powerful toolkit to analyze and track your health data for better insights and decision-making          </p>
        </div>
        
        <Card className="mt-8">
          <CardContent className="flex flex-col gap-8 p-6 md:flex-row lg:p-8">
            <div className="w-full space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">
                  Quick Installation
                </h2>
                <p className="text-muted-foreground">
                  Start analyzing health metrics in minutes
                </p>
              </div>

              <div className="relative rounded-md bg-muted p-4">
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono">pip install proofly==1.2.4</code>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => copyToClipboard("pip install proofly==1.1.2")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button 
                variant="link" 
                className="p-0"
                onClick={() => window.open('https://proofly-docs-site.vercel.app/', '_blank')}
              >
                Explore Documentation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="w-full space-y-4">
              <h3 className="font-semibold">System Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="mr-3 h-5 w-5 text-primary" />
                  <span>Python 3.8+ (64-bit recommended)</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-3 h-5 w-5 text-primary" />
                  <span>pip 20.0+ package manager</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-3 h-5 w-5 text-primary" />
                  <span>2GB available RAM</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-3 h-5 w-5 text-primary" />
                  <span>Virtual environment (recommended)</span>
                </li>
              </ul>

              <div className="rounded-md bg-primary/10 p-4">
                <p className="text-sm text-primary">
                  For production deployments, we recommend using Python 3.10+ for optimal performance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstallationGuide;