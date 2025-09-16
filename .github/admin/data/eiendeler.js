import {
  specialEditionTotalValueNOK,
  comfyrobeTotalValueNOK,
  utekosDunTotalValueNOK,
  utekosMikrofiberTotalValueNOK
} from './produkter/index.js'

export const inventoryAssets =
  specialEditionTotalValueNOK
  + comfyrobeTotalValueNOK
  + utekosDunTotalValueNOK
  + utekosMikrofiberTotalValueNOK // 613240 NOK

export const lastUpdatedInventoryValue = 613240 // NOK
