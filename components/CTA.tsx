import Link from 'next/link';

const CTA = () => {
  return (
    <section id="contact" className="bg-black text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8">¿Listo para reducir costos con IA?</h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link href="/consulta" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
            Agenda una consulta gratuita
          </Link>
          <a href="tel:+15551234567" className="text-xl font-semibold hover:text-blue-400 transition duration-300">
            Llama al (555) 123-4567
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
