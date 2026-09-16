import { PARTICLE_COUNT } from '../types'

const BULB_X = -1.2
const TILT = (-28 * Math.PI) / 180

function getBulbProfile(t: number): number {
  if (t < 0.0) return 0
  if (t < 0.05) {
    const s = t / 0.05
    return s * s * 0.16
  }
  if (t < 0.12) {
    const s = (t - 0.05) / 0.07
    return 0.16 + s * 0.24
  }
  if (t < 0.35) {
    const s = (t - 0.12) / 0.23
    return 0.4 + Math.sin(s * Math.PI) * 0.42
  }
  if (t < 0.45) {
    const s = (t - 0.35) / 0.1
    return 0.4 - s * 0.1
  }
  if (t < 0.5) {
    return 0.3
  }
  if (t < 0.65) {
    const s = (t - 0.5) / 0.15
    return 0.3 - s * 0.03
  }
  if (t < 0.85) {
    const s = (t - 0.65) / 0.2
    const threadR = Math.sin(s * Math.PI * 6) * 0.02
    return 0.27 + threadR
  }
  const s = (t - 0.85) / 0.15
  return 0.27 * (1 - s * 0.5)
}

function getBulbY(t: number): number {
  return 1.0 - t * 2.2
}

function tilt(x: number, y: number): [number, number] {
  const c = Math.cos(TILT)
  const s = Math.sin(TILT)
  return [x * c - y * s, x * s + y * c]
}

export function generateBulb(): { positions: Float32Array; normals: Float32Array } {
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const normals = new Float32Array(PARTICLE_COUNT * 3)
  let idx = 0

  const glassCount = Math.floor(PARTICLE_COUNT * 0.5)
  const capCount = Math.floor(PARTICLE_COUNT * 0.18)
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

    const [tx, ty] = tilt(x, y)
    const [tnx, tny] = tilt(nx, ny)

    positions[idx * 3] = tx + BULB_X
    positions[idx * 3 + 1] = ty
    positions[idx * 3 + 2] = z
    normals[idx * 3] = tnx
    normals[idx * 3 + 1] = tny
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
    const [tx, ty] = tilt(x, y)
    const [tnx, tny] = tilt(Math.cos(angle), 0)

    positions[idx * 3] = tx + BULB_X
    positions[idx * 3 + 1] = ty
    positions[idx * 3 + 2] = z
    normals[idx * 3] = tnx
    normals[idx * 3 + 1] = tny
    normals[idx * 3 + 2] = Math.sin(angle)
    idx++
  }

  const perArch = Math.floor(filamentCount / 2)
  for (let i = 0; i < filamentCount; i++) {
    const arch = i < perArch ? -1 : 1
    const j = i % perArch
    const u = perArch > 1 ? j / (perArch - 1) : 0

    const x = arch * 0.055 + (u - 0.5) * 0.16
    const y = -0.05 + Math.sin(u * Math.PI) * 0.45
    const z = (Math.random() - 0.5) * 0.02

    const glow = 0.012
    const [tx, ty] = tilt(x + (Math.random() - 0.5) * glow, y + (Math.random() - 0.5) * glow)
    const [tnx, tny] = tilt(0, 1)

    positions[idx * 3] = tx + BULB_X
    positions[idx * 3 + 1] = ty
    positions[idx * 3 + 2] = z
    normals[idx * 3] = tnx
    normals[idx * 3 + 1] = tny
    normals[idx * 3 + 2] = 0
    idx++
  }

  for (let i = 0; i < contactCount; i++) {
    const angle = Math.random() * Math.PI * 2

    const r = 0.14 + Math.random() * 0.08
    const y = -1.08 - Math.random() * 0.1

    const x = Math.cos(angle) * r
    const z = Math.sin(angle) * r
    const [tx, ty] = tilt(x, y)
    const [tnx, tny] = tilt(Math.cos(angle), -0.5)

    positions[idx * 3] = tx + BULB_X
    positions[idx * 3 + 1] = ty
    positions[idx * 3 + 2] = z
    normals[idx * 3] = tnx
    normals[idx * 3 + 1] = tny
    normals[idx * 3 + 2] = Math.sin(angle)
    idx++
  }

  return { positions, normals }
}
