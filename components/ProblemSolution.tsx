const ProblemSolution = () => {
  const problems = [
    "Pasas horas en tareas repetitivas que podrían automatizarse.",
    "Pierdes clientes potenciales porque no puedes responder consultas 24/7.",
    "Te cuesta escalar tus operaciones sin contratar más personal.",
    "Estás perdiendo ventaja frente a competidores que ya usan IA.",
  ];

  const solutions = [
    "Agentes de IA a medida que atienden consultas al instante.",
    "Automatización de procesos que ahorra más de 20 horas por semana.",
    "Integración perfecta con tus herramientas y sistemas actuales.",
    "Retorno de inversión comprobado en los primeros 30 días.",
  ];

  const RedXIcon = () => (
    <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  );

  const GreenCheckIcon = () => (
    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
  );

  return (
    <section className="bg-gray-100 text-gray-800 py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Problem Column */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6">¿Sigues gestionando todo de forma manual?</h2>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-start">
                  <RedXIcon />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Column */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">Creamos soluciones de IA que realmente funcionan</h2>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start">
                  <GreenCheckIcon />
                  <span>{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
