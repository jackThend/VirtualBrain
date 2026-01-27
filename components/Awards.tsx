import Image from 'next/image';

const Awards = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Reconocimiento y Premios</h2>
        <div className="flex justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-8 max-w-3xl">
            <div className="md:w-1/3">
              <Image
                src="/sello-finalista.png"
                alt="Sello Finalista Premio Prostruct"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>
            <div className="md:w-2/3 md:text-left">
              <h3 className="text-2xl font-bold text-blue-600 mb-3">Finalistas en Premios de la Industria Tecnológica Chilena</h3>
              <p className="text-gray-700">
                Nuestro proyecto de investigación y desarrollo, **Prostruct**, fue reconocido como finalista por su innovación y aporte a la industria, destacando nuestro compromiso con la tecnología de vanguardia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
