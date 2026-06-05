// Path: src/lib/redis.ts
import { createClient, type RedisClientType } from 'redis'

let _client: RedisClientType | null = null
export async function getRedis(): Promise<RedisClientType> {
  if (_client && _client.isOpen) return _client

  const url = process.env.REDIS_URL
  if (!url) throw new Error('Missing REDIS_URL')

  _client = createClient({ url })
  _client.on('error', err => console.error('Redis Client Error', err))

  if (!_client.isOpen) await _client.connect()
  return _client
}
