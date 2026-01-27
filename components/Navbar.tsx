import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          <Image src="/favicon.ico" alt="VirtualBrain Logo" width={32} height={32} />
          VirtualBrain
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="#services" className="hover:text-blue-400">
            Servicios
          </Link>
          <Link href="#testimonials" className="hover:text-blue-400">
            Casos de éxito
          </Link>
          <Link href="#contact" className="hover:text-blue-400">
            Llámanos
          </Link>
          <Link href="/cotizacion" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Solicita una cotización
          </Link>
        </div>

        {/* No Language Selector as i18n is disabled */}

        {/* Mobile Menu Button (for later) */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
