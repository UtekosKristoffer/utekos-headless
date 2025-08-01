"use client";
import type { MenuItem } from "@/types/shopify";
import Link from "next/link";
import type { Route } from "next";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger, // Vi trenger denne for å koble til åpne/lukke-logikken
} from "@/components/ui/sheet";

function normalizeShopifyUrl(url: string): string {
  try {
    return new URL(url).pathname;
  } catch (e) {
    return url;
  }
}

function MobileNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={normalizeShopifyUrl(href) as Route}
      className="block p-4 text-lg font-medium border-b border-border hover:bg-accent"
    >
      {children}
    </Link>
  );
}

export function MobileMenuPanel({
  menu,
  isOpen,
  onOpenChange,
}: {
  menu: MenuItem[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button className="hidden">Åpne mobilmeny</button>
      </SheetTrigger>

      <SheetContent side="left" className="w-full max-w-sm p-0 md:hidden">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Meny</SheetTitle>
        </SheetHeader>
        <nav className="flex-grow overflow-y-auto">
          <ul>
            {menu.map((item) => (
              <li key={item.title}>
                <MobileNavLink href={item.url}>{item.title}</MobileNavLink>
                {/* Her kan du legge til logikk for undermenyer hvis du trenger det */}
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
