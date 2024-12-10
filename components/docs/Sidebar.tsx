import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, FileText, Clipboard, DollarSign, Cloud, ChevronRight, ChevronDown } from "lucide-react";

const navItems = [
  {
    title: "getting started",
    href: "#getting-started",
    icon: <Book className="h-4 w-4" />,
    children: [
      { title: "installation", href: "#installation" },
      { title: "quick start guide", href: "#quick-start-guide" },
    ],
  },
  {
    title: "document types",
    href: "#document-types",
    icon: <FileText className="h-4 w-4" />,
    children: [
      { title: "invoices", href: "#invoices" },
      { title: "bills", href: "#bills" },
      { title: "receipts", href: "#receipts" },
    ],
  },
  {
    title: "features",
    href: "#features",
    icon: <Clipboard className="h-4 w-4" />,
    children: [
      { title: "multi-currency support", href: "#multi-currency-support" },
      { title: "tax handling", href: "#tax-handling" },
      { title: "email integration", href: "#email-integration" },
    ],
  },
  {
    title: "pricing",
    href: "#pricing",
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    title: "deployment",
    href: "#deployment",
    icon: <Cloud className="h-4 w-4" />,
  },
];

interface NavItemProps {
  item: {
    title: string;
    href: string;
    icon?: JSX.Element;
    children?: { title: string; href: string }[];
  };
  isChild?: boolean;
}

function NavItem({ item, isChild = false }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);

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
          {item.children.map((child: { title: string; href: string }) => (
            <NavItem key={child.href} item={child} isChild />
          ))}
        </div>
      )}
    </div>
  );
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
  );
}
