"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Receipt, Shield, Globe, Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";

const features = [
  {
    title: "Receipt Generation",
    description: "Create professional invoices and receipts with automatic calculations and tax handling.",
    icon: Receipt,
  },
  {
    title: "Secure Storage",
    description: "Your data is encrypted and securely stored with enterprise-grade security.",
    icon: Shield,
  },
  {
    title: "Currency Support",
    description: "Generate receipts in multiple currencies with real-time conversion rates.",
    icon: Globe,
  },
  {
    title: "Email Integration",
    description: "Send receipts directly to customers via email with customizable templates.",
    icon: Mail,
  },
];

export default function Home() {
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    // Check if all critical dependencies are loaded
    const checkDependencies = async () => {
      try {
        // Add any additional checks for critical resources
        await Promise.all([
          // Example: Fetch initial data or check critical resources
          // new Promise(resolve => setTimeout(resolve, 1000)), // Simulated delay for demonstration
          // Ensure auth is not in a loading state
          new Promise<void>((resolve) => {
            if (!authLoading) resolve();
          })
        ]);

        // Check if motion and other libraries are available
        if (typeof motion === 'undefined') {
          throw new Error('Motion library not loaded');
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Loading failed:', error);
        // Optionally, you could set a more specific error state
        setIsLoading(true);
      }
    };

    const handleScroll = () => {
      setShowScrollHint(window.scrollY < 50);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Run dependency check
    checkDependencies();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [authLoading]);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Loading state with a more comprehensive loader
  if (isLoading || authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-muted-foreground">Loading resources...</p>
        </div>
      </div>
    );
  }

  const redirectPath = user ? "/dashboard" : "/signup";

  return (
    <main className="flex min-h-screen flex-col z-0 relative">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 bg-background overflow-hidden min-h-screen flex items-center">
        <div className="mx-auto max-w-7xl w-full">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Effortlessly Create Invoices, Bills & Receipts
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
              Create, customize, and manage receipts for your business in minutes with
              multi-currency, tax, and email integration.
            </p>
            <motion.div
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                asChild
              >
                <Link href={redirectPath}>
                  Start Generating <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto"
                asChild
              >
                <Link href="/docs">Learn more</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Hint - Hidden on very small screens */}
        {showScrollHint && (
          <button 
            onClick={scrollToFeatures}
            className="hidden sm:block absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center cursor-pointer group"
          >
            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors animate-bounce">
              Discover Features
            </p>
            <ArrowRight className="h-5 w-5 mx-auto text-muted-foreground rotate-90 animate-pulse group-hover:text-foreground transition-colors" />
          </button>
        )}
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 bg-black/0 z-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Everything you need to manage your receipts
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground px-4 sm:px-0">
              Powerful features to streamline your billing process
            </p>
          </motion.div>
          <div className="mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex flex-col items-center p-6 sm:p-8 rounded-lg bg-black/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                  <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                </div>
                <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl font-semibold text-center">
                  {feature.title}
                </h3>
                <p className="mt-2 sm:mt-4 text-center text-sm sm:text-base text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}