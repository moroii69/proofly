import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import HeroSection from '@/components/hero-section';
import Feature15 from '@/components/feature-section';

export const metadata: Metadata = {
  title: 'Proofly - Home',
  description: 'Welcome to proofly - Your AI-powered health prediction platform',
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-custom-dark text-white">
      <header className="border-b">
        <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-3xl font-semibold tracking-wider">Proofly</span>
          </div>
          <div className="space-x-6">
            <Link href="/login">
              <Button variant="ghost" className="text-lg hover:text-primary transition-all">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="text-lg px-6 py-3 bg-primary hover:bg-secondary transition-all">Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection /> {/* Integrated HeroSection here */}

        <Feature15 /> {/* Integrated Feature15 here */}
      </main>

      <footer className="border-t py-8 bg-gray-800 text-center text-gray-400">
        <div className="container mx-auto px-6">
          <p>© 2024 proofly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="p-8 rounded-lg border bg-gray-800 hover:shadow-xl transition-all">
      <Icon className="h-16 w-16 text-primary mb-6 mx-auto" />
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
