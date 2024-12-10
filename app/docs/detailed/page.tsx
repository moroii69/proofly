"use client"

import { useState } from 'react'
import { Sidebar } from "@/components/docs/Sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'

export default function DetailedDocsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center w-full max-w-sm">
            <Search className="w-4 h-4 mr-2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </header>
        <ScrollArea className="flex-1">
          <main className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-8">WebGUIBuilder Documentation</h1>
            
            <section id="getting-started" className="mb-12">
              <h2 className="text-3xl font-semibold mb-4">Getting Started</h2>
              <p className="mb-4">Welcome to the WebGUIBuilder documentation. This guide will help you get started with our powerful GUI building tool.</p>
              
              <h3 id="installation" className="text-2xl font-semibold mt-8 mb-4">Installation</h3>
              <p className="mb-4">To install WebGUIBuilder, run the following command in your terminal:</p>
              <pre className="bg-secondary p-4 rounded-md mb-4">
                <code>npm install webguibuilder</code>
              </pre>
              
              <h3 id="quick-start-guide" className="text-2xl font-semibold mt-8 mb-4">Quick Start Guide</h3>
              <p className="mb-4">Follow these steps to create your first GUI:</p>
              <ol className="list-decimal list-inside mb-4">
                <li>Import WebGUIBuilder in your project</li>
                <li>Create a new GUI instance</li>
                <li>Add components to your GUI</li>
                <li>Customize component properties</li>
                <li>Render your GUI</li>
              </ol>
              
              <h3 id="project-structure" className="text-2xl font-semibold mt-8 mb-4">Project Structure</h3>
              <p className="mb-4">A typical WebGUIBuilder project structure looks like this:</p>
              <pre className="bg-secondary p-4 rounded-md mb-4">
                <code>{`
my-webgui-project/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── index.js
├── public/
├── package.json
└── README.md
                `}</code>
              </pre>
            </section>
            
            {/* Add more sections here for each main topic */}
            
          </main>
        </ScrollArea>
        <footer className="border-t p-4 flex justify-between items-center">
          <Button variant="outline">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous: Introduction
          </Button>
          <Button variant="outline">
            Next: Core Concepts
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </footer>
      </div>
    </div>
  )
}

