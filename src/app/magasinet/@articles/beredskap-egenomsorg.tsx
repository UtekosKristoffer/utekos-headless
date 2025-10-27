// Path: src/app/magasinet/@articles/beredskap-egenomsorg.tsx
import { HeroBeredskap } from '../beredskap-egenomsorg/HeroBeredskap'
import { HvorforUtekosSection } from '../beredskap-egenomsorg/HvorforUtekosSection'
import { ProduktguideBeredskap } from '../beredskap-egenomsorg/ProduktguideBeredskap'
import { BeredskapspakkenSection } from '../beredskap-egenomsorg/BeredskapspakkenSection'
import { ProfesjonellBrukSection } from '../beredskap-egenomsorg/ProfesjonellBrukSection'

export function BeredskapEgenomsorgArticle() {
  return (
    <main className="md:max-w-4xl mx-auto">
      <HeroBeredskap />
      <HvorforUtekosSection />
      <ProduktguideBeredskap />
      <BeredskapspakkenSection />
      <ProfesjonellBrukSection />
    </main>
  )
}