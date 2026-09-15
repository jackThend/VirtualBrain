import { themes, type Theme } from '../utils/colors'

interface NavbarProps {
  theme: Theme
}

export default function Navbar({ theme }: NavbarProps) {
  const colors = themes[theme]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
      style={{
        background: colors.navbarBg,
        borderColor: colors.cardBorder,
      }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 pointer-events-auto">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{ background: colors.particle3, color: colors.ctaText }}
          >
            VB
          </div>
          <span className="text-xl font-bold" style={{ color: colors.text }}>
            VirtualBrain
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          <a href="#services" className="text-sm transition-colors hover:opacity-80 pointer-events-auto" style={{ color: colors.textMuted }}>
            Servicios
          </a>
          <a href="#testimonials" className="text-sm transition-colors hover:opacity-80 pointer-events-auto" style={{ color: colors.textMuted }}>
            Casos de éxito
          </a>
          <a href="#contact" className="text-sm transition-colors hover:opacity-80 pointer-events-auto" style={{ color: colors.textMuted }}>
            Llámanos
          </a>
          <a
            href="/cotizacion"
            className="font-bold py-2 px-5 rounded-full text-sm transition-all duration-300 pointer-events-auto hover:scale-105"
            style={{ background: colors.ctaBg, color: colors.ctaText }}
          >
            Solicita una cotización
          </a>
        </div>

        <button className="md:hidden pointer-events-auto" style={{ color: colors.text }}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
