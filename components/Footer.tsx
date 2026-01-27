import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">VirtualBrain</h3>
            <p className="text-gray-400">
              Transformamos negocios mediante automatización inteligente y soluciones avanzadas de integración de IA.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Servicios</h4>
            <ul className="space-y-2">
              <li><Link href="/servicios/chatbots" className="hover:text-blue-400">Chatbots y asistentes virtuales con IA</Link></li>
              <li><Link href="/servicios/automatizacion" className="hover:text-blue-400">Automatización de procesos</Link></li>
              <li><Link href="/servicios/integracion" className="hover:text-blue-400">Integración de IA</Link></li>
              <li><Link href="/servicios/analitica" className="hover:text-blue-400">Analítica e insights inteligentes</Link></li>
              <li><Link href="/servicios/desarrollo-medida" className="hover:text-blue-400">Desarrollo de IA a medida</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li><Link href="/sobre-nosotros" className="hover:text-blue-400">Sobre nosotros</Link></li>
              <li><Link href="/casos-de-exito" className="hover:text-blue-400">Casos de éxito</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400">Blog</Link></li>
              <li><Link href="/empleos" className="hover:text-blue-400">Empleos</Link></li>
              <li><Link href="/contacto" className="hover:text-blue-400">Contacto</Link></li>
            </ul>
          </div>

          {/* Column 4: Get in Touch */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li><a href="mailto:hello@virtualbrain.com" className="hover:text-blue-400">hello@virtualbrain.com</a></li>
              <li><a href="tel:+15551234567" className="hover:text-blue-400">(555) 123-4567</a></li>
              <li>123 AI Street, Tech City</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Legal */}
        <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>© 2024 VirtualBrain. Todos los derechos reservados.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/politica-privacidad" className="hover:text-blue-400">Política de privacidad</Link>
            <Link href="/terminos-servicio" className="hover:text-blue-400">Términos del servicio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
