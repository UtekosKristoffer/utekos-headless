// Path: src/types/api/index.ts

export type ShopifyOperation<TData, TVariables = never> = {
  data: TData
  variables: TVariables
}
