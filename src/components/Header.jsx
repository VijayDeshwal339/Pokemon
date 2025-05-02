import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaHeart, FaBalanceScale, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const linkClasses = (path) =>
    `flex items-center gap-2 px-3 py-2 text-white rounded-md hover:text-yellow-200 transition ${
      location.pathname === path ? "bg-pink-600 bg-opacity-30" : ""
    }`;

  return (
    <header className="bg-gradient-to-r from-red-500 to-pink-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <FaSearch size={28} className="text-white" />
          <Link to="/" className="text-white text-2xl font-bold hover:underline">
            Pokémon Search
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/favorites" className={linkClasses("/favorites")}>
            <FaHeart size={18} />
            <span>Favorites</span>
          </Link>
          <Link to="/compare" className={linkClasses("/compare")}>
            <FaBalanceScale size={18} />
            <span>Comparison</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4">
          <Link to="/favorites" className={linkClasses("/favorites")} onClick={toggleMenu}>
            <FaHeart />
            <span>Favorites</span>
          </Link>
          <Link to="/compare" className={linkClasses("/compare")} onClick={toggleMenu}>
            <FaBalanceScale />
            <span>Comparison</span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

