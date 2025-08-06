// Fil: src/components/Price.tsx

"use client";

import formatPrice from "@/Helpers/formatPrice"; // Antar at du har en slik hjelpefunksjon

interface PriceProps {
  amount: string;
  currencyCode: string;
}

function Price({ amount }: PriceProps) {
  return (
    <p className="text-2xl font-semibold">
      <span className="sr-only">Pris:</span>
      {formatPrice(amount)}
    </p>
  );
}

export default Price;
