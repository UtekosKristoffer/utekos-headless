import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: string): string {
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) {
    throw new Error("Invalid price amount provided to formatPrice");
  }
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount);
}

// Utility to safely parse JSON strings from metafields
export function safeJsonParse<T>(
  jsonString: string | null | undefined,
  fallback: T | null
): T | null {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    return fallback;
  }
}
