import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  LineChart, 
  PlusCircle, 
  Settings,
  ClipboardPlus,
  Menu,
  ChevronsDown
} from "lucide-react";
import { ToggleTheme } from "@/components/layout/toogle-theme";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"; // Assuming these components exist
import { Separator } from "@/components/ui/separator"

import React from "react";
const items = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Add Metrics",
    href: "/dashboard/metrics/new",
    icon: PlusCircle,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: LineChart,
  },
  {
    title: "Generate Reports",
    href: "/dashboard/reports",
    icon: ClipboardPlus,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false); // State to control the menu visibility

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-2", className)} {...props}>
      {/* Desktop view */}
      <div className="hidden lg:flex items-center space-x-4">
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Button>
          </Link>
        ))}
        <ToggleTheme />
      </div>

      {/* Mobile view (Hamburger menu) */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <ChevronsDown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
                    Proofly
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <Button
                    key={item.href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={item.href}>{item.title}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />

              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
