export type KlarnaPlacementKey =
  | 'checkout'
  | 'credit-promotion-auto-size'
  | 'credit-promotion-badge'
  | 'footer-promotion-auto-size'
  | 'homepage-promotion-box'
  | 'homepage-promotion-tall'
  | 'homepage-promotion-wide'
  | 'info-page'
  | 'sidebar-promotion-auto-size'
  | 'top-strip-promotion-auto-size'
  | 'top-strip-promotion-badge'

export type KlarnaPlacementTheme = 'default' | 'dark' | 'custom'

export type KlarnaPlacementMessagePreference = 'klarna' | 'prequalification' | 'in-store'

export type KlarnaPlacementMessagePrefix = 'Or' | 'or'

export type KlarnaPlacementData = {
  key: KlarnaPlacementKey | undefined
  locale: string | 'no-NO' | undefined
  purchaseAmount: number | string | undefined
}

export type KlarnaPlacementAttributes = {
  'data-key'?: KlarnaPlacementKey
  'data-locale'?: string
  'data-purchase-amount'?: number | string
  'data-theme'?: KlarnaPlacementTheme
  'data-message-preference'?: KlarnaPlacementMessagePreference
  'data-message-prefix'?: KlarnaPlacementMessagePrefix
  'data-custom-payment-method-ids'?: string
}

export type KlarnaExpressCheckoutPayload = Record<string, unknown>

export type KlarnaExpressCheckoutAuthorizeOptions = {
  auto_finalize?: boolean
  collect_shipping_address?: boolean
}

export type KlarnaExpressCheckoutAuthorizationResult = {
  authorization_token?: string
  approved?: boolean
  show_form?: boolean
  finalize_required?: boolean
  [key: string]: unknown
}

export type KlarnaExpressCheckoutAuthorize = (
  options: KlarnaExpressCheckoutAuthorizeOptions,
  payload: KlarnaExpressCheckoutPayload,
  callback: (result: KlarnaExpressCheckoutAuthorizationResult) => void
) => void

export type KlarnaExpressCheckoutLoadConfig = {
  container: string
  theme?: 'default' | string
  shape?: 'default' | string
  locale?: string
  on_click?: (authorize: KlarnaExpressCheckoutAuthorize) => void
}

export type KlarnaExpressCheckoutLoadResult = {
  show_form?: boolean
  [key: string]: unknown
}

export type KlarnaPaymentsButtons = {
  init: (config: { client_id: string }) => {
    load: (
      config: KlarnaExpressCheckoutLoadConfig,
      callback?: (loadResult: KlarnaExpressCheckoutLoadResult) => void
    ) => void
  }
}
