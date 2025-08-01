// Fil: src/components/header/Header.tsx
"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import type { MenuItem } from "@/types/shopify";

// Importer de selvstendige komponentene
import { HeaderLogo } from "./HeaderLogo";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileMenuPanel } from "./MobileMenuPanel";
import { SearchDialog } from "./SearchDialog";
import { CartDrawer } from "@/components/cart/CartDrawer"; // Den nye alt-i-ett-komponenten
import { Button } from "@/components/ui/button"; // Vi trenger Button for mobilmeny-trigger
import { MenuIcon } from "lucide-react"; // Ikon for mobilmeny

export function Header({ menu }: { menu: MenuItem[] }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Denne effekten lukker mobilmenyen automatisk når brukeren navigerer til en ny side.
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [pathname]);

  // Denne effekten forhindrer scrolling på body når mobilmenyen er åpen.
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset"; // Rydder opp når komponenten fjernes
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="bg-background sticky top-0 z-50 rounded-b-xl border-b border-white/10 shadow-lg">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-8">
          <HeaderLogo />

          {/* Vises kun på store skjermer */}
          <DesktopNavigation menu={menu} />

          {/* Container for alle "handlings-ikoner" */}
          <div className="flex items-center gap-2">
            <SearchDialog />
            <CartDrawer />

            {/* Mobilmeny-triggeren er nå en del av Header, og styrer MobileMenuPanel */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Åpne meny"
              >
                <MenuIcon className="size-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Selve mobilmeny-panelet, som styres av 'isMobileMenuOpen'-tilstanden */}
      <MobileMenuPanel
        menu={menu}
        isOpen={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
      />
    </>
  );
}
