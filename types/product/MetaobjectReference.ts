// Path: src/types/product/MetaobjectReference.ts
export type MetaobjectReference = {
  images: MetaobjectField
  subtitle: MetaobjectField
  materials: MetaobjectField
  description: MetaobjectField
  functions: MetaobjectField
  properties: MetaobjectField
  usage: MetaobjectField
  sizeFit: MetaobjectField
  storageAndMaintenance: MetaobjectField
  colorLabel: MetaobjectField
  backgroundColor: MetaobjectField
  swatchHexcolorForVariant: MetaobjectField
  swatchHexcolorForUnselectedVariant: MetaobjectField
  length: MetaobjectField
  centerToWrist: MetaobjectField
  flatWidth: MetaobjectField
}

export type MetaobjectField = {
  value: string | null
}
export type RawMetaobject = {
  fields: {
    key: string
    value: string
  }[]
}

export type VariantMetaobject = MetaobjectReference | null

export type RawField = {
  key: string
  value: string | null
  references?: {
    nodes: MetaobjectNode[]
  } | null
}

export type MetaobjectNode = {
  image: MetaobjectField['value']
}
