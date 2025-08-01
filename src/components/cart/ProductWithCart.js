"use client";

import { useState } from "react";
import CartDrawer from "./CartDrawer";
import AddToCartButton from "./AddToCartButton";

export default function ProductWithCart({ product }) {
  const variantId = product.variants?.edges?.[0]?.node?.id;
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleAdd() {
    setDrawerOpen(true);
  }

  return (
    <div>
      {/* Her kan du bruke ProductCard hvis du ønsker */}
      <h3>{product.title}</h3>
      <AddToCartButton variantId={variantId} onAdd={handleAdd} />
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
