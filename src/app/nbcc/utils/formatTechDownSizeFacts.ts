import { tecDownData } from '@/app/handlehjelp/storrelsesguide/data'

export function formatTechDownSizeFacts(): string {
  return tecDownData
    .map(row => `- ${row.measurement}: Liten ${row.liten}, Middels ${row.middels}, Stor ${row.stor}`)
    .join('\n')
}
