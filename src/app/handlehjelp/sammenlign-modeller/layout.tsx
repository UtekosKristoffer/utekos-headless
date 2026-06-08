import { CompareModelsJsonLd } from './components/CompareModelsJsonLd'

export default function CompareModelsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CompareModelsJsonLd />

      {children}
    </>
  )
}
