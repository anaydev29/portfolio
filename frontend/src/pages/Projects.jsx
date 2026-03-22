import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'Absolute Cinema',
    subtitle: 'Movie Review System',
    category: 'Full Stack Web App',
    description: 'A full-fledged movie review application built with a responsive user interface allowing users to browse, search, and review their favorite films.',
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800',
    github: 'https://github.com/anaydev29/movie-review-system',
    live: 'https://absolute-cinema-production.up.railway.app/',
    accent: 'from-indigo-500 to-purple-500',
    accentLight: 'bg-indigo-50',
    accentBorder: 'border-indigo-100',
    accentText: 'text-indigo-600',
    tagBg: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  },
  {
    id: 2,
    title: 'BrightPath',
    subtitle: 'Student Wellness Tracker',
    category: 'Mental Health Platform',
    description: 'A gamified mental health & wellness companion for students. Track moods, journal thoughts, breathe mindfully, and grow with AI-powered support, achievement badges, and community sharing.',
    tags: ['JavaScript', 'Node.js', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800',
    github: 'https://github.com/anaydev29/brightpath',
    live: 'https://brightpathh.vercel.app/',
    accent: 'from-emerald-500 to-teal-500',
    accentLight: 'bg-emerald-50',
    accentBorder: 'border-emerald-100',
    accentText: 'text-emerald-600',
    tagBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  },
];

const Projects = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-indigo-200 bg-indigo-50">
          <span className="text-indigo-600 text-sm font-semibold">Portfolio</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800">
          Featured{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-base mt-3">
          A showcase of my recent work — scalable architecture, clean UI, and real-world impact.
        </p>
      </motion.div>

      {/* Alternating Project Cards */}
      <div className="flex flex-col gap-8">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className={`group bg-white/70 backdrop-blur-sm border border-slate-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 hover:-translate-y-1`}
          >
            <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>

              {/* Image Panel */}
              <div className={`relative h-64 lg:h-auto overflow-hidden ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-10 z-10`} />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Category pill on image */}
                <div className="absolute top-4 left-4 z-20">
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${project.accentLight} ${project.accentText} border ${project.accentBorder} backdrop-blur-sm`}>
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content Panel */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <p className={`text-sm font-semibold ${project.accentText} mb-2 uppercase tracking-wide`}>{project.subtitle}</p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-3">{project.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${project.tagBg}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/btn flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r ${project.accent} text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:scale-105`}
                  >
                    Live Demo <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-semibold text-sm transition-all duration-200 hover:scale-105"
                  >
                    <Github size={15} /> Code
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
