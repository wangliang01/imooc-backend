import { createClient } from 'redis'
console.log('redis url:', process.env.REDIS_URL)
console.log('PORT', process.env.PORT)
const client = createClient({
  url: process.env.REDIS_URL
})

// 连接到 Redis 服务器
client.connect()

// 关闭连接
client.on('error', (err) => {
  console.error('Redis Client Error', err)
})

client.on('close', () => {
  console.log('Redis client disconnected')
})

client.on('end', () => {
  console.log('Redis client connection ended')
})

export function setValue(key, value, expireTime) {
  if (typeof key === 'undefined' || key === null || key === '') return
  if (typeof value === 'string') {
    if (expireTime) {
      client.set(key, value, 'EX', expireTime)
    } else {
      client.set(key, value)
    }
  } else {
    Object.keys(value).forEach(function (k) {
      client.hSet(key, k, value[k])
    })
  }
}

export function getValue(key) {
  if (typeof key === 'undefined' || key === null || key === '') return

  return client.get(key)
}

export function getHValue(key) {
  if (typeof key === 'undefined' || key === null || key === '') return

  return client.hGetAll(key)
}

export default client
