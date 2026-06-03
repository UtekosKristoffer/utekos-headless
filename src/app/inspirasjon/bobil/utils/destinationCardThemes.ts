export const destinationCardThemes = [
  {
    surface: 'bg-bleached-mauve',
    border: 'border-cloud-dancer/12 hover:border-cloud-dancer/24',
    text: 'text-background',
    mutedText: 'text-background/90',
    glow: 'bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklch,var(--cloud-dancer)_16%,transparent),transparent_38%)]',
    badgeBackground: 'var(--color-cloud-dancer)',
    badgeText: 'var(--color-background)'
  },
  {
    surface: 'bg-havdyp',
    border: 'border-cloud-dancer/14 hover:border-cloud-dancer/28',
    text: 'text-foreground',
    mutedText: 'text-foreground/88',
    glow: 'bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklch,var(--ancient-water)_24%,transparent),transparent_40%)]',
    badgeBackground: 'var(--color-ancient-water)',
    badgeText: 'var(--color-background)'
  },
  {
    surface: 'bg-mountain-view',
    border: 'border-cloud-dancer/14 hover:border-cloud-dancer/28',
    text: 'text-foreground',
    mutedText: 'text-foreground/90',
    glow: 'bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklch,var(--fairest-jade)_18%,transparent),transparent_40%)]',
    badgeBackground: 'var(--color-fairest-jade)',
    badgeText: 'var(--color-background)'
  },
  {
    surface: 'bg-demitasse',
    border: 'border-cloud-dancer/14 hover:border-cloud-dancer/28',
    text: 'text-foreground',
    mutedText: 'text-foreground/88',
    glow: 'bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklch,var(--overcast)_18%,transparent),transparent_40%)]',
    badgeBackground: 'var(--color-overcast)',
    badgeText: 'var(--color-background)'
  }
] as const
