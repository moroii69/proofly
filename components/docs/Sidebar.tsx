import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight, ChevronDown } from "lucide-react";
import { useDocsContext } from "@/contexts/DocsContext";

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
  const { activeHref, setActiveSection } = useDocsContext();

  const handleClick = () => {
    setActiveSection(item.href);
    if (item.children) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start",
          isChild ? "pl-8" : "font-semibold",
          activeHref === item.href && "bg-accent",
          isOpen && "bg-accent"
        )}
        onClick={handleClick}
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
            <NavItem 
              key={child.href} 
              item={child} 
              isChild 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const { sections, searchQuery, setSearchQuery } = useDocsContext();

  return (
    <div className="w-64 bg-background border-r">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <Search className="h-4 w-4 mr-2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-7rem)]">
        <div className="p-4 space-y-2">
          {sections.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}