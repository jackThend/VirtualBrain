import Link from 'next/link';

const Hero = () => {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
              Resultados mejores y costos reducidos con IA
            </h1>
            <p className="text-lg lg:text-xl mb-8">
              Ayudamos a las empresas a automatizar sus flujos de trabajo, crear chatbots inteligentes e integrar agentes de IA que trabajan 24/7 para aumentar la productividad y acelerar el crecimiento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/consulta" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 text-center">
                Agenda una consulta gratuita
              </Link>
              <Link href="/casos-de-exito" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 text-center">
                Ver casos de éxito
              </Link>
            </div>
            <div className="flex gap-8 text-sm">
              <span>✓ Sin costos de instalación</span>
              <span>✓ Retorno de inversión garantizado en 30 días</span>
            </div>
          </div>

          {/* Right Side: Video */}
          <div className="w-full relative overflow-hidden rounded-lg shadow-2xl pb-[56.25%]">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="/virtualbrainlogoluz.mp4"
              loop
              muted
              autoPlay
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
