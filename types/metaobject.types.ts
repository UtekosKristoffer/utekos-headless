// Path: types/metaobject.types.ts
export type MetaobjectReference = {
  images: MetaobjectField
  subtitle: MetaobjectField
  materials: MetaobjectField
  functions: MetaobjectField
  properties: MetaobjectField
  usage: MetaobjectField
  sizeFit: MetaobjectField
  storageAndMaintenance: MetaobjectField
  colorLabel: MetaobjectField
  backgroundColor: MetaobjectField
  swatchHexcolorForVariant: MetaobjectField
  length: MetaobjectField
  centerToWrist: MetaobjectField
  flatWidth: MetaobjectField
}

export type MetaobjectField = {
  value: string
} | null

export type RawMetaobject = {
  fields: {
    key: string
    value: string
  }[]
}

export type Metafield = {
  namespace: string
  key: string
  reference: RawMetaobject | null
}

export type MetafieldReference = VariantMetaobject

export type VariantMetaobject = MetaobjectReference | null

export type RawField = {
  key: string
  value: string | null
  references?: {
    nodes: any[] // Bruker 'any' for enkelhetens skyld
  } | null
}
