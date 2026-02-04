// Vi importerer de spesifikke typene for Mikrofiber som er string-unions
import type { MicrofiberColor, MicrofiberSize } from '@types'

export const variantMap: Record<
  MicrofiberColor,
  Record<MicrofiberSize, string>
> = {
  vargnatt: {
    medium: '42903231004920',
    large: '42903231070456'
  },
  fjellbla: {
    medium: '42903231037688',
    large: '42903231103224'
  }
}
