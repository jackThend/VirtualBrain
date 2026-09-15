import { themes, type Theme } from '../utils/colors'

interface FooterProps {
  theme: Theme
}

export default function Footer({ theme }: FooterProps) {
  const colors = themes[theme]

  return (
    <footer
      className="relative z-10 border-t py-12"
      style={{
        background: colors.bg,
        borderColor: colors.cardBorder,
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: colors.text }}>VirtualBrain</h3>
            <p className="text-sm leading-relaxed" style={{ color: colors.textMuted }}>
              Transformamos negocios mediante automatización inteligente y soluciones avanzadas de integración de IA.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: colors.text }}>Servicios</h4>
            <ul className="space-y-2 text-sm" style={{ color: colors.textMuted }}>
              <li><a href="/servicios/chatbots" className="hover:opacity-80 transition-opacity">Chatbots y asistentes virtuales con IA</a></li>
              <li><a href="/servicios/automatizacion" className="hover:opacity-80 transition-opacity">Automatización de procesos</a></li>
              <li><a href="/servicios/integracion" className="hover:opacity-80 transition-opacity">Integración de IA</a></li>
              <li><a href="/servicios/analitica" className="hover:opacity-80 transition-opacity">Analítica e insights inteligentes</a></li>
              <li><a href="/servicios/desarrollo-medida" className="hover:opacity-80 transition-opacity">Desarrollo de IA a medida</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: colors.text }}>Empresa</h4>
            <ul className="space-y-2 text-sm" style={{ color: colors.textMuted }}>
              <li><a href="/sobre-nosotros" className="hover:opacity-80 transition-opacity">Sobre nosotros</a></li>
              <li><a href="/casos-de-exito" className="hover:opacity-80 transition-opacity">Casos de éxito</a></li>
              <li><a href="/blog" className="hover:opacity-80 transition-opacity">Blog</a></li>
              <li><a href="/empleos" className="hover:opacity-80 transition-opacity">Empleos</a></li>
              <li><a href="/contacto" className="hover:opacity-80 transition-opacity">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: colors.text }}>Contacto</h4>
            <ul className="space-y-2 text-sm" style={{ color: colors.textMuted }}>
              <li><a href="mailto:hello@virtualbrain.com" className="hover:opacity-80 transition-opacity">hello@virtualbrain.com</a></li>
              <li><a href="tel:+5551234567" className="hover:opacity-80 transition-opacity">(555) 123-4567</a></li>
              <li>123 AI Street, Tech City</li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 text-center text-sm" style={{ borderColor: colors.cardBorder, color: colors.textMuted }}>
          <p>© 2024 VirtualBrain. Todos los derechos reservados.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="/politica-privacidad" className="hover:opacity-80 transition-opacity">Política de privacidad</a>
            <a href="/terminos-servicio" className="hover:opacity-80 transition-opacity">Términos del servicio</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
