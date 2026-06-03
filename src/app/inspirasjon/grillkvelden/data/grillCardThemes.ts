export const grillCardThemes = [
  {
    surface: 'bg-bleached-mauve',
    border: 'border-cloud-dancer/12 hover:border-cloud-dancer/24',
    text: 'text-background',
    mutedText: 'text-background/90',
    glow: 'bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklch,var(--cloud-dancer)_16%,transparent),transparent_38%)]',
    iconSurface: '--color-cloud-dancer',
    iconColor: 'text-background'
  },
  {
    surface: 'bg-havdyp',
    border: 'border-cloud-dancer/14 hover:border-cloud-dancer/28',
    text: 'text-foreground',
    mutedText: 'text-foreground/88',
    glow: 'bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklch,var(--ancient-water)_24%,transparent),transparent_40%)]',
    iconSurface: '--color-cloud-dancer',
    iconColor: 'text-background'
  },
  {
    surface: 'bg-mountain-view',
    border: 'border-cloud-dancer/14 hover:border-cloud-dancer/28',
    text: 'text-foreground',
    mutedText: 'text-foreground/90',
    glow: 'bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklch,var(--fairest-jade)_18%,transparent),transparent_40%)]',
    iconSurface: '--overcast',
    iconColor: 'text-background'
  },
  {
    surface: 'bg-demitasse',
    border: 'border-cloud-dancer/14 hover:border-cloud-dancer/28',
    text: 'text-foreground',
    mutedText: 'text-foreground/88',
    glow: 'bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklch,var(--overcast)_18%,transparent),transparent_40%)]',
    iconSurface: '--color-cloud-dancer',
    iconColor: 'text-background'
  }
] as const
