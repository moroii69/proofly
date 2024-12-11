'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";

const docSections = [
  { title: "Getting Started", href: "/docs/getting-started" },
  { title: "Components", href: "/docs/components" },
  { title: "Layouts", href: "/docs/layouts" },
  { title: "Styling", href: "/docs/styling" },
  { title: "Exporting", href: "/docs/exporting" },
  { title: "API Reference", href: "/docs/api" },
];

export default function DocsPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Documentation</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docSections.map((section) => (
          <div key={section.title} className="p-6 bg-card rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
            <Button asChild variant="outline">
              <Link href={section.href}>Read More</Link>
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Detailed Documentation</h2>
        <p className="mb-4">For a more comprehensive guide, check out our detailed documentation:</p>
        <Button asChild size="lg">
          <Link href="/docs/detailed">View Detailed Docs</Link>
        </Button>
      </div>
    </div>
  );
}
