import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, ArrowUpRight, MessageSquare } from 'lucide-react';

const CONTACT_INFO = [
  {
    icon: <Mail size={22} />,
    title: 'Email',
    value: 'shivhareanay2908@gmail.com',
    subtext: 'Best way to reach me',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    hoverBorder: 'hover:border-blue-300',
    href: 'mailto:shivhareanay2908@gmail.com',
  },
  {
    icon: <Phone size={22} />,
    title: 'Phone',
    value: '+91 89590 12914',
    subtext: 'Available Mon–Sat',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    hoverBorder: 'hover:border-purple-300',
  },
  {
    icon: <MapPin size={22} />,
    title: 'Location',
    value: 'India',
    subtext: 'Open to remote work',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    hoverBorder: 'hover:border-emerald-300',
  },
];

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-indigo-200 bg-indigo-50">
          <span className="text-indigo-600 text-sm font-semibold">Contact</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800">
          Get In{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-base mt-3">
          Have a project in mind or just want to say hello? I'm always open to a good conversation.
        </p>
      </motion.div>

      {/* Bento Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Contact Cards */}
        {CONTACT_INFO.map((info, idx) => (
          <motion.div
            key={info.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
          >
            {info.href ? (
              <a
                href={info.href}
                className={`group flex flex-col gap-4 p-6 rounded-3xl bg-white/70 backdrop-blur-sm border ${info.border} ${info.hoverBorder} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full`}
              >
                <div className={`w-12 h-12 rounded-2xl ${info.bg} ${info.color} flex items-center justify-center`}>
                  {info.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{info.title}</p>
                  <p className="text-slate-800 font-bold text-sm leading-snug break-all">{info.value}</p>
                  <p className="text-slate-400 text-xs mt-1">{info.subtext}</p>
                </div>
                <div className={`mt-auto flex items-center gap-1 text-xs font-semibold ${info.color}`}>
                  Send a message <ArrowUpRight size={14} />
                </div>
              </a>
            ) : (
              <div className={`flex flex-col gap-4 p-6 rounded-3xl bg-white/70 backdrop-blur-sm border ${info.border} h-full`}>
                <div className={`w-12 h-12 rounded-2xl ${info.bg} ${info.color} flex items-center justify-center`}>
                  {info.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{info.title}</p>
                  <p className="text-slate-800 font-bold text-sm">{info.value}</p>
                  <p className="text-slate-400 text-xs mt-1">{info.subtext}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Quote Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-5 p-7 rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 flex items-start gap-4"
      >
        <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
          <MessageSquare size={18} className="text-indigo-500" />
        </div>
        <div>
          <p className="text-indigo-700 text-sm italic leading-relaxed font-medium">
            "The best way to predict the future is to create it."
          </p>
          <p className="text-slate-400 text-xs mt-2 font-semibold">— Peter Drucker</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
