// Path: types/tracking/user/NewUserData.ts

export type NewUserData = {
  setFbp: string | undefined
  setFbc: string | undefined
  external_id: string | undefined
  client_user_agent: string | undefined
  client_ip_address: string | undefined
  email_hash?: string | undefined
  setClientIpAddress?: string | undefined
  setClientUserAgent?: string | undefined
}
