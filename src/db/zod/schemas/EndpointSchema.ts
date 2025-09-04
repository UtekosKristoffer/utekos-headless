import { z } from '@/db/zod/zodConfig'

export const EndpointSchema = z
  .object({
    url: z.string().url({ message: 'URL er ikke gyldig' }),
  })
  .brand<'Endpoint'>();

  export const EndpointJSONSchema = z.toJSONSchema(EndpointSchema);

