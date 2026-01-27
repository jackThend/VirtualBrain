const metricsData = [
  {
    value: "80%",
    description: "Tiempo ahorrado en tareas manuales",
  },
  {
    value: "300%",
    description: "ROI promedio en menos de 6 meses",
  },
  {
    value: "150%",
    description: "Aumento en la conversión de leads",
  },
  {
    value: "24/7",
    description: "Soporte al cliente automatizado",
  },
];

const Metrics = () => {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Resultados medibles que realmente importan</h2>
          <p className="text-xl">
            Nuestros clientes ven un impacto inmediato en sus resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {metricsData.map((metric, index) => (
            <div key={index} className="p-6 rounded-lg bg-gray-800 shadow-lg">
              <p className="text-5xl font-bold text-blue-500 mb-2">{metric.value}</p>
              <p className="text-lg">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
