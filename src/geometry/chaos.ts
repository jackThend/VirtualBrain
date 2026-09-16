import { PARTICLE_COUNT } from '../types'
import { fbm } from '../utils/noise'

export function generateChaos(): Float32Array {
  const positions = new Float32Array(PARTICLE_COUNT * 3)

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const baseX = (Math.random() - 0.5) * 7
    const baseY = (Math.random() - 0.5) * 6
    const baseZ = (Math.random() - 0.5) * 7

    const turbX = fbm(baseX * 0.45, baseY * 0.45, baseZ * 0.45, 4) * 2.0
    const turbY = fbm(baseX * 0.45 + 100, baseY * 0.45, baseZ * 0.45, 4) * 2.0
    const turbZ = fbm(baseX * 0.45, baseY * 0.45 + 100, baseZ * 0.45, 4) * 2.0

    positions[i * 3] = baseX + turbX
    positions[i * 3 + 1] = baseY + turbY
    positions[i * 3 + 2] = baseZ + turbZ
  }

  return positions
}

export function generatePolyhedra(count: number): Float32Array {
  const verts: number[] = []

  for (let p = 0; p < count; p++) {
    const cx = (Math.random() - 0.5) * 5
    const cy = (Math.random() - 0.5) * 4
    const cz = (Math.random() - 0.5) * 5
    const scale = 0.2 + Math.random() * 0.4
    const isTetra = Math.random() > 0.5

    const tetraVerts = [
      [0, 1, 0], [-0.943, -0.333, 0], [0.471, -0.333, 0.816], [0.471, -0.333, -0.816],
    ]
    const octaVerts = [
      [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1],
    ]

    const baseVerts = isTetra ? tetraVerts : octaVerts
    const edges = isTetra
      ? [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]]
      : [[0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]]

    const rotY = Math.random() * Math.PI * 2
    const rotX = Math.random() * Math.PI * 2

    for (const [a, b] of edges) {
      const segments = 8
      for (let s = 0; s <= segments; s++) {
        const t = s / segments
        let vx = baseVerts[a][0] * (1 - t) + baseVerts[b][0] * t
        let vy = baseVerts[a][1] * (1 - t) + baseVerts[b][1] * t
        let vz = baseVerts[a][2] * (1 - t) + baseVerts[b][2] * t

        const cosY = Math.cos(rotY)
        const sinY = Math.sin(rotY)
        const x2 = vx * cosY - vz * sinY
        const z2 = vx * sinY + vz * cosY
        vx = x2
        vz = z2

        const cosX = Math.cos(rotX)
        const sinX = Math.sin(rotX)
        const y2 = vy * cosX - vz * sinX
        const z3 = vy * sinX + vz * cosX
        vy = y2
        vz = z3

        verts.push(cx + vx * scale, cy + vy * scale, cz + vz * scale)
      }
    }
  }

  const result = new Float32Array(verts)
  return result
}
