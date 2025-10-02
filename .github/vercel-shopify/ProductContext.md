# Productprovider, ProductContext og mer.

## **ProductProvider**

```tsx
'use client'

import { ProductContext } from '@/lib/context/ProductContext'
import type { ProductState } from '@types'
import { useSearchParams } from 'next/navigation'
import React, { useMemo, useOptimistic } from 'react'

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()

  const getInitialState = () => {
    const params: ProductState = {}
    for (const [key, value] of searchParams.entries()) {
      params[key] = value
    }
    return params
  }

  const [state, setOptimisticState] = useOptimistic(
    getInitialState(),
    (prevState: ProductState, update: ProductState) => ({
      ...prevState,
      ...update
    })
  )

  const updateOption = React.useCallback(
    (name: string, value: string) => {
      const newState = { [name]: value }
      setOptimisticState(newState)
      return { ...state, ...newState }
    },
    [setOptimisticState, state]
  )

  const updateImage = React.useCallback(
    (index: string) => {
      const newState = { image: index }
      setOptimisticState(newState)
      return { ...state, ...newState }
    },
    [setOptimisticState, state]
  )

  const value = useMemo(
    () => ({
      state,
      updateOption,
      updateImage
    }),
    [state, updateOption, updateImage]
  )

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}
```

## **ProductContext**

```ts
import type { ProductContextType } from '@types'
import { ProductContext } from 'react'

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
)
```

## **Importerte typer**

```ts
export type ProductState = {
  [key: string]: string
} & {
  image?: string
}

export type ProductContextType = {
state: ProductState
updateOption: (\_name: string, \_value: string) => ProductState
updateImage: (\_index: string) => ProductState
}
```

## Ikke gjennomførte planer

```ts
'use client'
export function useProduct() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider')
  }
  return context
}

export function useUpdateURL() {
  const router = useRouter()

  return (state: ProductState) => {
    const newParams = new URLSearchParams(window.location.search)
    Object.entries(state).forEach(([key, value]) => {
      newParams.set(key, value)
    })
    router.push(`?${newParams.toString()}`, { scroll: false })
  }
}
```

## Eksempler

I et en VariantSelector...

```ts
const { state, updateOption } = useProduct()
const updateURL = useUpdateURL()
```

I et en hypotetisk Gallery-komponent...

```tsx
export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image) : 0;

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  const buttonClassName = {...}

  return (
    <form>
      <div className={...}>
        {images[imageIndex] && (
          <Image
            className= {...}
          />
        )}

        {images.length > 1 ? (
          <div className={...}
        <div className={...}
              <button
                formAction={() => {
                  const newState = updateImage(previousImageIndex.toString());
                  updateURL(newState);
                }}
                aria-label="Previous product image"
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <div className={...}></div>
              <button
                formAction={() => {
                  const newState = updateImage(nextImageIndex.toString());
                  updateURL(newState);
                }}
                aria-label="Next product image"
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul className={...}>
          {images.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <li key={image.src} className="size-20">
                <button
                  formAction={() => {
                    const newState = updateImage(index.toString());
                    updateURL(newState);
                  }}
                  aria-label="Select product image"
                  className="size-full"
                >
                </button>
              {...}
    </form>
  );
}
```

På produktsiden...

```tsx
<Suspense
  fallback={
    <div className='relative aspect-square h-full max-h-[550px] w-full overflow-hidden' />
  }
>
  <Gallery
    images={product.images.slice(0, 5).map((image: Image) => ({
      src: image.url,
      altText: image.altText
    }))}
  />
</Suspense>
```
