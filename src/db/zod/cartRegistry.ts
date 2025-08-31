import * as z from 'zod/mini'

export const cartRegistry = z.registry<{ description: string }>()
