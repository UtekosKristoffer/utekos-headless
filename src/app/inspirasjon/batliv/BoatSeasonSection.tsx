import { InspirationSeasonsSection } from '../components/InspirationSeasonsSection'
import { boatingSeasons } from './boatingSeasons'

export function BoatSeasonSection() {
  return (
    <InspirationSeasonsSection
      title='Tips for en lengre sesong'
      lead='Nyt båtlivet fra tidlig vår til sen høst'
      seasons={boatingSeasons}
      defaultValue='summer'
      glowTokens={['var(--ancient-water)', 'var(--primary)']}
    />
  )
}
