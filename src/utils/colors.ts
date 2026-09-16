export interface ThemeColors {
  bg: string
  particle1: string
  particle2: string
  particle3: string
  text: string
  textMuted: string
  cardBg: string
  cardBorder: string
  ctaBg: string
  ctaText: string
  navbarBg: string
}

export type Theme = 'espresso' | 'monochrome'

export const themes: Record<Theme, ThemeColors> = {
  espresso: {
    bg: '#131211',
    particle1: '#a88f6c',
    particle2: '#6b9666',
    particle3: '#db8f38',
    text: '#ede9e1',
    textMuted: '#b8ab93',
    cardBg: 'rgba(24, 22, 20, 0.55)',
    cardBorder: 'rgba(237, 233, 225, 0.14)',
    ctaBg: '#ede9e1',
    ctaText: '#131211',
    navbarBg: 'rgba(19, 18, 17, 0.8)',
  },
  monochrome: {
    bg: '#fafaf9',
    particle1: '#14161a',
    particle2: '#3a3d44',
    particle3: '#6b7280',
    text: '#14161a',
    textMuted: '#6b7280',
    cardBg: 'rgba(255, 255, 255, 0.32)',
    cardBorder: 'rgba(0, 0, 0, 0.08)',
    ctaBg: '#000000',
    ctaText: '#ffffff',
    navbarBg: 'rgba(250, 250, 249, 0.75)',
  },
}

export function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return [r, g, b]
}
