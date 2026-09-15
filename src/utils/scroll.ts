export type ScrollSection = {
  index: number
  progressStart: number
  progressEnd: number
  label: string
}

export const SECTIONS: ScrollSection[] = [
  { index: 0, progressStart: 0.0, progressEnd: 0.99, label: 'Hero' },
  { index: 1, progressStart: 1.0, progressEnd: 1.99, label: 'Problemas' },
  { index: 2, progressStart: 2.0, progressEnd: 2.99, label: 'Servicios' },
  { index: 3, progressStart: 3.0, progressEnd: 3.99, label: 'Testimonios' },
  { index: 4, progressStart: 4.0, progressEnd: 4.0, label: 'CTA' },
]

export function getActiveSection(progress: number): number {
  for (let i = SECTIONS.length - 1; i >= 0; i--) {
    if (progress >= SECTIONS[i].progressStart) return i
  }
  return 0
}

export function getSectionFraction(progress: number): number {
  const section = getActiveSection(progress)
  const s = SECTIONS[section]
  if (section === SECTIONS.length - 1) return 1
  const range = s.progressEnd - s.progressStart
  if (range === 0) return 1
  return Math.min(1, (progress - s.progressStart) / range)
}
