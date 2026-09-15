import { useState, useEffect, useRef, useCallback } from 'react'
import WebGLCanvas from './components/WebGLCanvas'
import SectionContent from './components/SectionContent'
import ScrollTracker from './components/ScrollTracker'
import ThemeToggle from './components/ThemeToggle'
import Navbar from './components/Navbar'
import { ParticleSystem } from './components/ParticleSystem'
import { themes, type Theme } from './utils/colors'

const TOTAL_SECTIONS = 4
const VH_PER_SECTION = 150

export default function App() {
  const [progress, setProgress] = useState(0)
  const [theme, setTheme] = useState<Theme>('espresso')
  const systemRef = useRef<ParticleSystem | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSystemReady = useCallback((system: ParticleSystem) => {
    systemRef.current = system
  }, [])

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'espresso' ? 'monochrome' : 'espresso'
      systemRef.current?.applyTheme(next)
      return next
    })
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const scrollable = containerRef.current.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      const scrolled = -rect.top
      const raw = Math.max(0, Math.min(scrolled / scrollable, 1))
      setProgress(raw * TOTAL_SECTIONS)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.background = themes[theme].bg
    document.documentElement.style.background = themes[theme].bg
  }, [theme])

  return (
    <div style={{ background: themes[theme].bg, minHeight: '100vh' }}>
      <WebGLCanvas progress={progress} onSystemReady={handleSystemReady} />
      <Navbar theme={theme} />
      <ThemeToggle theme={theme} onToggle={handleToggleTheme} />
      <ScrollTracker progress={progress} theme={theme} />

      <div ref={containerRef} style={{ height: `${TOTAL_SECTIONS * VH_PER_SECTION}vh`, position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          <SectionContent progress={progress} theme={theme} />
        </div>
      </div>
    </div>
  )
}
