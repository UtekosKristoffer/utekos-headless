type PrivacyPolicyLayoutProps = {
  children: React.ReactNode
  analytics?: React.ReactNode
}

export default function PrivacyPolicyLayout({
  children,
  analytics
}: PrivacyPolicyLayoutProps) {
  return (
    <section>
      {children}
      {analytics}
    </section>
  )
}
