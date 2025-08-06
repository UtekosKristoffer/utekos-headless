// src/lib/graphql-fetcher.ts
import { shopifyClient } from "@/Lib/Clients/Auth/Shopify"; // din eksisterende klient
import type { TypedDocumentString } from '../gql'

/**
 * A generic fetcher used by the codegen-generated React Query hooks.
 * It accepts a TypedDocumentString and optional variables, then delegates to shopifyClient.
 */
export async function shopifyFetcher<TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
  variables?: TVariables
): Promise<TResult> {
  const query = document.toString(); // convert TypedDocumentString to plain string
  const { data, errors } = await shopifyClient.request<TResult>(query, {
    variables,
  });
  if (errors && errors.length)
    throw new Error(errors.map((e) => e.message).join(", "));
  return data;
}
