import { useState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronRight, Book, Code, Palette, Cog, Zap, Layers, Database, Shield, Cloud, Headphones } from 'lucide-react'

interface NavItem {
  title: string
  href: string
  icon?: React.ReactNode
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: "Getting Started",
    href: "#getting-started",
    icon: <Book className="h-4 w-4" />,
    children: [
      { title: "Installation", href: "#installation" },
      { title: "Quick Start Guide", href: "#quick-start-guide" },
      { title: "Project Structure", href: "#project-structure" },
    ],
  },
  {
    title: "Core Concepts",
    href: "#core-concepts",
    icon: <Layers className="h-4 w-4" />,
    children: [
      { title: "Components", href: "#components" },
      { title: "State Management", href: "#state-management" },
      { title: "Routing", href: "#routing" },
    ],
  },
  {
    title: "UI Components",
    href: "#ui-components",
    icon: <Palette className="h-4 w-4" />,
    children: [
      { title: "Buttons", href: "#buttons" },
      { title: "Forms", href: "#forms" },
      { title: "Modals", href: "#modals" },
      { title: "Tables", href: "#tables" },
    ],
  },
  {
    title: "API Reference",
    href: "#api-reference",
    icon: <Code className="h-4 w-4" />,
    children: [
      { title: "HTTP Requests", href: "#http-requests" },
      { title: "WebSocket", href: "#websocket" },
      { title: "GraphQL", href: "#graphql" },
    ],
  },
  {
    title: "State Management",
    href: "#state-management",
    icon: <Database className="h-4 w-4" />,
    children: [
      { title: "Redux", href: "#redux" },
      { title: "MobX", href: "#mobx" },
      { title: "Context API", href: "#context-api" },
    ],
  },
  {
    title: "Styling",
    href: "#styling",
    icon: <Palette className="h-4 w-4" />,
    children: [
      { title: "CSS Modules", href: "#css-modules" },
      { title: "Styled Components", href: "#styled-components" },
      { title: "Tailwind CSS", href: "#tailwind-css" },
    ],
  },
  {
    title: "Performance Optimization",
    href: "#performance-optimization",
    icon: <Zap className="h-4 w-4" />,
    children: [
      { title: "Code Splitting", href: "#code-splitting" },
      { title: "Lazy Loading", href: "#lazy-loading" },
      { title: "Memoization", href: "#memoization" },
    ],
  },
  {
    title: "Testing",
    href: "#testing",
    icon: <Shield className="h-4 w-4" />,
    children: [
      { title: "Unit Testing", href: "#unit-testing" },
      { title: "Integration Testing", href: "#integration-testing" },
      { title: "End-to-End Testing", href: "#end-to-end-testing" },
    ],
  },
  {
    title: "Deployment",
    href: "#deployment",
    icon: <Cloud className="h-4 w-4" />,
    children: [
      { title: "Build Process", href: "#build-process" },
      { title: "Continuous Integration", href: "#continuous-integration" },
      { title: "Hosting Options", href: "#hosting-options" },
    ],
  },
  {
    title: "Advanced Topics",
    href: "#advanced-topics",
    icon: <Cog className="h-4 w-4" />,
    children: [
      { title: "Server-Side Rendering", href: "#server-side-rendering" },
      { title: "Internationalization", href: "#internationalization" },
      { title: "Accessibility", href: "#accessibility" },
    ],
  },
]

function NavItem({ item, isChild = false }: { item: NavItem; isChild?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start",
          isChild ? "pl-8" : "font-semibold",
          isOpen && "bg-accent"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.icon && <span className="mr-2">{item.icon}</span>}
        {item.title}
        {item.children && (
          <span className="ml-auto">
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </span>
        )}
      </Button>
      {isOpen && item.children && (
        <div className="ml-4">
          {item.children.map((child) => (
            <NavItem key={child.href} item={child} isChild />
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar() {
  return (
    <div className="w-64 bg-background border-r">
      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

