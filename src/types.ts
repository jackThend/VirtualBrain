export const PARTICLE_COUNT = 36000

export interface ParticleGeometryData {
  position: Float32Array
  aPosChaos: Float32Array
  aPosBulb: Float32Array
  aPosGlobe: Float32Array
  aNormBrain: Float32Array
  aNormBulb: Float32Array
  aNormGlobe: Float32Array
  aSeed: Float32Array
}
