// Path: src/components/ProductCard/getProductVariants.ts

interface ProductVariant {
  color: string
  colorName: string
  colorCode: string
  imageUrl?: string
}

export const getProductVariants = (handle: string): ProductVariant[] => {
  switch (handle) {
    case 'comfyrobe':
      return [
        {
          color: 'Fjellhimmel',
          colorName: 'Fjellhimmel',
          colorCode: '#232B38',
          imageUrl: '/produkter/comfyrobe'
        }
      ]
    case 'utekos-dun':
    case 'utekos-mikrofiber':
      return [
        {
          color: 'Fjellblå',
          colorName: 'Fjellblå',
          colorCode: '#020244',
          imageUrl: '/produkter/comfyrobe'
        },
        {
          color: 'Vargnatt',
          colorName: 'Vargnatt',
          colorCode: '#000000',
          imageUrl: '/produkter/comfyrobe'
        }
      ]
    default:
      return []
  }
}
