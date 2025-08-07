import StoreFrontApiClient from "./Clients/StoreFrontApiClient";

async function shopifyRequest<T>(
  query: string,
  variables?: Record<string, any>
) {
  const { data, errors } = await StoreFrontApiClient.request<T>(query, {
    variables,
  });
  if (errors) throw errors;
  return data;
}

export default shopifyRequest;
