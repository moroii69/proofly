"use client";
import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/auth-provider";
import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Use usePathname to get current path

  // Define the pages where the Navbar should be visible
  const showNavbar =
    pathname === "/" || pathname === "/team" || pathname === "/sign-up" || pathname === "/login";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          montserrat.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {/* Conditionally render the Navbar */}
            {showNavbar && <Navbar />}
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
        <SpeedInsights/>
        <Analytics/>
      </body>
    </html>
  );
}
