import { motion } from 'framer-motion';
import { Code2, Database, Layout, Smartphone, Award, Zap, Mail, Github, Linkedin, FileText } from 'lucide-react';

const SKILLS = [
  {
    category: 'Frontend',
    icon: <Layout size={24} />,
    color: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    border: 'border-blue-100',
    items: ['React', 'Vue.js', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  {
    category: 'Backend',
    icon: <Database size={24} />,
    color: 'from-emerald-500 to-teal-500',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    border: 'border-emerald-100',
    items: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'REST APIs'],
  },
  {
    category: 'Languages',
    icon: <Code2 size={24} />,
    color: 'from-indigo-500 to-purple-500',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    border: 'border-indigo-100',
    items: ['JavaScript', 'TypeScript', 'Python', 'C++'],
  },
  {
    category: 'Mobile & Other',
    icon: <Smartphone size={24} />,
    color: 'from-pink-500 to-rose-500',
    iconBg: 'bg-pink-50',
    iconColor: 'text-pink-600',
    border: 'border-pink-100',
    items: ['React Native', 'Flutter', 'Git & GitHub', 'PWA'],
  },
];

const STATS = [
  { label: 'Projects Built', value: '5+', icon: <Zap size={18} /> },
  { label: 'Technologies', value: '15+', icon: <Code2 size={18} /> },
  { label: 'Hackathons', value: '2+', icon: <Award size={18} /> },
];

const SOCIAL_LINKS = [
  { icon: <Mail size={20} />, label: 'Email', value: 'shivhareanay2908@gmail.com', href: 'mailto:shivhareanay2908@gmail.com', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', hoverBorder: 'hover:border-blue-300' },
  { icon: <Github size={20} />, label: 'GitHub', value: 'github.com/anaydev29', href: 'https://github.com/anaydev29', color: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200', hoverBorder: 'hover:border-slate-400' },
  { icon: <Linkedin size={20} />, label: 'LinkedIn', value: 'Anay Shivhare', href: 'https://www.linkedin.com/in/anay-shivhare-7385a8380', color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-100', hoverBorder: 'hover:border-sky-300' },
  { icon: <FileText size={20} />, label: 'Resume', value: 'Download Resume', href: '/anay_shivhare_resume.pdf', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100', hoverBorder: 'hover:border-orange-300', download: true },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const About = () => {
  return (
    <div className="max-w-6xl mx-auto">

      {/* Section Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-indigo-200 bg-indigo-50">
          <span className="text-indigo-600 text-sm font-semibold">About Me</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800">
          Who I Am &amp;{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">What I Do</span>
        </h2>
      </motion.div>

      {/* Bento Grid Top — About + Stats + Connect */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* About Card (spans 2 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl">👨‍💻</div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Anay Shivhare</h3>
              <p className="text-indigo-600 text-sm font-medium">B.Tech CSD | MERN Stack Developer</p>
            </div>
          </div>
          <div className="space-y-4 text-slate-500 text-base leading-relaxed">
            <p>
              Hello! I'm Anay — a B.Tech Computer Science & Design student and a passionate MERN Stack Developer.
              I love turning ideas into real-world web applications using MongoDB, Express.js, React, and Node.js.
              From responsive frontends to robust backend APIs, I enjoy building the full picture.
            </p>
            <p>
              Alongside web development, I'm actively sharpening my problem-solving skills by pursuing DSA in Java.
              Whether it's cracking complex algorithms or shipping a feature-complete app, I'm always up for a good challenge.
              My goal is to grow as a versatile full stack developer and contribute to products that make a real impact.
            </p>
          </div>

          {/* Inline stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black text-slate-800">{stat.value}</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Connect Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:shadow-purple-100 transition-all duration-300"
        >
          <h3 className="text-lg font-bold text-slate-800 mb-6">Let's Connect 🤝</h3>
          <div className="flex flex-col gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                {...(link.download ? { download: true } : {})}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border ${link.border} ${link.hoverBorder} bg-white hover:bg-slate-50 transition-all duration-200 group`}
              >
                <span className={`p-2 rounded-xl ${link.bg} ${link.color}`}>{link.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-400 font-medium">{link.label}</div>
                  <div className="text-sm text-slate-700 font-semibold truncate group-hover:text-indigo-600 transition-colors">{link.value}</div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Skills Cards */}
      <div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center mb-8">
          <h3 className="text-2xl font-black text-slate-800">
            Technical <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Expertise</span>
          </h3>
          <p className="text-slate-400 text-sm mt-1">Technologies I work with daily</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {SKILLS.map((skill) => (
            <motion.div
              key={skill.category}
              variants={item}
              className={`group relative bg-white/70 backdrop-blur-sm border ${skill.border} rounded-3xl p-6 hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`} />

              <div className={`w-12 h-12 rounded-2xl ${skill.iconBg} ${skill.iconColor} flex items-center justify-center mb-4 border ${skill.border}`}>
                {skill.icon}
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-3">{skill.category}</h4>
              <ul className="space-y-1.5">
                {skill.items.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-slate-500">
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${skill.color} flex-shrink-0`} />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
