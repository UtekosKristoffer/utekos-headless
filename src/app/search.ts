// src/app/actions/search.ts
"use server";

import { searchProducts } from "@/lib/shopify/queries/searchProducts";

export default async function searchAction(formData: FormData) {
  const query = formData.get("query") as string;

  if (!query || query.trim().length < 2) {
    return {
      results: [],
      error: "Søkeord må være minst 2 tegn",
    };
  }

  try {
    const results = await searchProducts(query.trim());

    return {
      results,
      message:
        results.length > 0
          ? `Fant ${results.length} produkter`
          : "Ingen produkter funnet",
      success: true,
    };
  } catch (error) {
    console.error("Search action error:", error);
    return {
      results: [],
      error: "Noe gikk galt med søket",
      success: false,
    };
  }
}
