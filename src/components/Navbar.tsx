import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />
        <div className="hidden md:flex gap-8 text-xl text-gray-800 font-semibold items-center">
          <Link to="/" className="hover:text-red-500 transition">
            Home
          </Link>
          <Link to="/allmeal" className="hover:text-red-500 transition">
            All meal
          </Link>
          <Link to="/favourite" className="hover:text-red-500 transition">
            Favourite
          </Link>
          <Link to="/ingredients" className="hover:text-red-500 transition">
            Ingredients
          </Link>
          <Link to="/random" className="hover:bg-red-700 text-white p-2 text-sm transition bg-red-600 border rounded-full">
            Surprise Me
          </Link>
        </div>
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 text-lg font-semibold text-gray-700 px-4 pb-4">
          <Link
            to="/"
            onClick={toggleMenu}
            className="block hover:text-red-500 transition"
          >
            Home
          </Link>
          <Link
            to="/allmeal"
            onClick={toggleMenu}
            className="block hover:text-red-500 transition"
          >
            All meal
          </Link>
          <Link
            to="/favourite"
            onClick={toggleMenu}
            className="block hover:text-red-500 transition"
          >
            Favourite
          </Link>
          <Link
            to="/ingredients"
            onClick={toggleMenu}
            className="block hover:text-red-500 transition"
          >
            Ingredients
          </Link>
        </div>
      )}
    </nav>
  );
}
