export interface GqlMoney {
  amount: string
  currencyCode: string
}

export interface GqlMoneyBag {
  shopMoney: GqlMoney
}

export interface GqlLineItemNode {
  id: string
  quantity: number
  originalUnitPriceSet?: GqlMoneyBag | null
  variant?: { id: string | null } | null
}

export interface GqlLineItemsConnection {
  edges: { node: GqlLineItemNode }[]
}

export interface GqlAddress {
  firstName?: string | null
  lastName?: string | null
  city?: string | null
  province?: string | null
  provinceCode?: string | null
  zip?: string | null
  countryCode?: string | null
}

export interface GqlCustomer {
  id?: string | null
  email?: string | null
  phone?: string | null
}

export interface GqlOrderNode {
  id: string
  name: string
  createdAt: string
  processedAt?: string | null
  currencyCode?: string | null
  currentTotalPriceSet?: GqlMoneyBag | null
  customer?: GqlCustomer | null
  billingAddress?: GqlAddress | null
  shippingAddress?: GqlAddress | null
  clientIp?: string | null
  lineItems: GqlLineItemsConnection
}

export interface GqlOrdersResponse {
  data?: {
    orders?: {
      pageInfo: { hasNextPage: boolean; endCursor?: string | null }
      edges: { node: GqlOrderNode }[]
    }
  }
  errors?: any
}

export interface NormalizedOrder {
  id: string
  createdAt: string
  processedAt: string
  totalValue: number
  currency: string
  customer: {
    id?: string
    email?: string
    phone?: string
  }
  address: {
    firstName?: string
    lastName?: string
    city?: string
    province?: string
    provinceCode?: string
    zip?: string
    countryCode?: string
  }
  clientIp?: string
  lineItems: {
    variantId?: string | null
    quantity: number
    itemPrice: number
  }[]
}
