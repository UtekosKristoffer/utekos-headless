"use client";
import { ProductGrid, GalleryColumn, OptionsColumn } from "@/components/layout";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { Route } from "next";
import type { ShopifyProduct, ShopifyProductVariant } from "@/types/shopify";
import { safeJsonParse } from "@/lib/utils";
import { AddToCart } from "@/components/product/AddToCart";
import dynamic from "next/dynamic";
import { ColorSelector } from "./ColorSelector";
import { SizeSelector } from "./SizeSelector";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Price } from "@/components/product/Price";
import {
  RichTextRenderer,
  type RootNode,
} from "@/components/product/RichTextRenderer";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ProductGallery = dynamic(
  () => import("./ProductGallery").then((mod) => mod.ProductGallery),
  {
    ssr: false,
    loading: () => (
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-surface-raised/40" />
    ),
  }
);

export function ProductPageClient({ product }: { product: ShopifyProduct }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedVariant, setSelectedVariant] =
    useState<ShopifyProductVariant | null>(null);

  useEffect(() => {
    const variantIdFromUrl = searchParams.get("variant");
    const allVariants = product.variants.edges.map((edge) => edge.node);
    const initialVariant =
      allVariants.find((v) => v.id === variantIdFromUrl) || allVariants[0];
    setSelectedVariant(initialVariant);
  }, [product, searchParams]);

  const variantImages = (() => {
    if (!selectedVariant || !product.media) return [];

    const imagesJson = selectedVariant.variantProfile?.reference?.images?.value;

    if (imagesJson) {
      const imageGids = safeJsonParse<string[]>(imagesJson, []);
      if (imageGids && imageGids.length > 0) {
        return product.media.edges
          .map((edge) => edge.node)
          .filter((mediaImage) => imageGids.includes(mediaImage.id));
      }
    }

    const allMedia = product.media.edges.map((e) => e.node);
    const mainImage = allMedia.find(
      (m) => m.image.url === selectedVariant.image?.url
    );
    return mainImage ? [mainImage] : [];
  })();

  const handleOptionChange = (optionName: string, value: string) => {
    if (!product || !selectedVariant) return;

    const newOptions = new Map<string, string>();
    selectedVariant.selectedOptions.forEach((opt) =>
      newOptions.set(opt.name, opt.value)
    );
    newOptions.set(optionName, value);

    const allVariants = product.variants.edges.map((edge) => edge.node);
    const newVariant = allVariants.find((variant) => {
      return Array.from(newOptions.entries()).every(([key, val]) =>
        variant.selectedOptions.some(
          (opt) => opt.name === key && opt.value === val
        )
      );
    });

    if (newVariant) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("variant", newVariant.id);
      const newUrl = `${pathname}?${params.toString()}` as Route;
      router.replace(newUrl, { scroll: false });
    }
  };

  const renderMetafield = (metafieldValue: string | null | undefined) => {
    if (!metafieldValue) return null;

    const parsedValue = safeJsonParse<RootNode>(metafieldValue, null);

    if (!parsedValue) return null;

    return <RichTextRenderer content={parsedValue} />;
  };

  if (!selectedVariant) {
    return (
      <div className="container mx-auto p-8 text-center">Velger variant...</div>
    );
  }

  const { title, descriptionHtml } = product;
  const allVariants = product.variants.edges.map((edge) => edge.node);
  const variantProfile = selectedVariant.variantProfile?.reference;

  const subtitle = variantProfile?.subtitle?.value;

  // Sorterer produktvalgene i en forhåndsdefinert rekkefølge
  const optionOrder = ["Størrelse", "Farge"];
  const sortedAndFilteredOptions = product.options
    .filter((option) => optionOrder.includes(option.name))
    .sort((a, b) => optionOrder.indexOf(a.name) - optionOrder.indexOf(b.name));

  return (
    <main className="container mt-10 mx-auto p-4 md:p-8">
      <Breadcrumb className="mb-8">
        {" "}
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Hjem</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Produkter</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {/* Siste element er ikke en lenke */}
            <BreadcrumbPage>{product.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ProductGrid>
        <GalleryColumn>
          <div className="mb-8 text-left">
            <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-lg text-foreground-on-dark/80">
                {subtitle}
              </p>
            )}
          </div>
          <div className="md:sticky md:top-24 h-fit">
            <div className="mx-auto max-w-xl">
              <div className="aspect-video w-full rounded-2xl bg-surface-raised/20 p-4">
                <ProductGallery title={title} images={variantImages} />
              </div>
            </div>
          </div>
        </GalleryColumn>

        <OptionsColumn>
          <Price
            amount={selectedVariant.price.amount}
            currencyCode={selectedVariant.price.currencyCode}
          />
          <section aria-labelledby="product-options">
            <h2 id="product-options" className="sr-only">
              Produktvalg
            </h2>
            <div className="mt-30 space-y-8">
              {sortedAndFilteredOptions.map((option) => {
                const optionNameLower = option.name.toLowerCase();
                if (optionNameLower === "størrelse") {
                  return (
                    <SizeSelector
                      key={option.name}
                      optionName={option.name}
                      values={option.values}
                      variants={allVariants}
                      selectedVariant={selectedVariant}
                      onSelect={handleOptionChange}
                    />
                  );
                }
                if (optionNameLower === "farge") {
                  return (
                    <ColorSelector
                      key={option.name}
                      optionName={option.name}
                      values={option.values}
                      variants={allVariants}
                      selectedVariant={selectedVariant}
                      onSelect={handleOptionChange}
                    />
                  );
                }
                return null;
              })}
            </div>
            <div className="mt-8">
              <AddToCart variantId={selectedVariant.id} />
            </div>
            <article
              aria-label="Produktbeskrivelse"
              className="prose prose-invert mt-12 max-w-none text-foreground-on-dark/80"
            >
              <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
            </article>
          </section>
        </OptionsColumn>
      </ProductGrid>
      <section className="mt-16" aria-labelledby="product-details-heading">
        <h2 id="product-details-heading" className="sr-only">
          Detaljert produktinformasjon
        </h2>
        <div className="mx-auto w-full">
          <Accordion type="single" collapsible className="w-full">
            {" "}
            {/* ÉN Accordion-container */}
            {/* Hvert element har en unik 'value' */}
            <AccordionItem value="materialer">
              <AccordionTrigger>Materialer</AccordionTrigger>
              <AccordionContent>
                {/* Du har en skrivefeil her, denne skal være 'materials' */}
                {renderMetafield(variantProfile?.materials?.value)}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="funksjoner">
              <AccordionTrigger>Funksjoner</AccordionTrigger>
              <AccordionContent>
                {renderMetafield(variantProfile?.functions?.value)}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="egenskaper">
              <AccordionTrigger>Egenskaper</AccordionTrigger>
              <AccordionContent>
                {renderMetafield(variantProfile?.properties?.value)}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="bruksomrader">
              <AccordionTrigger>Bruksområder</AccordionTrigger>
              <AccordionContent>
                {renderMetafield(variantProfile?.usage?.value)}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="passform">
              <AccordionTrigger>Passform</AccordionTrigger>
              <AccordionContent>
                {renderMetafield(variantProfile?.sizeFit?.value)}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="vaskeanvisning">
              <AccordionTrigger>Vaskeanvisning</AccordionTrigger>
              <AccordionContent>
                {renderMetafield(variantProfile?.storageAndMaintenance?.value)}
              </AccordionContent>
            </AccordionItem>
          </Accordion>{" "}
          {/* Accordion-containeren slutter her */}
        </div>
      </section>
    </main>
  );
}
