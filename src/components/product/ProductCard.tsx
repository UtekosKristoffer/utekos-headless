// Fil: src/components/product/ProductCard.tsx
import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import type { ShopifyProduct } from "@/types/shopify";
import { formatPrice } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  // Vi trenger ikke å sjekke variantId, da kortet ikke er variant-spesifikt
  const price = formatPrice(product.priceRange.minVariantPrice.amount);
  const productUrl = `/products/${product.handle}` as Route;

  // RENSET LOGIKK: Vi bruker kun 'featuredImage' som vi vet finnes.
  const imageUrl = product.featuredImage?.url || "/placeholder.svg";
  const altText = product.featuredImage?.altText || product.title;

  return (
    <Link href={productUrl} className="group flex">
      <Card className="h-full flex flex-col transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1 w-full">
        <CardContent className="p-0">

            <AspectRatio ratio={2 / 3} className="w-full overflow-hidden rounded-t-lg bg-surface-raised/40">
              <Image
                src={imageUrl}
                alt={altText}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </AspectRatio>
       
        </CardContent>
        <CardHeader className="flex-grow p-4">
          <CardTitle className="text-base font-medium line-clamp-2">
            {product.title}
          </CardTitle>
        </CardHeader>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="font-semibold">{price}</p>
          <Button variant="outline" size="sm">
            Se produkt
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
