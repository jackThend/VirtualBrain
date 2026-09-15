import { PARTICLE_COUNT } from '../types'

const CONTINENTS = [
  {
    name: 'NorthAmerica',
    points: [
      [70, -100], [65, -140], [55, -165], [50, -125], [45, -90],
      [40, -75], [30, -80], [25, -100], [30, -115], [35, -120],
      [48, -125], [55, -130], [60, -145], [65, -168], [70, -155],
      [72, -125], [68, -110], [60, -95], [55, -80], [50, -65],
      [45, -65], [40, -70], [35, -85], [25, -80], [20, -90],
      [18, -100], [15, -88], [10, -84],
    ],
    density: 0.20,
  },
  {
    name: 'SouthAmerica',
    points: [
      [10, -75], [5, -77], [0, -80], [-5, -80], [-10, -77],
      [-15, -75], [-20, -63], [-25, -57], [-30, -55], [-35, -58],
      [-40, -68], [-45, -72], [-50, -73], [-55, -68],
      [-40, -62], [-35, -52], [-25, -48], [-20, -45], [-15, -50],
      [-10, -55], [-5, -60], [0, -65], [5, -70],
    ],
    density: 0.12,
  },
  {
    name: 'Europe',
    points: [
      [70, 30], [65, 15], [60, 10], [55, 5], [50, 0],
      [48, -5], [45, 0], [42, 3], [40, 0], [38, -5],
      [36, -8], [38, -10], [40, -8], [42, -5], [44, 0],
      [46, 5], [48, 8], [50, 12], [52, 15], [55, 20],
      [58, 25], [60, 30], [62, 25], [65, 25], [68, 28],
      [70, 25], [72, 30], [70, 40], [65, 40], [60, 40],
    ],
    density: 0.14,
  },
  {
    name: 'Africa',
    points: [
      [35, -5], [30, 0], [25, 5], [20, 10], [15, 15],
      [10, 15], [5, 10], [0, 15], [-5, 20], [-10, 25],
      [-15, 30], [-20, 35], [-25, 33], [-30, 28], [-35, 20],
      [-30, 18], [-25, 15], [-20, 12], [-15, 10], [-10, 8],
      [-5, 5], [0, 0], [5, -5], [10, -10], [15, -15],
      [20, -15], [25, -10], [30, -5], [32, 0], [35, 5],
      [37, 10], [35, 15], [33, 10], [30, 10],
    ],
    density: 0.14,
  },
  {
    name: 'Asia',
    points: [
      [70, 60], [65, 80], [60, 100], [55, 120], [50, 130],
      [45, 135], [40, 130], [35, 120], [30, 110], [25, 100],
      [20, 90], [15, 80], [10, 75], [5, 80], [0, 85],
      [-5, 95], [-8, 110], [-5, 120], [0, 130], [5, 135],
      [10, 140], [15, 138], [20, 135], [25, 125], [30, 120],
      [35, 105], [40, 90], [45, 80], [50, 70], [55, 60],
      [60, 50], [65, 55], [70, 50], [72, 70], [70, 90],
      [65, 110], [60, 130], [55, 140], [50, 145], [45, 150],
    ],
    density: 0.20,
  },
  {
    name: 'Australia',
    points: [
      [-15, 130], [-20, 135], [-25, 140], [-30, 145], [-35, 148],
      [-38, 145], [-35, 138], [-30, 132], [-25, 128], [-20, 125],
      [-15, 128], [-12, 132], [-18, 142], [-28, 152], [-32, 152],
      [-35, 150],
    ],
    density: 0.08,
  },
]

function latLonToVec3(lat: number, lon: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)
  return [x, y, z]
}

function lerpPoints(a: [number, number], b: [number, number], t: number): [number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
}

export function generateGlobe(): { positions: Float32Array; normals: Float32Array } {
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const normals = new Float32Array(PARTICLE_COUNT * 3)

  const R = 1.2
  let idx = 0

  let totalContinentParticles = 0
  for (const c of CONTINENTS) {
    totalContinentParticles += Math.floor(PARTICLE_COUNT * c.density)
  }
  const ringCount = Math.floor(PARTICLE_COUNT * 0.06)
  const oceanCount = PARTICLE_COUNT - totalContinentParticles - ringCount

  for (const continent of CONTINENTS) {
    const count = Math.floor(PARTICLE_COUNT * continent.density)
    const pts = continent.points

    for (let i = 0; i < count; i++) {
      const edgeIdx = Math.floor(Math.random() * pts.length)
      const nextIdx = (edgeIdx + 1) % pts.length
      const t = Math.random()
      const center = lerpPoints(pts[edgeIdx] as [number, number], pts[nextIdx] as [number, number], t)

      const jitterLat = center[0] + (Math.random() - 0.5) * 10
      const jitterLon = center[1] + (Math.random() - 0.5) * 10

      const [x, y, z] = latLonToVec3(jitterLat, jitterLon, R)
      const len = Math.sqrt(x * x + y * y + z * z) || 1
      positions[idx * 3] = x
      positions[idx * 3 + 1] = y
      positions[idx * 3 + 2] = z
      normals[idx * 3] = x / len
      normals[idx * 3 + 1] = y / len
      normals[idx * 3 + 2] = z / len
      idx++
    }
  }

  for (let i = 0; i < ringCount; i++) {
    const lat = (i / ringCount) * 140 - 70
    const lon = (Math.random() - 0.5) * 360
    const [x, y, z] = latLonToVec3(lat, lon, R + 0.015)
    const len = Math.sqrt(x * x + y * y + z * z) || 1
    positions[idx * 3] = x
    positions[idx * 3 + 1] = y
    positions[idx * 3 + 2] = z
    normals[idx * 3] = x / len
    normals[idx * 3 + 1] = y / len
    normals[idx * 3 + 2] = z / len
    idx++
  }

  const goldenRatio = (1 + Math.sqrt(5)) / 2
  for (let i = 0; i < oceanCount && idx < PARTICLE_COUNT; i++) {
    const theta = 2 * Math.PI * i / goldenRatio
    const phi = Math.acos(1 - 2 * (i + 0.5) / oceanCount)

    const x = R * Math.sin(phi) * Math.cos(theta)
    const y = R * Math.cos(phi)
    const z = R * Math.sin(phi) * Math.sin(theta)

    const len = Math.sqrt(x * x + y * y + z * z) || 1
    positions[idx * 3] = x
    positions[idx * 3 + 1] = y
    positions[idx * 3 + 2] = z
    normals[idx * 3] = x / len
    normals[idx * 3 + 1] = y / len
    normals[idx * 3 + 2] = z / len
    idx++
  }

  while (idx < PARTICLE_COUNT) {
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = Math.random() * Math.PI * 2
    const x = R * Math.sin(phi) * Math.cos(theta)
    const y = R * Math.cos(phi)
    const z = R * Math.sin(phi) * Math.sin(theta)
    const len = Math.sqrt(x * x + y * y + z * z) || 1
    positions[idx * 3] = x
    positions[idx * 3 + 1] = y
    positions[idx * 3 + 2] = z
    normals[idx * 3] = x / len
    normals[idx * 3 + 1] = y / len
    normals[idx * 3 + 2] = z / len
    idx++
  }

  return { positions, normals }
}
