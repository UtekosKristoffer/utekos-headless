// Path: src/components/ui/Button.tsx
import { cn } from '@/lib/utils/className'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        control:
          'border bg-background text-foreground shadow-xs dark:bg-input/30 dark:border-input hover:bg-background',
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-foreground shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        blue: '!bg-[oklch(0.57_0.23507_260.1068)] rounded-3xl text-lg shadow-xs hover:bg-[oklch(0.57_0.23507_260.1068)/80] text-white dark:border-input dark:hover:bg-input/50',
        cart: 'text-white',
        vercel:
          '!h-14 !px-6 md:!h-[3.25rem] md:!px-8 rounded-full text-[15px] font-medium '
          + 'bg-[var(--button)] text-white '
          + 'ring-1 ring-inset ring-white/10 '
          + 'shadow-[0_1px_0_0_rgba(255,255,255,0.22)_inset,0_-1px_0_0_rgba(0,0,0,0.22)_inset,'
          + '0_-2px_8px_-6px_rgba(2,6,23,0.18),'
          + '0_8px_18px_-6px_rgba(2,6,23,0.42),0_2px_6px_rgba(2,6,23,0.32)] '
          + "relative isolate before:absolute before:inset-0 before:rounded-[inherit] before:content-[''] "
          + 'before:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.24),rgba(255,255,255,0)_58%)] '
          + "after:pointer-events-none after:absolute after:inset-[-1px] after:rounded-[inherit] after:content-[''] "
          + 'after:shadow-[0_8px_22px_-10px_rgba(59,130,246,0.38)] '
          + 'hover:-translate-y-[1px]'
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9'
      }
    },
    defaultVariants: { variant: 'default', size: 'default' }
  }
)

type ButtonProps = React.ComponentProps<'button'>
  & VariantProps<typeof buttonVariants> & { asChild?: boolean }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        data-slot='button'
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
