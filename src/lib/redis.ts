import { createClient, type RedisClientType } from 'redis'

let _client: RedisClientType | null = null

export async function getRedis(): Promise<RedisClientType> {
  if (_client && _client.isOpen) return _client

  const url = process.env.REDIS_URL
  if (!url) throw new Error('Missing REDIS_URL')

  _client = createClient({ url })
  if (!_client.isOpen) await _client.connect()
  return _client
}

export async function redisSet<T>(key: string, value: T, ttlSeconds?: number) {
  const client = await getRedis()
  const payload = JSON.stringify(value)
  return ttlSeconds ?
      client.set(key, payload, { EX: ttlSeconds })
    : client.set(key, payload)
}

export async function redisGet<T>(key: string): Promise<T | null> {
  const client = await getRedis()
  const raw = await client.get(key)
  return raw ? (JSON.parse(raw) as T) : null
}

export async function redisDel(key: string) {
  const client = await getRedis()
  await client.del(key)
}
