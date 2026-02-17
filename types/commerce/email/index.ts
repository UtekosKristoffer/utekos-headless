export interface ContactEmailProps {
  name: string
  email: string
  message: string
  phone?: string | undefined
}

export interface EmailResult {
  success: boolean
  data?: unknown
  error?: unknown
}
