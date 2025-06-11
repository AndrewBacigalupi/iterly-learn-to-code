"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import * as React from "react";

type MenuItem = {
  title: string;
  href?: string;
  submenu?: MenuItem[];
};

const MenuItemComponent: React.FC<{
  item: MenuItem;
  depth?: number;
  onItemClick?: () => void;
}> = ({ item, depth = 0, onItemClick }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  if (item.submenu) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "flex w-full items-center justify-between py-3 text-base font-medium transition-colors hover:text-primary",
              depth > 0 && "pl-4"
            )}
          >
            {item.title}
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {item.submenu.map((subItem) => (
            <MenuItemComponent
              key={subItem.title}
              item={subItem}
              depth={depth + 1}
              onItemClick={onItemClick}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Link
      href={item.href || "#"}
      onClick={onItemClick}
      className={cn(
        "block py-3 text-base font-medium transition-colors hover:text-primary",
        depth > 0 && "pl-4"
      )}
    >
      {item.title}
    </Link>
  );
};

export function HamburgerMenu({ menuItems }: { menuItems: MenuItem[] }) {
  const [open, setOpen] = React.useState(false);

  const handleItemClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[350px]">
        <div className="py-6 pl-4">
          <h2 className="text-lg font-semibold mb-6">Navigation</h2>
          <nav className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <MenuItemComponent
                key={item.title}
                item={item}
                onItemClick={handleItemClick}
              />
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
