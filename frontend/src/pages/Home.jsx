import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroCursorScene from '../components/HeroCursorScene';

const Home = () => {
  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
      {/* 3D Cursor-reactive scene on the right */}
      <HeroCursorScene />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 max-w-3xl"
        >
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-indigo-600 font-bold text-sm tracking-[0.2em] uppercase mb-6"
          >
            Welcome to my space
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.05]"
          >
            <span className="block text-slate-800">Hello, I'm</span>
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
              Anay Shivhare
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg sm:text-xl text-slate-600 mb-12 max-w-lg font-light leading-relaxed"
          >
            MERN Stack Developer &amp; B.Tech CSD Student. I turn ideas into full stack web apps and solve problems with DSA in Java.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <button
              onClick={() => scrollToSection('#projects')}
              className="group flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95"
            >
              View My Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="flex items-center gap-2 px-8 py-4 bg-white/80 hover:bg-white text-slate-700 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg border border-slate-200 hover:border-indigo-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              Contact Me
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
