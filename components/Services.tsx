const servicesData = [
  {
    title: "Automatización de procesos",
    description: "Optimiza procesos repetitivos y elimina tareas manuales con sistemas de automatización inteligente que ahorran más de 20 horas a la semana.",
  },
  {
    title: "Analítica inteligente e insights",
    description: "Analítica impulsada por IA que ofrece insights accionables e inteligencia predictiva para tomar mejores decisiones.",
  },
  {
    title: "Servicios de integración de IA",
    description: "Integramos capacidades de IA en tus sistemas de e-commerce y empresariales mediante APIs personalizadas.",
  },
  {
    title: "Chatbots y asistentes virtuales con IA",
    description: "Agentes conversacionales inteligentes que gestionan soporte, calificación de leads y consultas de ventas 24/7 con procesamiento de lenguaje natural.",
  },
  {
    title: "Desarrollo de IA a medida",
    description: "Soluciones de IA personalizadas para las necesidades específicas de tu negocio, desde modelos de machine learning hasta sistemas de automatización inteligente.",
  },
];

const Services = () => {
  return (
    <section id="services" className="bg-black text-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Nuestras soluciones de IA</h2>
          <p className="text-xl">
            Servicios integrales de IA diseñados para transformar las operaciones de tu negocio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div key={index} className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
              {/* Placeholder for Icon - will replace with actual SVG icons later */}
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
