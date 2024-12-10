"use client";

import { useState } from "react";
import { Sidebar } from "@/components/docs/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function DetailedDocsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center w-full max-w-sm">
            <Search className="w-4 h-4 mr-2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </header>
        <ScrollArea className="flex-1">
          <main className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-8">proofly documentation</h1>

            <section id="getting-started" className="mb-12">
              <h2 className="text-3xl font-semibold mb-4">getting started</h2>
              <p className="mb-4">
                welcome to the proofly documentation. this guide will help you
                use our platform to generate professional invoices, bills, and
                receipts.
              </p>

              <h3
                id="installation"
                className="text-2xl font-semibold mt-8 mb-4"
              >
                installation
              </h3>
              <p className="mb-4">
                to use proofly locally, clone the repository and run the
                following command:
              </p>
              <pre className="bg-secondary p-4 rounded-md mb-4">
                <code>npm install proofly</code>
              </pre>

              <h3
                id="quick-start-guide"
                className="text-2xl font-semibold mt-8 mb-4"
              >
                quick start guide
              </h3>
              <p className="mb-4">
                follow these steps to generate your first invoice:
              </p>
              <ol className="list-decimal list-inside mb-4">
                <li>create an account on proofly.</li>
                <li>navigate to the &quot;create document&quot; page.</li>
                <li>select &quot;invoice,&quot; &quot;bill,&quot; or &quot;receipt&quot; as the type.</li>
                <li>fill in the required fields like client details, items, and
                  taxes.</li>
                <li>generate and download the document.</li>
              </ol>
            </section>
          </main>
        </ScrollArea>
        <footer className="border-t p-4 flex justify-between items-center">
          <Button variant="outline">
            <ChevronLeft className="w-4 h-4 mr-2" />
            previous: introduction
          </Button>
          <Button variant="outline">
            next: features
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </footer>
      </div>
    </div>
  );
}
