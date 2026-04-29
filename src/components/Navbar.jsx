import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const links = ['Home', 'About', 'Skills', 'Projects', 'Certificates', 'Resume', 'Contact'];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-4 md:top-6 inset-x-0 w-full z-50 pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex justify-between items-start">
        {/* LOGO ISLAND */}
        <div
          className={`pointer-events-auto flex items-center justify-center h-12 md:h-14 px-5 md:px-6 rounded-full bg-[#fffaf2]/90 backdrop-blur-md border border-[#dfcfbd]/80 transition-all duration-300 ${
            scrolled ? 'shadow-[0_8px_24px_rgba(117,77,53,0.12)]' : 'shadow-none'
          }`}
        >
          <span
            className="text-lg md:text-xl font-bold text-[#c96f3a] cursor-pointer tracking-tight"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            onClick={() => scrollTo('home')}
          >
            Vasanth<span className="text-[#2c2118]"> C</span>
          </span>
        </div>

        {/* DESKTOP LINKS ISLAND */}
        <div
          className={`hidden md:flex pointer-events-auto items-center h-14 px-2 rounded-full bg-[#fffaf2]/90 backdrop-blur-md border border-[#dfcfbd]/80 transition-all duration-300 ${
            scrolled ? 'shadow-[0_8px_24px_rgba(117,77,53,0.12)]' : 'shadow-none'
          }`}
        >
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li
                key={l}
                className="relative"
                onMouseEnter={() => setHoveredLink(l)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {hoveredLink === l && (
                  <motion.div
                    layoutId="nav-hover-pill-split"
                    className="absolute inset-0 bg-[#f2dfcf] rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <button
                  onClick={() => scrollTo(l)}
                  className={`relative z-10 px-5 py-2 text-sm font-semibold transition-colors duration-200 ${
                    hoveredLink === l ? 'text-[#a7542a]' : 'text-[#6d5a4c]'
                  }`}
                >
                  {l}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* MOBILE TOGGLE ISLAND */}
        <div
          className={`md:hidden pointer-events-auto flex items-center h-12 px-2 rounded-full bg-[#fffaf2]/90 backdrop-blur-md border border-[#dfcfbd]/80 transition-all duration-300 ${
            scrolled ? 'shadow-[0_8px_24px_rgba(117,77,53,0.12)]' : 'shadow-none'
          }`}
        >
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full text-[#a7542a] hover:bg-[#f2dfcf] transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <motion.div animate={{ rotate: open ? 90 : 0 }}>
              {open ? <FaTimes size={16} /> : <FaBars size={16} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU (Drop down from toggle) */}
      <AnimatePresence>
        {open && (
          <div className="md:hidden pointer-events-auto absolute top-full right-4 mt-3 w-[220px] origin-top-right">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-[#fffaf2]/95 backdrop-blur-xl border border-[#dfcfbd]/80 rounded-[28px] p-3 shadow-[0_24px_60px_rgba(117,77,53,0.2)] flex flex-col gap-1"
            >
              {links.map((l) => (
                <button
                  key={l}
                  onClick={() => scrollTo(l)}
                  className="w-full text-left px-5 py-3 rounded-2xl text-[#6d5a4c] text-sm font-semibold hover:bg-[#f2dfcf] hover:text-[#c96f3a] active:scale-[0.98] transition-all"
                >
                  {l}
                </button>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
