import { themes, type Theme } from '../utils/colors'

interface SectionContentProps {
  progress: number
  theme: Theme
}

function GlassCard({
  children,
  theme,
  className = '',
}: {
  children: React.ReactNode
  theme: Theme
  className?: string
}) {
  const colors = themes[theme]
  return (
    <div
      className={`rounded-2xl backdrop-blur-xl border ${className}`}
      style={{
        background: colors.cardBg,
        borderColor: colors.cardBorder,
      }}
    >
      {children}
    </div>
  )
}

function getSectionOpacity(sectionIndex: number, progress: number): number {
  const p = progress - sectionIndex
  if (p < -0.01) return 0
  if (p > 1.01) return 0

  const fadeInEnd = 0.18
  const fadeOutStart = 0.82

  if (p < 0) return 0
  if (p < fadeInEnd) return p / fadeInEnd
  if (p > fadeOutStart) return (1 - p) / (1 - fadeOutStart)
  return 1
}

function isSectionActive(sectionIndex: number, progress: number): boolean {
  return getSectionOpacity(sectionIndex, progress) > 0.01
}

export default function SectionContent({ progress, theme }: SectionContentProps) {
  const colors = themes[theme]

  return (
    <div className="relative z-10 pointer-events-none w-full h-full">

      {/* Section 0: Hero — Cerebro formándose, texto izquierda */}
      <section
        className="absolute inset-0 flex items-center"
        style={{
          opacity: getSectionOpacity(0, progress),
          pointerEvents: isSectionActive(0, progress) ? 'auto' : 'none',
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-8 md:px-16">
          <div className="max-w-xl">
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: colors.particle3 }}>
              Inteligencia Artificial
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: colors.text }}>
              Desbloquea la sabiduría colectiva
            </h1>
            <p className="text-lg md:text-xl mb-10 leading-relaxed" style={{ color: colors.textMuted }}>
              Automatizamos flujos de trabajo, creamos chatbots inteligentes e integramos agentes de IA que trabajan 24/7 para aumentar la productividad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/consulta"
                className="font-bold py-3 px-8 rounded-full text-base transition-all duration-300 text-center pointer-events-auto hover:scale-105"
                style={{ background: colors.ctaBg, color: colors.ctaText }}
              >
                Agenda una consulta gratuita
              </a>
              <a
                href="/casos-de-exito"
                className="font-bold py-3 px-8 rounded-full text-base transition-all duration-300 text-center pointer-events-auto border hover:scale-105"
                style={{ borderColor: colors.cardBorder, color: colors.text }}
              >
                Ver casos de éxito
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Caos — Partículas dispersándose, texto centrado */}
      <section
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: getSectionOpacity(1, progress),
          pointerEvents: isSectionActive(1, progress) ? 'auto' : 'none',
        }}
      >
        <div className="w-full max-w-4xl mx-auto px-8 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: colors.particle3 }}>
            El Problema
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: colors.text }}>
            La batalla imposible de darle sentido a este caos
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: colors.textMuted }}>
            Tus equipos pierden horas en tareas repetitivas, pierden clientes por no responder a tiempo y no pueden escalar sin contratar más personal.
          </p>
        </div>
      </section>

      {/* Section 2: Bombilla — Formándose, servicios derecha */}
      <section
        className="absolute inset-0 flex items-center"
        style={{
          opacity: getSectionOpacity(2, progress),
          pointerEvents: isSectionActive(2, progress) ? 'auto' : 'none',
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-8 md:px-16">
          <div className="max-w-xl ml-auto">
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: colors.particle3 }}>
              La Solución
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-8" style={{ color: colors.text }}>
              Genera momentos de inspiración
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Automatización de procesos', desc: 'Ahorra más de 20 horas semanales eliminando tareas manuales.' },
                { title: 'Chatbots inteligentes', desc: 'Agentes conversacionales que atienden consultas 24/7.' },
                { title: 'Analítica predictiva', desc: 'Insights accionables e inteligencia predictiva.' },
                { title: 'Integración de IA', desc: 'Capacidades de IA integradas en tus sistemas.' },
              ].map((service, i) => (
                <GlassCard key={i} theme={theme} className="p-4">
                  <h3 className="text-base font-bold mb-1" style={{ color: colors.text }}>{service.title}</h3>
                  <p className="text-sm" style={{ color: colors.textMuted }}>{service.desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: CTA — Globo formándose, CTA centrado */}
      <section
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: getSectionOpacity(3, progress),
          pointerEvents: isSectionActive(3, progress) ? 'auto' : 'none',
        }}
      >
        <div className="w-full max-w-3xl mx-auto px-8 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: colors.particle3 }}>
            Alcance Global
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: colors.text }}>
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto" style={{ color: colors.textMuted }}>
            Agenda una consulta gratuita y descubre cómo la IA puede reducir costos y acelerar tu crecimiento.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/consulta"
              className="font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 pointer-events-auto hover:scale-105"
              style={{ background: colors.ctaBg, color: colors.ctaText }}
            >
              Comenzar ahora
            </a>
            <a
              href="tel:+5551234567"
              className="font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 pointer-events-auto border hover:scale-105"
              style={{ borderColor: colors.cardBorder, color: colors.text }}
            >
              Llámanos
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
