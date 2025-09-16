import type { ProductState } from '@types'

export type ProductContextType = {
  state: ProductState
  updateOption: (_name: string, _value: string) => ProductState
  updateImage: (_index: string) => ProductState
}
