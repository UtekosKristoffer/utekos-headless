import { InspirationSeasonsTabs } from './InspirationSeasonsTabs'
import type { InspirationSeasonDefinition } from '../theme/seasons'
import { inspirationSurfaces } from '../theme/surfaces'
import { cn } from '@/lib/utils/className'

interface InspirationSeasonsSectionProps {
  title: string
  lead: string
  seasons: readonly InspirationSeasonDefinition[]
  defaultValue: string
  glowTokens?: readonly [string, string]
  variant?: 'pill' | 'rounded'
  showTips?: boolean
  sectionClassName?: string
  titleClassName?: string
  leadClassName?: string
  tabTriggerClassName?: string
  tabActiveClassName?: string
  tabInactiveClassName?: string
  contentCardClassName?: string
  contentIconClassName?: string
  contentIconGlyphClassName?: string
  contentTitleClassName?: string
  contentTextClassName?: string
  showSectionGlow?: boolean
  showTabGlow?: boolean
  showCardGlow?: boolean
}

export function InspirationSeasonsSection({
  title,
  lead,
  seasons,
  defaultValue,
  glowTokens,
  variant = 'rounded',
  showTips = false,
  sectionClassName,
  titleClassName,
  leadClassName,
  tabTriggerClassName,
  tabActiveClassName,
  tabInactiveClassName,
  contentCardClassName,
  contentIconClassName,
  contentIconGlyphClassName,
  contentTitleClassName,
  contentTextClassName,
  showSectionGlow = true,
  showTabGlow = true,
  showCardGlow = true
}: InspirationSeasonsSectionProps) {
  const [glowA, glowB] = glowTokens ?? ['var(--primary)', 'var(--mountain-view)']

  return (
    <section
      className={cn(
        'relative isolate overflow-hidden py-24',
        inspirationSurfaces.darkSection,
        inspirationSurfaces.darkSectionText,
        sectionClassName
      )}
    >
      <div className='pointer-events-none absolute inset-0 -z-10 opacity-20'>
        {showSectionGlow ?
          <>
            <div
              className='inspiration-seasons-glow-pulse absolute left-0 top-1/4 h-[500px] w-full max-w-[500px] blur-3xl md:left-1/4'
              style={{
                background: `radial-gradient(circle, ${glowA} 0%, transparent 70%)`
              }}
            />
            <div
              className='inspiration-seasons-glow-pulse absolute bottom-1/4 right-0 h-[500px] w-full max-w-[500px] blur-3xl md:right-1/4'
              style={{
                background: `radial-gradient(circle, ${glowB} 0%, transparent 70%)`,
                animationDelay: '4s'
              }}
            />
          </>
        : null}
      </div>

      <div className='container mx-auto px-4'>
        <div className='animate-fade-in-up mb-16 text-center'>
          <h2 className={cn('text-cloud-dancer', titleClassName)}>{title}</h2>
          <p className={cn('mx-auto mt-4 max-w-2xl utekos-section-lead text-ancient-water', leadClassName)}>
            {lead}
          </p>
        </div>

        <div className='inspiration-seasons-fade-in-delayed'>
          <InspirationSeasonsTabs
            seasons={seasons}
            defaultValue={defaultValue}
            variant={variant}
            showTips={showTips}
            {...(tabTriggerClassName !== undefined ? { tabTriggerClassName } : {})}
            {...(tabActiveClassName !== undefined ? { tabActiveClassName } : {})}
            {...(tabInactiveClassName !== undefined ? { tabInactiveClassName } : {})}
            {...(contentCardClassName !== undefined ? { contentCardClassName } : {})}
            {...(contentIconClassName !== undefined ? { contentIconClassName } : {})}
            {...(contentIconGlyphClassName !== undefined ? { contentIconGlyphClassName } : {})}
            {...(contentTitleClassName !== undefined ? { contentTitleClassName } : {})}
            {...(contentTextClassName !== undefined ? { contentTextClassName } : {})}
            showTabGlow={showTabGlow}
            showCardGlow={showCardGlow}
          />
        </div>
      </div>
    </section>
  )
}
