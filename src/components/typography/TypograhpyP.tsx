export function TypographyP({ children }: { children: React.ReactNode }) {
  return (
    <p className='font-utekos-text text-foreground leading-7 [&:not(:first-child)]:mt-6 text-left'>
      {children}
    </p>
  )
}
