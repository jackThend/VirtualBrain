const testimonialsData = [
  {
    quote: "“El chatbot de IA aumentó nuestra conversión de leads en un 200% y gestiona automáticamente el 90% de las consultas de clientes. El retorno de inversión se vio desde el primer mes.”",
    author: "Sarah Johnson",
    title: "CEO, TechStart Solutions",
  },
  {
    quote: "“La automatización de procesos nos ahorra 25 horas por semana. Ahora nuestro equipo puede enfocarse en el crecimiento estratégico en vez de tareas repetitivas.”",
    author: "Michael Chen",
    title: "Director de Operaciones, GrowthCorp",
  },
  {
    quote: "“La integración de IA transformó nuestra plataforma de e-commerce. Las ventas aumentaron un 180% gracias a experiencias de cliente personalizadas.”",
    author: "Emily Rodriguez",
    title: "Fundadora, RetailMax",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-gray-100 text-gray-800 py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Empresas en crecimiento confían en nosotros</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between">
              <p className="text-lg italic mb-6">
                {testimonial.quote}
              </p>
              <div>
                <p className="font-bold text-blue-600">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
