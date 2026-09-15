import { themes, type Theme } from '../utils/colors'

interface ScrollTrackerProps {
  progress: number
  theme: Theme
}

const SECTIONS = ['Hero', 'Problema', 'Solución', 'CTA']

export default function ScrollTracker({ progress, theme }: ScrollTrackerProps) {
  const active = Math.min(Math.floor(progress), SECTIONS.length - 1)
  const colors = themes[theme]

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3">
      {SECTIONS.map((label, i) => {
        const isActive = i === active
        return (
          <div key={i} className="flex items-center gap-3">
            <span
              className="text-xs font-medium transition-all duration-300 whitespace-nowrap"
              style={{
                color: isActive ? colors.text : colors.textMuted,
                opacity: isActive ? 1 : 0.3,
              }}
            >
              {label}
            </span>
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: isActive ? 10 : 5,
                height: isActive ? 10 : 5,
                background: isActive ? colors.particle3 : colors.textMuted,
                opacity: isActive ? 1 : 0.25,
                boxShadow: isActive ? `0 0 10px ${colors.particle3}` : 'none',
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
