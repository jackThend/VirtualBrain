import { PARTICLE_COUNT } from '../types'

function createGear(
  cx: number,
  cy: number,
  cz: number,
  radius: number,
  teeth: number,
  toothDepth: number,
  thickness: number,
  rotY: number,
  rotX: number,
): Float32Array {
  const verts: number[] = []
  const innerRadius = radius * 0.6
  const segments = 64

  const yTop = thickness / 2
  const yBottom = -thickness / 2

  for (let i = 0; i < segments; i++) {
    const angle1 = (i / segments) * Math.PI * 2
    const angle2 = ((i + 1) / segments) * Math.PI * 2

    const toothAngle1 = (i / segments) * teeth * Math.PI * 2
    const toothAngle2 = ((i + 1) / segments) * teeth * Math.PI * 2

    const isTooth1 = Math.abs(Math.sin(toothAngle1)) > 0.3
    const isTooth2 = Math.abs(Math.sin(toothAngle2)) > 0.3

    const r1 = isTooth1 ? radius + toothDepth : radius
    const r2 = isTooth2 ? radius + toothDepth : radius

    const x1 = Math.cos(angle1) * r1
    const z1 = Math.sin(angle1) * r1
    const x2 = Math.cos(angle2) * r2
    const z2 = Math.sin(angle2) * r2

    verts.push(x1, yTop, z1)
    verts.push(x2, yTop, z2)
    verts.push(cx, yTop, cz)

    verts.push(x1, yBottom, z1)
    verts.push(x2, yBottom, z2)
    verts.push(cx, yBottom, cz)

    verts.push(x1, yTop, z1)
    verts.push(x2, yTop, z2)
    verts.push(x1, yBottom, z1)

    verts.push(x2, yTop, z2)
    verts.push(x1, yBottom, z1)
    verts.push(x2, yBottom, z2)
  }

  const holeSegments = 24
  for (let i = 0; i < holeSegments; i++) {
    const angle1 = (i / holeSegments) * Math.PI * 2
    const angle2 = ((i + 1) / holeSegments) * Math.PI * 2

    const x1 = Math.cos(angle1) * innerRadius
    const z1 = Math.sin(angle1) * innerRadius
    const x2 = Math.cos(angle2) * innerRadius
    const z2 = Math.sin(angle2) * innerRadius

    verts.push(x1, yTop, z1)
    verts.push(x2, yTop, z2)
    verts.push(cx, yTop, cz)

    verts.push(x1, yBottom, z1)
    verts.push(x2, yBottom, z2)
    verts.push(cx, yBottom, cz)
  }

  const result = new Float32Array(verts)

  const cosY = Math.cos(rotY)
  const sinY = Math.sin(rotY)
  const cosX = Math.cos(rotX)
  const sinX = Math.sin(rotX)

  for (let i = 0; i < result.length; i += 3) {
    let vx = result[i]
    let vy = result[i + 1]
    let vz = result[i + 2]

    const x2 = vx * cosY - vz * sinY
    const z2 = vx * sinY + vz * cosY
    vx = x2
    vz = z2

    const y2 = vy * cosX - vz * sinX
    const z3 = vy * sinX + vz * cosX
    vy = y2
    vz = z3

    result[i] = vx + cx
    result[i + 1] = vy + cy
    result[i + 2] = vz + cz
  }

  return result
}

export function generateGears(): Float32Array {
  const positions = new Float32Array(PARTICLE_COUNT * 3)

  const gear1Verts = createGear(-0.5, 0, 0, 0.7, 12, 0.15, 0.3, 0, 0)
  const gear2Verts = createGear(0.5, 0, 0, 0.7, 12, 0.15, 0.3, Math.PI / 12, Math.PI / 6)

  const totalVerts = gear1Verts.length + gear2Verts.length
  const vertsPerParticle = Math.max(1, Math.floor(totalVerts / PARTICLE_COUNT))

  let idx = 0
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const srcIdx = (i * vertsPerParticle * 3) % totalVerts
    const gearIdx = srcIdx < gear1Verts.length ? srcIdx : srcIdx - gear1Verts.length
    const gear = srcIdx < gear1Verts.length ? gear1Verts : gear2Verts

    if (gearIdx + 2 < gear.length) {
      positions[idx * 3] = gear[gearIdx]
      positions[idx * 3 + 1] = gear[gearIdx + 1]
      positions[idx * 3 + 2] = gear[gearIdx + 2]
    } else {
      const angle = Math.random() * Math.PI * 2
      const r = 0.3 + Math.random() * 0.5
      positions[idx * 3] = Math.cos(angle) * r + (i < PARTICLE_COUNT / 2 ? -0.5 : 0.5)
      positions[idx * 3 + 1] = (Math.random() - 0.5) * 0.3
      positions[idx * 3 + 2] = Math.sin(angle) * r
    }
    idx++
  }

  return positions
}
