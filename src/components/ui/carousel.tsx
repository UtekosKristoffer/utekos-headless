'use client'

import * as React from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import Accessibility from 'embla-carousel-accessibility'
import ClassNames from 'embla-carousel-class-names'
import Ssr, { type SsrOptionsType } from 'embla-carousel-ssr'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils/className'
import { Button } from '@/components/ui/button'
import { resolveCarouselSsrOptions } from '@/components/ui/carousel-ssr'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
  /** Required for SSR when `loop`, `containScroll: false`, or non-zero `startSnap` is set. */
  slideCount?: number
  /** Override default 100% SSR slide sizes (must match slide `basis-*` CSS). */
  ssr?: SsrOptionsType
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  emblaServerApi: ReturnType<typeof useEmblaCarousel>[2]
  carouselId: string
  ssrOptions: SsrOptionsType | null
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  slideCount,
  ssr,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const carouselId = React.useId().replace(/:/g, '')
  const mergedOpts = React.useMemo(
    () => ({
      ...opts,
      axis: orientation === 'horizontal' ? ('x' as const) : ('y' as const)
    }),
    [opts, orientation]
  )

  const ssrOptions = React.useMemo(
    () => resolveCarouselSsrOptions(mergedOpts, slideCount, ssr),
    [mergedOpts, slideCount, ssr]
  )

  const accessibilityPlugin = React.useRef(Accessibility())
  const classNamesPlugin = React.useRef(ClassNames())

  const resolvedPlugins = React.useMemo(() => {
    const basePlugins = [
      accessibilityPlugin.current,
      classNamesPlugin.current,
      ...(ssrOptions ? [Ssr(ssrOptions)] : []),
      ...(plugins ?? [])
    ]

    return basePlugins
  }, [plugins, ssrOptions])

  const [carouselRef, api, emblaServerApi] = useEmblaCarousel(mergedOpts, resolvedPlugins)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return
    setCanScrollPrev(carouselApi.canGoToPrev())
    setCanScrollNext(carouselApi.canGoToNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.goToPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.goToNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on('reinit', onSelect)
    api.on('select', onSelect)

    return () => {
      api.off('reinit', onSelect)
      api.off('select', onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        emblaServerApi,
        carouselId,
        ssrOptions,
        opts,
        orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        ...(plugins ? { plugins } : {}),
        ...(setApi ? { setApi } : {}),
        ...(slideCount != null ? { slideCount } : {}),
        ...(ssr ? { ssr } : {})
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role='region'
        aria-roledescription='carousel'
        data-slot='carousel'
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation, carouselId, api, emblaServerApi, ssrOptions } = useCarousel()
  const renderSsrStyles = !api && ssrOptions

  return (
    <>
      {renderSsrStyles ?
        <style
          dangerouslySetInnerHTML={{
            __html:
              emblaServerApi.plugins()?.ssr?.getStyles(`#${carouselId}`, '[data-slot="carousel-item"]') ?? ''
          }}
        />
      : null}
      <div ref={carouselRef} className='h-full overflow-hidden' data-slot='carousel-content'>
        <div
          id={carouselId}
          className={cn(
            'flex h-full touch-pan-y pinch-zoom',
            orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
            className
          )}
          {...props}
        />
      </div>
    </>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useCarousel()

  return (
    <div
      role='group'
      aria-roledescription='slide'
      data-slot='carousel-item'
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot='carousel-previous'
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal' ?
          'top-1/2 left-4 -translate-y-1/2'
        : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className='sr-only'>Previous slide</span>
    </Button>
  )
}

function CarouselNext({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot='carousel-next'
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal' ?
          'top-1/2 right-4 -translate-y-1/2'
        : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className='sr-only'>Next slide</span>
    </Button>
  )
}

export {
  type CarouselApi,
  type CarouselOptions,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
}
