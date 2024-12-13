"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocsProvider, useDocsContext } from "@/contexts/DocsContext";
import { Sidebar } from "@/components/docs/Sidebar";

function DetailedDocsPageContent() {
  const { currentSection, sections, setActiveSection, activeHref } = useDocsContext();

  const findCurrentIndex = () => 
    sections.findIndex(section => section.href === activeHref);

  const handleNavigation = (direction: 'prev' | 'next') => {
    const currentIndex = findCurrentIndex();
    
    if (direction === 'prev' && currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].href);
    } else if (direction === 'next' && currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].href);
    }
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1">
          <main className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-8">Proofly Documentation</h1>
            {currentSection.content}
          </main>
        </ScrollArea>
        <footer className="border-t p-4 flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => handleNavigation('prev')}
            disabled={findCurrentIndex() <= 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleNavigation('next')}
            disabled={findCurrentIndex() >= sections.length - 1}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </footer>
      </div>
    </div>
  );
}

export default function DetailedDocsPage() {
  return (
    <DocsProvider>
      <DetailedDocsPageContent />
    </DocsProvider>
  );
}