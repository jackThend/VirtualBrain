import { PARTICLE_COUNT } from '../types'

const BRAIN_X = 1.15

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function noise3D(x: number, y: number, z: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + z * 45.164) * 43758.5453
  return n - Math.floor(n)
}

function fbm(x: number, y: number, z: number): number {
  let val = 0
  let amp = 0.5
  let freq = 1
  for (let i = 0; i < 4; i++) {
    val += amp * (noise3D(x * freq, y * freq, z * freq) * 2 - 1)
    amp *= 0.5
    freq *= 2.1
  }
  return val
}

export function generateBrain(): { positions: Float32Array; normals: Float32Array } {
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const normals = new Float32Array(PARTICLE_COUNT * 3)
  let idx = 0

  const R = 1.0
  const hemisphereCount = Math.floor(PARTICLE_COUNT * 0.75)
  const cerebellumCount = Math.floor(PARTICLE_COUNT * 0.12)
  const brainstemCount = Math.floor(PARTICLE_COUNT * 0.08)
  const remaining = PARTICLE_COUNT - hemisphereCount - cerebellumCount - brainstemCount

  for (let i = 0; i < hemisphereCount; i++) {
    const side = i < hemisphereCount / 2 ? -1 : 1

    const u = Math.random()
    const v = Math.random()
    const phi = Math.acos(2 * v - 1)
    const theta = u * Math.PI * 2

    let x = R * Math.sin(phi) * Math.cos(theta)
    let y = R * Math.sin(phi) * Math.sin(theta)
    let z = R * Math.cos(phi)

    x = Math.abs(x) * side * 0.92
    y *= 0.72
    z *= 0.85

    const harmonic = Math.sin(x * 9 + z * 5) * Math.sin(y * 11 - z * 4) * 0.045
    const ridged = Math.pow(1 - Math.abs(fbm(x * 6, y * 6, z * 6)), 2) * 0.09
    const sulci = Math.pow(Math.abs(fbm(x * 8 + 40, y * 8, z * 8)), 2.5) * -0.12
    const disp = 1.0 + harmonic + ridged + sulci

    x *= disp
    y *= disp
    z *= disp

    const fissureGap = Math.exp(-Math.pow(x * 9, 2)) * 0.12
    x += side * fissureGap
    x -= side * Math.exp(-Math.pow(x * 15, 2)) * 0.04

    const frontalBulge = smoothstep(0.3, 0.8, -z) * 0.15
    z -= frontalBulge

    const occipitalTaper = smoothstep(0.3, 0.9, z) * 0.12
    x *= 1 - occipitalTaper * 0.18

    const len = Math.sqrt(x * x + y * y + z * z) || 1
    positions[idx * 3] = x + BRAIN_X
    positions[idx * 3 + 1] = y
    positions[idx * 3 + 2] = z
    normals[idx * 3] = x / len
    normals[idx * 3 + 1] = y / len
    normals[idx * 3 + 2] = z / len
    idx++
  }

  for (let i = 0; i < cerebellumCount; i++) {
    const u = Math.random()
    const v = Math.random()
    const phi = Math.acos(2 * v - 1)
    const theta = u * Math.PI * 2

    const cR = 0.38
    let x = cR * Math.sin(phi) * Math.cos(theta) * 0.85
    let y = cR * Math.sin(phi) * Math.sin(theta) * 0.6 - 0.68
    let z = cR * Math.cos(phi) * 0.7 - 0.38

    const folia = Math.sin(x * 20 + y * 16) * Math.cos(z * 18) * 0.025
    const folia2 = Math.sin(x * 24 - z * 14) * 0.02
    const disp = 1.0 + folia + folia2
    x *= disp
    y *= disp
    z *= disp

    const len = Math.sqrt(x * x + y * y + z * z) || 1
    positions[idx * 3] = x + BRAIN_X
    positions[idx * 3 + 1] = y
    positions[idx * 3 + 2] = z
    normals[idx * 3] = x / len
    normals[idx * 3 + 1] = y / len
    normals[idx * 3 + 2] = z / len
    idx++
  }

  for (let i = 0; i < brainstemCount; i++) {
    const t = Math.random()
    const angle = Math.random() * Math.PI * 2
    const taper = 1 - t * 0.5
    const r = 0.1 * taper

    const x = -0.02 - t * 0.18
    const y = -0.55 - t * 0.65 + Math.sin(angle) * r
    const z = -0.18 + Math.cos(angle) * r - t * 0.22

    const len = Math.sqrt(x * x + y * y + z * z) || 1
    positions[idx * 3] = x + BRAIN_X
    positions[idx * 3 + 1] = y
    positions[idx * 3 + 2] = z
    normals[idx * 3] = x / len
    normals[idx * 3 + 1] = y / len
    normals[idx * 3 + 2] = z / len
    idx++
  }

  for (let i = 0; i < remaining; i++) {
    const y = (Math.random() - 0.5) * 1.4
    const z = (Math.random() - 0.5) * 0.9
    const x = (Math.random() - 0.5) * 0.05

    const len = Math.sqrt(x * x + y * y + z * z) || 1
    positions[idx * 3] = x + BRAIN_X
    positions[idx * 3 + 1] = y
    positions[idx * 3 + 2] = z
    normals[idx * 3] = x / len
    normals[idx * 3 + 1] = y / len
    normals[idx * 3 + 2] = z / len
    idx++
  }

  return { positions, normals }
}
