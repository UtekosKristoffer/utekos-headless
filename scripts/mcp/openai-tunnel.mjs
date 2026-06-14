#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { randomBytes } from 'node:crypto'
import { spawn, spawnSync } from 'node:child_process'

import dotenv from 'dotenv'

const root = process.cwd()
const command = process.argv[2] ?? 'check'
const envPath = path.join(root, '.env.tunnel.local')
const examplePath = path.join(root, '.env.tunnel.example')

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {}
  return dotenv.parse(fs.readFileSync(filePath, 'utf8'))
}

function loadTunnelEnv() {
  const env = {
    ...readEnvFile(examplePath),
    ...readEnvFile(envPath),
    ...process.env
  }

  env.OPENAI_TUNNEL_PROFILE ||= 'utekos-docker-core'
  env.OPENAI_TUNNEL_MCP_URL ||= 'http://127.0.0.1:8813/mcp'
  env.OPENAI_TUNNEL_MCP_PORT ||= '8812'
  env.OPENAI_TUNNEL_HEALTH_ADDR ||= '127.0.0.1:8080'
  env.DOCKER_MCP_PROFILE ||= 'utekos_core_safe'

  return env
}

function run(commandName, args, options = {}) {
  return spawnSync(commandName, args, {
    cwd: root,
    encoding: 'utf8',
    stdio: options.stdio ?? ['ignore', 'pipe', 'pipe'],
    env: options.env ?? process.env
  })
}

function spawnForeground(commandName, args, env) {
  const child = spawn(commandName, args, {
    cwd: root,
    stdio: 'inherit',
    env
  })

  child.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal)
      return
    }

    process.exit(code ?? 0)
  })

  child.on('error', error => {
    console.error(error.message)
    process.exit(1)
  })
}

function firstLine(value) {
  return (value ?? '').split('\n').find(line => line.trim() !== '')?.trim() ?? ''
}

function hasValue(env, key) {
  return typeof env[key] === 'string' && env[key].trim() !== ''
}

function required(env, keys) {
  const missing = keys.filter(key => !hasValue(env, key))
  if (missing.length === 0) return

  console.error(`Missing required tunnel env: ${missing.join(', ')}`)
  console.error('Fill .env.tunnel.local, then rerun this command.')
  process.exit(1)
}

function tunnelEnv(env) {
  return {
    ...process.env,
    ...env
  }
}

function bootstrapEnv() {
  if (fs.existsSync(envPath)) {
    console.log('.env.tunnel.local already exists')
    return
  }

  const token = `utekos-${randomBytes(32).toString('hex')}`
  const content = fs
    .readFileSync(examplePath, 'utf8')
    .replace('MCP_GATEWAY_AUTH_TOKEN=\n', `MCP_GATEWAY_AUTH_TOKEN=${token}\n`)

  fs.writeFileSync(envPath, content, 'utf8')
  console.log('Created .env.tunnel.local')
  console.log('Fill CONTROL_PLANE_TUNNEL_ID and CONTROL_PLANE_API_KEY from OpenAI Platform UI.')
}

function check() {
  const env = loadTunnelEnv()
  const checks = []
  const tunnelClient = run('tunnel-client', ['--version'])

  checks.push({
    name: 'tunnel-client',
    ok: tunnelClient.status === 0,
    message: tunnelClient.status === 0 ? firstLine(tunnelClient.stdout) : 'not installed or not on PATH'
  })

  const docker = run('docker', ['mcp', 'version'])
  checks.push({
    name: 'docker-mcp',
    ok: docker.status === 0,
    message: docker.status === 0 ? firstLine(docker.stdout) : 'docker mcp unavailable'
  })

  for (const key of ['CONTROL_PLANE_TUNNEL_ID', 'CONTROL_PLANE_API_KEY', 'MCP_GATEWAY_AUTH_TOKEN']) {
    checks.push({
      name: `env:${key}`,
      ok: hasValue(env, key),
      message: hasValue(env, key) ? 'set' : 'missing'
    })
  }

  for (const check of checks) {
    console.log(`${check.ok ? 'OK' : 'WARN'} ${check.name}: ${check.message}`)
  }

  const hardFailures = checks.filter(check => !check.ok && !check.name.startsWith('env:'))
  if (hardFailures.length > 0) process.exit(1)
}

function initProfile() {
  const env = loadTunnelEnv()
  required(env, ['CONTROL_PLANE_TUNNEL_ID'])

  const result = run(
    'tunnel-client',
    [
      'init',
      '--sample',
      'sample_mcp_remote_no_auth',
      '--profile',
      env.OPENAI_TUNNEL_PROFILE,
      '--tunnel-id',
      env.CONTROL_PLANE_TUNNEL_ID,
      '--mcp-server-url',
      env.OPENAI_TUNNEL_MCP_URL,
      '--health-listen-addr',
      env.OPENAI_TUNNEL_HEALTH_ADDR,
      '--control-plane-api-key-ref',
      'env:CONTROL_PLANE_API_KEY',
      '--force'
    ],
    { env: tunnelEnv(env) }
  )

  process.stdout.write(result.stdout)
  process.stderr.write(result.stderr)
  process.exit(result.status ?? 0)
}

function doctor() {
  const env = loadTunnelEnv()
  required(env, ['CONTROL_PLANE_TUNNEL_ID', 'CONTROL_PLANE_API_KEY', 'MCP_GATEWAY_AUTH_TOKEN'])

  const result = run(
    'tunnel-client',
    ['doctor', '--profile', env.OPENAI_TUNNEL_PROFILE, '--explain'],
    { env: tunnelEnv(env) }
  )

  process.stdout.write(result.stdout)
  process.stderr.write(result.stderr)
  process.exit(result.status ?? 0)
}

function gateway() {
  const env = loadTunnelEnv()
  required(env, ['MCP_GATEWAY_AUTH_TOKEN'])

  spawnForeground(
    'docker',
    [
      'mcp',
      'gateway',
      'run',
      '--profile',
      env.DOCKER_MCP_PROFILE,
      '--transport',
      'streaming',
      '--port',
      env.OPENAI_TUNNEL_MCP_PORT
    ],
    tunnelEnv(env)
  )
}

function runTunnel() {
  const env = loadTunnelEnv()
  required(env, ['CONTROL_PLANE_TUNNEL_ID', 'CONTROL_PLANE_API_KEY', 'MCP_GATEWAY_AUTH_TOKEN'])

  spawnForeground(
    'tunnel-client',
    ['run', '--profile', env.OPENAI_TUNNEL_PROFILE],
    tunnelEnv(env)
  )
}

function usage() {
  console.log('Usage: node scripts/mcp/openai-tunnel.mjs <bootstrap-env|check|init|doctor|gateway|run>')
}

switch (command) {
  case 'bootstrap-env':
    bootstrapEnv()
    break
  case 'check':
    check()
    break
  case 'init':
    initProfile()
    break
  case 'doctor':
    doctor()
    break
  case 'gateway':
    gateway()
    break
  case 'run':
    runTunnel()
    break
  default:
    usage()
    process.exit(1)
}
