import StoreFrontApiClient from "@/Lib/Clients/StoreFrontApiClient";
import type { DocumentType } from "@/gql";

export async function shopifyFetcher<
  TData,
  TVariables extends Record<string, any> | undefined = undefined
>(
  document: TypedDocumentString<TData, TVariables>,
  variables?: TVariables
): Promise<TData> {
  const query = document.toString();

  const response = await StoreFrontApiClient.request<TData>(query, {
    variables,
  });

  if (response.errors) {
    throw new Error(JSON.stringify(response.errors));
  }

  return response.data as TData;
}
