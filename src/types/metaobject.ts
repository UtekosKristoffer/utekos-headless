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
