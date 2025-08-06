// Fil: src/components/header/SearchDialog.tsx
"use client";

import * as React from "react";

import type { Route } from "next";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import Button from "@/Components/UI/button";

import { SearchIcon, CornerDownLeft } from "lucide-react";
import { IconArrowRight } from "@tabler/icons-react";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/UI/dialog";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/Components/UI/command";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider, // VIKTIG: Importer Provider
  SidebarSeparator,
} from "@/Components/UI/sidebar";

// --- Constants ---
const SIDEBAR_WIDTH = "36rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "k";

// --- Sample Data for Default View ---
const defaultNavData = {
  Sider: [
    { title: "Kolleksjoner", url: "/collections" },
    { title: "Om Utekos", url: "/about" },
  ],
  Hjelp: [
    { title: "Kontakt oss", url: "/contact" },
    { title: "FAQ", url: "/faq" },
  ],
};

function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      return;
    }
    async function fetchResults() {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedQuery)}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data: ShopifyProduct[] = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
        setResults([]);
      }
    }
    fetchResults();
  }, [debouncedQuery]);

  const handleSelect = (url: string) => {
    router.push(url as Route);
    setOpen(false);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative h-9 w-full justify-start rounded-md text-sm text-muted-foreground sm:w-64"
        >
          <SearchIcon className="mr-2 size-4" />
          <span className="hidden lg:inline-flex">Søk etter produkter...</span>
          <span className="inline-flex lg:hidden">Søk...</span>
          <kbd className="pointer-events-none absolute right-1.5 top-1/2 hidden -translate-y-1/2 rounded bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            ⌘K
          </kbd>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="p-0 gap-0 overflow-hidden"
        style={{ width: SIDEBAR_WIDTH, maxWidth: "90vw" }}
      >
        {/* VIKTIG: SidebarProvider pakker inn alt innholdet */}
        <SidebarProvider>
          <Sidebar className="h-auto" collapsible="none">
            <SidebarHeader className="p-0 border-b">
              {/* Vi kan ikke bruke <SearchForm/> her hvis den ikke er tilpasset Command */}
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Skriv for å søke..."
                  value={query}
                  onValueChange={setQuery}
                  className="h-12"
                />
              </Command>
            </SidebarHeader>

            <SidebarContent className="p-0">
              <CommandList className="h-[300px] max-h-[300px]">
                {/* Logikk for å vise default vs. søkeresultater */}
                {!query ? (
                  <>
                    {Object.entries(defaultNavData).map(
                      ([groupName, items]) => (
                        <SidebarGroup key={groupName} className="p-2">
                          <SidebarGroupLabel>{groupName}</SidebarGroupLabel>
                          <SidebarSeparator className="my-1" />
                          <SidebarMenu>
                            {items.map((item) => (
                              <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                  asChild
                                  className="justify-start"
                                  onClick={() => handleSelect(item.url)}
                                >
                                  <Link href={item.url as Route}>
                                    <IconArrowRight className="mr-2 size-4" />
                                    <span>{item.title}</span>
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </SidebarGroup>
                      )
                    )}
                  </>
                ) : results.length > 0 ? (
                  <SidebarGroup className="p-2">
                    <SidebarGroupLabel>Produkter</SidebarGroupLabel>
                    <SidebarSeparator className="my-1" />
                    <SidebarMenu>
                      {results.map((product) => (
                        <SidebarMenuItem key={product.id}>
                          <SidebarMenuButton
                            asChild
                            className="justify-start"
                            onClick={() =>
                              handleSelect(`/products/${product.handle}`)
                            }
                          >
                            <Link href={`/products/${product.handle}` as Route}>
                              <IconArrowRight className="mr-2 size-4" />
                              <span>{product.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroup>
                ) : (
                  <CommandEmpty>Ingen resultater funnet.</CommandEmpty>
                )}
              </CommandList>
            </SidebarContent>

            <SidebarFooter className="p-2 border-t">
              <div className="flex items-center p-2 rounded-md text-sm text-muted-foreground">
                <CornerDownLeft className="mr-2 size-4" />
                <span>Go to Page</span>
              </div>
            </SidebarFooter>
          </Sidebar>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;
