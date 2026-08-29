import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiLayers, FiLock, FiCpu } from 'react-icons/fi';

export default function About() {
  const features = [
    { title: 'Vite & React 18', desc: 'Blazing fast frontend performance with modern asset bundling.', icon: FiCpu },
    { title: 'Tailwind CSS v4', desc: 'Optimized styling framework with global dark theme adaptation.', icon: FiLayers },
    { title: 'Secure Authentication', desc: 'JWT token handling with context API and backend security middleware.', icon: FiLock },
  ];

  return (
    <div className="page-container flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
      >
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold gradient-text mb-4">About MyApp</h1>
          <p className="text-gray-600 dark:text-gray-300">
            A full-stack React frontend implementation paired with a robust backend environment. 
            Engineered for security, speed, and responsive design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="p-6 rounded-2xl glass card-hover text-center">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Connect With Us</h4>
          <div className="flex justify-center space-x-6 text-xl">
            <a href="#" className="p-3 rounded-full glass hover:text-indigo-500 transition-colors">
              <FiGithub />
            </a>
            <a href="#" className="p-3 rounded-full glass hover:text-indigo-500 transition-colors">
              <FiTwitter />
            </a>
            <a href="#" className="p-3 rounded-full glass hover:text-indigo-500 transition-colors">
              <FiLinkedin />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}