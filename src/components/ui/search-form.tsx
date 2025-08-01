// SearchForm.tsx - MINIMAL endring
import Form from "next/form";
import { Search } from "lucide-react";
import searchAction from "@/app/search";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";

export function SearchForm() {
  return (
    <Form action={searchAction}>
      {" "}
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <SidebarInput
            id="search"
            name="query"
            placeholder="Search the docs..."
            className="pl-8"
          />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </SidebarGroupContent>
      </SidebarGroup>
    </Form>
  );
}
