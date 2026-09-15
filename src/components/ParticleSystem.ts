import * as THREE from 'three'
import { PARTICLE_COUNT } from '../types'
import { generateBrain } from '../geometry/brain'
import { generateChaos } from '../geometry/chaos'
import { generateBulb } from '../geometry/bulb'
import { generateGlobe } from '../geometry/globe'
import { hexToRgb, type Theme, themes } from '../utils/colors'
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'

export class ParticleSystem {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private material!: THREE.ShaderMaterial
  private points!: THREE.Points
  private clock: number
  private mouseX: number
  private mouseY: number
  private hoverIntensity: number
  private currentTheme: Theme
  private animationId: number | null
  private onResizeBound: () => void

  constructor(canvas: HTMLCanvasElement) {
    
    this.clock = 0
    this.mouseX = 0
    this.mouseY = 0
    this.hoverIntensity = 0
    this.currentTheme = 'espresso'
    this.animationId = null

    this.scene = new THREE.Scene()
    

    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
    this.camera.position.z = 4.5
    

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    console.log('[VB] WebGL context:', gl ? 'OK' : 'FAILED')

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setClearColor(0x000000, 0)
    console.log('[VB] Renderer created, pixel ratio:', Math.min(window.devicePixelRatio, 2))

    this.onResizeBound = this.onResize.bind(this)
    window.addEventListener('resize', this.onResizeBound)

    try {
      this.initParticles()
      
    } catch (err) {
      console.error('[VB] Error initializing particles:', err)
      throw err
    }

    this.applyTheme(this.currentTheme)
    
  }

  private initParticles() {
    
    const brain = generateBrain()
    console.log('[VB] Brain done, positions:', brain.positions.length)

    
    const chaos = generateChaos()
    console.log('[VB] Chaos done, positions:', chaos.length)

    
    const bulb = generateBulb()
    console.log('[VB] Bulb done, positions:', bulb.positions.length)

    
    const globe = generateGlobe()
    console.log('[VB] Globe done, positions:', globe.positions.length)

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(brain.positions, 3))
    geometry.setAttribute('aPosChaos', new THREE.BufferAttribute(chaos, 3))
    geometry.setAttribute('aPosBulb', new THREE.BufferAttribute(bulb.positions, 3))
    geometry.setAttribute('aPosGlobe', new THREE.BufferAttribute(globe.positions, 3))
    geometry.setAttribute('aNormBrain', new THREE.BufferAttribute(brain.normals, 3))
    geometry.setAttribute('aNormBulb', new THREE.BufferAttribute(bulb.normals, 3))
    geometry.setAttribute('aNormGlobe', new THREE.BufferAttribute(globe.normals, 3))

    const seeds = new Float32Array(PARTICLE_COUNT)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      seeds[i] = Math.random()
    }
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uProgress: { value: 0.0 },
        uTime: { value: 0.0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uHoverIntensity: { value: 0.0 },
        uRepelStrength: { value: 1.0 },
        uColor1: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
        uColor2: { value: new THREE.Vector3(0.8, 0.8, 0.8) },
        uColor3: { value: new THREE.Vector3(0.53, 0.53, 0.53) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    })
    

    this.points = new THREE.Points(geometry, this.material)
    this.scene.add(this.points)
    console.log('[VB] Points added to scene, particle count:', PARTICLE_COUNT)
  }

  applyTheme(theme: Theme) {
    this.currentTheme = theme
    const colors = themes[theme]
    const c1 = hexToRgb(colors.particle1)
    const c2 = hexToRgb(colors.particle2)
    const c3 = hexToRgb(colors.particle3)

    this.material.uniforms.uColor1.value.set(c1[0], c1[1], c1[2])
    this.material.uniforms.uColor2.value.set(c2[0], c2[1], c2[2])
    this.material.uniforms.uColor3.value.set(c3[0], c3[1], c3[2])

    if (theme === 'monochrome') {
      this.material.blending = THREE.NormalBlending
    } else {
      this.material.blending = THREE.NormalBlending
    }
    console.log('[VB] Theme applied:', theme)
  }

  setProgress(progress: number) {
    this.material.uniforms.uProgress.value = progress
  }

  setMouse(x: number, y: number) {
    this.mouseX = (x / window.innerWidth) * 2 - 1
    this.mouseY = -(y / window.innerHeight) * 2 + 1
    this.material.uniforms.uMouse.value.set(this.mouseX * 3, this.mouseY * 2)
    this.hoverIntensity = THREE.MathUtils.lerp(this.hoverIntensity, 1.0, 0.1)
    this.material.uniforms.uHoverIntensity.value = this.hoverIntensity
  }

  resetHover() {
    this.hoverIntensity = THREE.MathUtils.lerp(this.hoverIntensity, 0.0, 0.05)
    this.material.uniforms.uHoverIntensity.value = this.hoverIntensity
  }

  start() {
    
    let frameCount = 0
    const animate = () => {
      this.clock += 0.016
      this.material.uniforms.uTime.value = this.clock
      this.resetHover()
      this.renderer.render(this.scene, this.camera)
      frameCount++
      if (frameCount <= 3) {
        console.log('[VB] Frame', frameCount, 'rendered')
      }
      this.animationId = requestAnimationFrame(animate)
    }
    animate()
  }

  stop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }

  private onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  dispose() {
    this.stop()
    window.removeEventListener('resize', this.onResizeBound)
    this.points.geometry.dispose()
    this.material.dispose()
    this.renderer.dispose()
  }
}
