interface Identity {
  /**
   * Returns the button with given id
   *
   * If id is not provided, returns the first button instance
   *
   * If no button instance found returns undefined
   */
  button(id?: string): KlarnaIdentityButton | undefined

  /**
   * Creates the button with given configuration
   *
   * `id` attribute is required for creating more than one Identity Button.
   */
  button(configuration: KlarnaIdentityButtonConfiguration): KlarnaIdentityButton

  /**
   * Registers `signin` event handler.
   *
   * This event handler needs to be registered also on the redirect callback page
   * to trigger handling redirect response.
   */
  on(event: 'signin', callback: (response: IdentitySignInResponse) => Promise<void>): void

  /**
   * Registers `error` event handler.
   */
  on(event: 'error', callback: (error: Error) => Promise<void>): void
}

/**
 * Interface to the Identity Button interface.
 */
interface KlarnaIdentityButton {
  /**
   * The `ready` event can be used to load in data asynchronously,
   * it is triggered when the button was mounted or attached
   * and openid configuration was fetched successfully.
   */
  on(event: 'ready', callback: () => Promise<void>): void

  /**
   * Button click event handler, triggered when the consumer clicks on an Identity Button.
   */
  on(event: 'click', callback: () => Promise<void>): void

  /**
   * Programmatically adds a button to the DOM tree, inside the given container element.
   *
   * Semantically the same as creating a `<klarna-identity-button>` tag.
   * Timings
   *  - When using `mount` method the `ready` event is triggered after the button was added to DOM
   * and openid configuration was fetched.
   */
  mount(containerId: string): void
  mount(container: HTMLElement): void

  /**
   * Programmatically removes the button from the DOM tree
   */
  unmount(): void

  /**
   * Programmatically attach the Identity Button behavior to a merchant's custom button element.
   *
   * Timings
   *  - When using `attach` method the `ready` event is triggered after the button event handlers
   * were attached to the custom button and openid configuration was fetched.
   */
  attach(customButtonId: string): void
  attach(customButtonElement: HTMLElement): void

  /**
   * Programmatically detaches the Identity Button behavior from merchant's custom button element
   */
  detach(): void
}

interface KlarnaIdentityButtonConfiguration {
  scope: string
  redirectUri: string
  locale?: string

  id?: string
  shape?: 'default' | 'pill' | 'rect'
  theme?: KlarnaTheme
  logoAlignment?: KlarnaIdentityButtonLogoAlignment
  hideOverlay?: boolean
  interactionMode?: FlowInteractionMode
}

type KlarnaIdentityButtonLogoAlignment = 'left' | 'center' | 'right'

enum KlarnaTheme {
  DEFAULT = 'default',
  LIGHT = 'light',
  DARK = 'dark',
  OUTLINED = 'outlined'
}

type IdentitySignInResponse = {
  user_account_profile: UserAccountProfile
  user_account_linking: UserAccountLinking
}

interface UserAccountLinking {
  user_account_linking_refresh_token: string
  user_account_linking_id_token: string
}

interface UserAccountProfile {
  billing_address?: BillingAddress
  country?: string | null
  date_of_birth?: string | null
  email?: string | null
  email_verified?: boolean
  family_name?: string | null
  given_name?: string | null
  phone?: string | null
  national_identification_number?: string | null
  national_identification_number_country?: string | null
  locale?: string | null
  sub: string
}

interface BillingAddress {
  city: string | null
  country: string | null
  postal_code: string | null
  region: string | null
  street_address: string | null
  street_address_2: string | null
}
