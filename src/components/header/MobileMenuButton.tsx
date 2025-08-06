// Fil: src/components/header/MobileMenuButton.tsx
"use client";
import Button from "@/Components/UI/button";
import { MenuIcon, XIcon } from "lucide-react";

export function MobileMenuButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="lg:hidden"
      aria-label={isOpen ? "Lukk meny" : "Åpne meny"}
    >
      {isOpen ? <XIcon className="size-6" /> : <MenuIcon className="size-6" />}
    </Button>
  );
}
