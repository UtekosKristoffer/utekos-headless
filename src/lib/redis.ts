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
export async function redisSet<T>(key: string, value: T, ttlSeconds?: number) {
  const client = await getRedis()
  const payload = JSON.stringify(value)
  if (ttlSeconds) {
    await client.set(key, payload, { EX: ttlSeconds })
  } else {
    await client.set(key, payload)
  }
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

export async function redisPush<T>(key: string, value: T) {
  const client = await getRedis()
  const payload = JSON.stringify(value)
  await client.lPush(key, payload)
}

export async function redisList<T>(
  key: string,
  start: number = 0,
  end: number = -1
): Promise<T[]> {
  const client = await getRedis()
  const rawList = await client.lRange(key, start, end)
  return rawList.map(item => JSON.parse(item) as T)
}

export async function redisTrim(key: string, start: number, end: number) {
  const client = await getRedis()
  await client.lTrim(key, start, end)
}
