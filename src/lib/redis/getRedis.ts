// Path: src/lib/redis.ts
import { createClient, type RedisClientType } from 'redis'

let _client: RedisClientType | null = null
let _connectPromise: Promise<RedisClientType> | null = null

export async function getRedis(): Promise<RedisClientType> {
  if (_client && _client.isOpen) return _client

  // Prevent multiple simultaneous connection attempts
  if (_connectPromise) return _connectPromise

  _connectPromise = (async () => {
    const url = process.env.REDIS_URL
    if (!url) throw new Error('Missing REDIS_URL')

    _client = createClient({
      url,
      socket: {
        reconnectStrategy: retries => Math.min(retries * 50, 500),
        connectTimeout: 5000,
        keepAlive: true
      }
    })

    _client.on('error', err => console.error('Redis Client Error', err))
    _client.on('reconnecting', () => console.warn('Redis Client Reconnecting'))
    _client.on('ready', () => console.info('Redis Client Ready'))

    if (!_client.isOpen) {
      await _client.connect()
    }

    return _client
  })()

  try {
    return await _connectPromise
  } finally {
    _connectPromise = null
  }
}
