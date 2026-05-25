export const grillCardThemes = [
  {
    surface: 'bg-bleached-mauve',
    border: 'border-cloud-dancer/12 hover:border-cloud-dancer/24',
    text: 'text-maritime-darkest',
    mutedText: 'text-maritime-darkest/90',
    glow: 'bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklch,var(--cloud-dancer)_16%,transparent),transparent_38%)]',
    iconSurface: '--color-cloud-dancer',
    iconColor: 'text-maritime-darkest'
  },
  {
    surface: 'bg-maritime-blue',
    border: 'border-cloud-dancer/14 hover:border-cloud-dancer/28',
    text: 'text-cloud-dancer',
    mutedText: 'text-cloud-dancer/88',
    glow: 'bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklch,var(--ancient-water)_24%,transparent),transparent_40%)]',
    iconSurface: '--color-cloud-dancer',
    iconColor: 'text-maritime-darkest'
  },
  {
    surface: 'bg-mountain-view',
    border: 'border-cloud-dancer/14 hover:border-cloud-dancer/28',
    text: 'text-cloud-dancer',
    mutedText: 'text-cloud-dancer/90',
    glow: 'bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklch,var(--fairest-jade)_18%,transparent),transparent_40%)]',
    iconSurface: '--overcast',
    iconColor: 'text-maritime-darkest'
  },
  {
    surface: 'bg-demitasse',
    border: 'border-cloud-dancer/14 hover:border-cloud-dancer/28',
    text: 'text-cloud-dancer',
    mutedText: 'text-cloud-dancer/88',
    glow: 'bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklch,var(--overcast)_18%,transparent),transparent_40%)]',
    iconSurface: '--color-cloud-dancer',
    iconColor: 'text-maritime-darkest'
  }
] as const
