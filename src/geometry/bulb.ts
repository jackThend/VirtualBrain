import { PARTICLE_COUNT } from '../types'

function getBulbProfile(t: number): number {
  if (t < 0.0) return 0
  if (t < 0.05) {
    const s = t / 0.05
    return s * s * 0.18
  }
  if (t < 0.12) {
    const s = (t - 0.05) / 0.07
    return 0.18 + s * 0.22
  }
  if (t < 0.35) {
    const s = (t - 0.12) / 0.23
    return 0.4 + Math.sin(s * Math.PI) * 0.38
  }
  if (t < 0.45) {
    const s = (t - 0.35) / 0.1
    return 0.4 - s * 0.08
  }
  if (t < 0.5) {
    return 0.32
  }
  if (t < 0.65) {
    const s = (t - 0.5) / 0.15
    return 0.32 - s * 0.04
  }
  if (t < 0.85) {
    const s = (t - 0.65) / 0.2
    const threadR = Math.sin(s * Math.PI * 5) * 0.018
    return 0.28 + threadR
  }
  const s = (t - 0.85) / 0.15
  return 0.28 * (1 - s * 0.55)
}

function getBulbY(t: number): number {
  return 1.0 - t * 2.2
}

export function generateBulb(): { positions: Float32Array; normals: Float32Array } {
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const normals = new Float32Array(PARTICLE_COUNT * 3)
  let idx = 0

  const glassCount = Math.floor(PARTICLE_COUNT * 0.52)
  const capCount = Math.floor(PARTICLE_COUNT * 0.16)
  const filamentCount = Math.floor(PARTICLE_COUNT * 0.22)
  const contactCount = PARTICLE_COUNT - glassCount - capCount - filamentCount

  for (let i = 0; i < glassCount; i++) {
    const t = 0.01 + Math.random() * 0.5
    const angle = Math.random() * Math.PI * 2
    const r = getBulbProfile(t)
    const y = getBulbY(t)

    const jitter = (Math.random() - 0.5) * 0.012
    const x = Math.cos(angle) * (r + jitter)
    const z = Math.sin(angle) * (r + jitter)

    const dt = 0.001
    const rUp = getBulbProfile(t + dt)
    const rDown = getBulbProfile(t - dt)
    const yUp = getBulbY(t + dt)
    const yDown = getBulbY(t - dt)
    const dy = yUp - yDown
    const dr = rUp - rDown
    const tangentLen = Math.sqrt(dr * dr + dy * dy) || 1
    const nx = Math.cos(angle) * dr / tangentLen
    const ny = dy / tangentLen
    const nz = Math.sin(angle) * dr / tangentLen

    positions[idx * 3] = x
    positions[idx * 3 + 1] = y
    positions[idx * 3 + 2] = z
    normals[idx * 3] = nx
    normals[idx * 3 + 1] = ny
    normals[idx * 3 + 2] = nz
    idx++
  }

  for (let i = 0; i < capCount; i++) {
    const t = 0.5 + Math.random() * 0.35
    const angle = Math.random() * Math.PI * 2
    const r = getBulbProfile(t)
    const y = getBulbY(t)

    const x = Math.cos(angle) * r
    const z = Math.sin(angle) * r

    positions[idx * 3] = x
    positions[idx * 3 + 1] = y
    positions[idx * 3 + 2] = z
    normals[idx * 3] = Math.cos(angle)
    normals[idx * 3 + 1] = 0
    normals[idx * 3 + 2] = Math.sin(angle)
    idx++
  }

  for (let i = 0; i < filamentCount; i++) {
    const t = i / filamentCount
    const mainAngle = t * Math.PI * 2

    const archHeight = 0.48
    const archRadius = 0.07
    const loopFreq = 4

    const loopAngle = mainAngle * loopFreq
    const x = Math.sin(loopAngle) * archRadius
    const y = -0.08 + Math.sin(t * Math.PI) * archHeight
    const z = Math.cos(loopAngle) * archRadius * 0.3

    const supportY = -0.08 + Math.sin(t * Math.PI * 0.3) * 0.18

    const finalY = t < 0.08 || t > 0.92 ? supportY : y

    const glow = 0.01
    positions[idx * 3] = x + (Math.random() - 0.5) * glow
    positions[idx * 3 + 1] = finalY + (Math.random() - 0.5) * glow
    positions[idx * 3 + 2] = z + (Math.random() - 0.5) * glow
    normals[idx * 3] = 0
    normals[idx * 3 + 1] = 1
    normals[idx * 3 + 2] = 0
    idx++
  }

  for (let i = 0; i < contactCount; i++) {
    const t = i / contactCount
    const angle = Math.random() * Math.PI * 2

    const r = 0.16 + Math.random() * 0.09
    const y = -1.05 - Math.random() * 0.1

    const x = Math.cos(angle) * r
    const z = Math.sin(angle) * r

    positions[idx * 3] = x
    positions[idx * 3 + 1] = y
    positions[idx * 3 + 2] = z
    normals[idx * 3] = Math.cos(angle)
    normals[idx * 3 + 1] = -0.5
    normals[idx * 3 + 2] = Math.sin(angle)
    idx++
  }

  return { positions, normals }
}
