import { comfyrobeData } from '@/app/handlehjelp/storrelsesguide/data'

export function formatComfyrobeSizeFacts(): string {
  return comfyrobeData.map(row => `- ${row.measurement}: S ${row.xs}, M ${row.ml}, L ${row.lxl}`).join('\n')
}
