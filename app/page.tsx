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
  const { user, loading } = useAuth(); // Access the user and loading state from context

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollHint(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Return a loading state if authentication is still in progress
  if (loading) {
    return <div>Loading...</div>;
  }

  // Set the redirect path based on the user's authentication status
  const redirectPath = user ? "/dashboard" : "/signup";

  return (
    <main className="flex min-h-screen flex-col z-10 relative">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-24 lg:py-32 bg-background overflow-hidden h-screen flex items-center">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Effortlessly Create Invoices, Bills & Receipts
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Create, customize, and manage receipts for your business in minutes with
              multi-currency, tax, and email integration.
            </p>
            <motion.div
              className="mt-10 flex items-center justify-center gap-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                asChild
              >
                <Link href={redirectPath}>
                  Start Generating <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/docs">Learn more</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        {/* Scroll Hint */}
        {showScrollHint && (
          <button 
            onClick={scrollToFeatures}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center cursor-pointer group"
          >
            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors animate-bounce">
              Discover Features
            </p>
            <ArrowRight className="h-5 w-5 mx-auto text-muted-foreground rotate-90 animate-pulse group-hover:text-foreground transition-colors" />
          </button>
        )}
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-black/0 z-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Everything you need to manage your receipts
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Powerful features to streamline your billing process
            </p>
          </motion.div>
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex flex-col items-center p-8 rounded-lg bg-black/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                  <feature.icon className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-4 text-center text-muted-foreground">
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
