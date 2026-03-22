import { Home, User, Briefcase, Mail, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { to: '#home', label: 'Home' },
  { to: '#about', label: 'About' },
  { to: '#projects', label: 'Projects' },
  { to: '#contact', label: 'Contact' },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('#home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxVisibleRatio = 0;
        let mostVisibleSection = '';
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxVisibleRatio) {
            maxVisibleRatio = entry.intersectionRatio;
            mostVisibleSection = `#${entry.target.id}`;
          }
        });
        if (mostVisibleSection) setActiveSection(mostVisibleSection);
      },
      { root: null, rootMargin: '-20% 0px -40% 0px', threshold: [0.1, 0.3, 0.5, 0.7, 0.9] }
    );
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const handleNavClick = (e, to) => {
    e.preventDefault();
    setMobileOpen(false);
    const element = document.querySelector(to);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-500 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-xl shadow-lg shadow-slate-200/60 border-slate-200'
            : 'bg-white/60 backdrop-blur-md border-slate-100'
        } border rounded-2xl px-6 py-3`}
      >
        <div className="flex items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-lg font-black tracking-tight text-slate-800 hover:opacity-75 transition-opacity"
          >
            Anay<span className="text-indigo-600">.</span>
          </a>

          {/* Desktop Nav — right side */}
          <div className="hidden sm:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                {...item}
                isActive={activeSection === item.to}
                onClick={(e) => handleNavClick(e, item.to)}
              />
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden p-2 text-slate-500 hover:text-slate-800 transition-colors rounded-xl"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-50 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-4 shadow-xl"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.to}
                  href={item.to}
                  onClick={(e) => handleNavClick(e, item.to)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeSection === item.to
                      ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const NavLink = ({ to, label, isActive, onClick }) => (
  <a
    href={to}
    onClick={onClick}
    className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
      isActive
        ? 'text-indigo-600'
        : 'text-slate-500 hover:text-slate-800'
    }`}
  >
    {label}
    {isActive && (
      <motion.div
        layoutId="active-indicator"
        className="absolute inset-0 rounded-xl bg-indigo-50 border border-indigo-100"
        style={{ zIndex: -1 }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
      />
    )}
  </a>
);

export default Navbar;
