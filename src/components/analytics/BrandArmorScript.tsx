import Script from 'next/script'

export const BRAND_ARMOR_COMPANY_ID = process.env.BRAND_ARMOR_COMPANY_ID

type BrandArmorScriptProps = {
  companyId: string | undefined
}

export function BrandArmorScript({ companyId }: BrandArmorScriptProps) {
  return (
    <>
      <Script
        id='brand-armor-ai-config'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.BrandArmorAIConfig = {
              companyId: ${JSON.stringify(companyId)}
            };
          `
        }}
      />
      <Script
        id='brand-armor-ai-pixel'
        src='https://brandarmor.ai/brand-armor-ai-pixel.min.js'
        strategy='afterInteractive'
      />
    </>
  )
}
