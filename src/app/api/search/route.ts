// Fil: src/app/api/search/route.ts
import { NextResponse } from "next/server";
import { searchProducts } from "@/lib/shopify";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Søketerm mangler" }, { status: 400 });
  }

  try {
    // Kall din nye, rene funksjon
    const searchResults = await searchProducts(query);
    return NextResponse.json(searchResults);
  } catch (error) {
    console.error("Søkefeil i API-rute:", error);
    return NextResponse.json(
      { error: "En feil oppstod under søket." },
      { status: 500 }
    );
  }
}
