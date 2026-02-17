// Path: src/modules/analytics/services/redis/operations/fetchFirstActiveRedisRecord.ts
import { redisGet } from '@/lib/redis/redisGet'

/**
 * Iterates through a list of potential Redis keys and returns the first non-null result.
 * Handles the "First Match Wins" strategy.
 */
export async function fetchFirstActiveRedisRecord(
  keys: string[]
): Promise<unknown | null> {
  for (const key of keys) {
    try {
      const data = await redisGet(key)
      if (data) {
        return data
      }
    } catch (error) {
      console.error(`[Analytics] Redis read error for key ${key}:`, error)
      // Continue to next key on error
    }
  }
  return null
}
