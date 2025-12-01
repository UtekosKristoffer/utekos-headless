// Path: src/components/ui/snowfall.tsx
'use client'

import { useEffect, useRef } from 'react'

interface Snowflake {
  x: number
  y: number
  radius: number
  speed: number
  sway: number // Hvor mye den svaier sideveis
  swaySpeed: number // Hvor fort den svaier
}

interface SnowfallProps {
  flakeCount?: number
  speed?: number // Hvor fort det faller generelt (0.1 - 1.0)
  minSize?: number // Minste snøflak (px)
  maxSize?: number // Største snøflak (px)
}

export function Snowfall({
  flakeCount = 50,
  speed = 0.5,
  minSize = 1,
  maxSize = 3
}: SnowfallProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = window.innerWidth
    let h = window.innerHeight
    let animationFrameId: number
    let time = 0

    const setCanvasSize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }
    setCanvasSize()

    const flakes: Snowflake[] = []
    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * (maxSize - minSize) + minSize,
        // Hastighet: Kombinasjon av global speed og flakets størrelse (store faller litt fortere)
        speed: (Math.random() * 0.5 + 0.5) * speed * 2,
        sway: Math.random() - 0.5,
        swaySpeed: Math.random() * 0.02 + 0.005
      })
    }

    // 3. Tegne-loopen
    const render = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)' // Hvit med litt transparens
      ctx.beginPath()

      time += 0.01

      for (let i = 0; i < flakeCount; i++) {
        const f = flakes[i]
        if (!f) continue

        f.y += f.speed
        f.x += Math.sin(time + f.sway * 10) * 0.5

        if (f.y > h) {
          f.y = -5
          f.x = Math.random() * w // Ny tilfeldig X-posisjon på toppen
        }
        if (f.x > w) f.x = 0
        if (f.x < 0) f.x = w

        ctx.moveTo(f.x, f.y)
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2)
      }

      ctx.fill()
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    window.addEventListener('resize', setCanvasSize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [flakeCount, speed, minSize, maxSize])

  return (
    <canvas
      ref={canvasRef}
      className='fixed inset-0 z-50 pointer-events-none h-full w-full'
      style={{ pointerEvents: 'none' }}
      aria-hidden='true'
    />
  )
}
