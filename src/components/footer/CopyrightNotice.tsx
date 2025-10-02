// Path: src/components/footer/CopyrightNotice.tsx
const { COMPANY_NAME, SITE_NAME } = process.env

export function CopyrightNotice() {
  const currentYear = new Date().getFullYear()
  const copyrightName = COMPANY_NAME || SITE_NAME || ''
  const copyrightText = `${copyrightName}${copyrightName.length > 0 && !copyrightName.endsWith('.') ? '.' : ''}`

  return (
    <div className='mt-8 text-center'>
      <p className='text-xs text-foreground-on-dark/40'>
        &copy; {currentYear} {copyrightText} Alle rettigheter forbeholdt.
      </p>
    </div>
  )
}
