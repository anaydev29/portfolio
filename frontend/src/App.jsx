import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import MeshBackground from './components/MeshBackground';

// Lazy load heavy pages (Three.js components inside Home, About)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Animated Mesh Gradient Background */}
      <MeshBackground />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 w-full overflow-hidden">
        <Suspense fallback={null}>
          <section id="home">
            <Home />
          </section>

          <section id="about" className="container mx-auto px-6 py-16">
            <About />
          </section>

          <section id="projects" className="container mx-auto px-6 py-16">
            <Projects />
          </section>

          <section id="contact" className="container mx-auto px-6 py-16">
            <Contact />
          </section>
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200/60 py-8 mt-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm">
            © 2026 Anay Shivhare. Built with React, Three.js & ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
