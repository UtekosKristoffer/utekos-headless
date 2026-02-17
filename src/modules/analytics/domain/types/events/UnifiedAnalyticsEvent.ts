// Path: src/modules/analytics/domain/events.types.ts
import { z } from 'zod'
import { UnifiedAnalyticsEventSchema } from '../../schemas/events.schema'

export type UnifiedAnalyticsEvent = z.infer<typeof UnifiedAnalyticsEventSchema>
