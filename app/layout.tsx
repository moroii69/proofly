"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/use-auth";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// import the helix loader
import { helix } from "ldrs";

helix.register();

// const metadata = {
//   title: "Proofly - Professional Invoices & Bills",
//   description:
//     "Create, customize, and manage receipts for your business with our powerful receipt generator.",
// };

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1500); // 1.5 seconds delay

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={inter.className}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            <div className="min-h-screen bg-background relative">
              {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
                  <l-helix size="45" speed="2.5" color="white"></l-helix>
                </div>
              )}
              <Navbar />
              <main>{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
