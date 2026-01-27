const processSteps = [
  {
    step: 1,
    title: "Agenda una llamada",
    description: "Programa una consulta gratuita para hablar de las necesidades de tu negocio e identificar oportunidades de automatización.",
  },
  {
    step: 2,
    title: "Estrategia de IA",
    description: "Analizamos tus flujos de trabajo y creamos una estrategia de IA adaptada a tus objetivos.",
  },
  {
    step: 3,
    title: "Implementación",
    description: "Nuestro equipo construye, prueba y despliega tus soluciones de IA con soporte y optimización continua.",
  },
];

const Process = () => {
  return (
    <section className="bg-gray-100 text-gray-800 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Un proceso simple de 3 pasos</h2>
          <p className="text-xl">
            Desde la consulta hasta la implementación, hacemos que adoptar IA sea sencillo.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
          {processSteps.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg flex-1">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6">
                {item.step}
              </div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
