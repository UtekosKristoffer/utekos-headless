import type {
  MetaCatalogCustomLabelKey,
  MetaCatalogCustomLabels,
  MetaCatalogVariant
} from './metaCatalogTypes'

const CUSTOM_LABEL_MAPPINGS: Array<{
  labelKey: MetaCatalogCustomLabelKey
  variantField: keyof Pick<
    MetaCatalogVariant,
    | 'customLabel0'
    | 'customLabel1'
    | 'customLabel2'
    | 'customLabel3'
    | 'customLabel4'
  >
}> = [
  { labelKey: 'custom_label_0', variantField: 'customLabel0' },
  { labelKey: 'custom_label_1', variantField: 'customLabel1' },
  { labelKey: 'custom_label_2', variantField: 'customLabel2' },
  { labelKey: 'custom_label_3', variantField: 'customLabel3' },
  { labelKey: 'custom_label_4', variantField: 'customLabel4' }
]

function normalizeCustomLabelValue(value: string | undefined) {
  const trimmedValue = value?.trim()
  return trimmedValue ? trimmedValue : undefined
}

export function extractMetaCatalogCustomLabels(
  variant: Pick<
    MetaCatalogVariant,
    | 'customLabel0'
    | 'customLabel1'
    | 'customLabel2'
    | 'customLabel3'
    | 'customLabel4'
  >
) {
  const labels: MetaCatalogCustomLabels = {}
  const missingLabels: MetaCatalogCustomLabelKey[] = []

  for (const mapping of CUSTOM_LABEL_MAPPINGS) {
    const normalizedValue = normalizeCustomLabelValue(
      variant[mapping.variantField]?.value
    )

    if (normalizedValue) {
      labels[mapping.labelKey] = normalizedValue
      continue
    }

    missingLabels.push(mapping.labelKey)
  }

  return { labels, missingLabels }
}

