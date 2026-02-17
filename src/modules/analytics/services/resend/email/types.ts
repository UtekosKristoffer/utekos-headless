export type ContactEmailProps = {
  name: string
  email: string
  message: string
  phone?: string | undefined
}

export type EmailResult = {
  success: boolean
  data?: unknown
  error?: unknown
}
