type MetaCapiUserData = {
  em?: string // Email (SHA256)
  ph?: string // Phone (SHA256)
  fn?: string // First Name (SHA256)
  ln?: string // Last Name (SHA256)
  ct?: string // City (SHA256)
  st?: string // State (SHA256)
  zp?: string // Zip (SHA256)
  country?: string // Country (SHA256)
  external_id?: string
  client_ip_address?: string
  client_user_agent?: string
  fbp?: string
  fbc?: string
}

type MetaCapiContent = {
  id: string
  quantity: number
  item_price?: number
  title?: string
  brand?: string
  category?: string
}

type MetaCapiCustomData = {
  currency?: string
  value?: number
  content_ids?: string[]
  content_type?: 'product'
  contents?: MetaCapiContent[]
  content_name?: string
  order_id?: string
}

export type MetaCapiPayload = {
  data: Array<{
    event_name: string
    event_time: number
    event_id: string
    event_source_url: string
    action_source: 'website'
    user_data: MetaCapiUserData
    custom_data: MetaCapiCustomData
  }>
  test_event_code?: string
}
