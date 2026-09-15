import { useEffect, useRef, useCallback } from 'react'
import { ParticleSystem } from './ParticleSystem'

interface WebGLCanvasProps {
  progress: number
  onSystemReady?: (system: ParticleSystem) => void
}

export default function WebGLCanvas({ progress, onSystemReady }: WebGLCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const systemRef = useRef<ParticleSystem | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    try {
      const system = new ParticleSystem(canvasRef.current)
      systemRef.current = system
      system.start()
      onSystemReady?.(system)
    } catch (err) {
      console.error('ParticleSystem error:', err)
    }

    return () => {
      systemRef.current?.dispose()
      systemRef.current = null
    }
  }, [])

  useEffect(() => {
    systemRef.current?.setProgress(progress)
  }, [progress])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    systemRef.current?.setMouse(e.clientX, e.clientY)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="webgl-canvas"
      onMouseMove={handleMouseMove}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}
