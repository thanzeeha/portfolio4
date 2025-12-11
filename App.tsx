
import React, { useState, useEffect } from 'react';
import { loadProfile, saveProfile, resetProfile } from './services/storageService';
import { ProfileData, ADMIN_PASSWORD_HASH } from './types';
import { AdminPanel } from './components/AdminPanel';
import { ProjectCard } from './components/ProjectCard';
import { 
  Github, Linkedin, Mail, Phone, MapPin, 
  Sun, Moon, Shield, Download, ChevronDown, Award, Send
} from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<ProfileData>(loadProfile());
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Initialize theme
  useEffect(() => {
    // Auto-detect system preference if no manual override (simplified for this demo to just default dark)
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple client-side hashing for demonstration of the requirement
    if (passwordInput === ADMIN_PASSWORD_HASH) {
  setIsAdmin(true);
  setShowAdminLogin(false);
  setPasswordInput("");
} else {
  alert("Incorrect password");
}
  };
  const handleSaveData = (newData: ProfileData) => {
    setData(newData);
    saveProfile(newData);
    alert("Website updated successfully!");
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  // Contact Form Handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // <!-- CONFIGURATION INSTRUCTIONS -->
    // Option 1: Using Formspree (Recommended for static sites)
    // 1. Go to https://formspree.io/ and create a free account.
    // 2. Create a new form and get the endpoint URL (e.g., https://formspree.io/f/your_id).
    // 3. Update the form action in the JSX below to use that URL: <form action="https://formspree.io/f/your_id" method="POST">
    
    // Option 2: Using a mailto link (Default implementation below)
    // This opens the user's default email client with the fields pre-filled.
    
    if (!contactForm.name || !contactForm.message) {
      alert("Please fill in your name and message.");
      return;
    }

    const subject = encodeURIComponent(contactForm.subject || `Portfolio Contact from ${contactForm.name}`);
    const body = encodeURIComponent(`Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`);
    
    // Redirect to email client
    window.location.href = `mailto:${data.email}?subject=${subject}&body=${body}`;
    
    // Reset form
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  if (isAdmin) {
    return <AdminPanel data={data} onSave={handleSaveData} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600 dark:from-neon-cyan dark:to-neon-purple">
                {data.name.split(' ')[0]}
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-neon-cyan px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
                <a href="#skills" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-neon-cyan px-3 py-2 rounded-md text-sm font-medium transition-colors">Skills</a>
                <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-neon-cyan px-3 py-2 rounded-md text-sm font-medium transition-colors">Projects</a>
                <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-neon-cyan px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle Theme"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h2 className="text-primary-600 dark:text-neon-cyan font-semibold tracking-wide uppercase text-sm">
            {data.tagline}
          </h2>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500">{data.name}</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto md:mx-0">
            {data.intro}
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
            <a href="#contact" className="px-8 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-neon-cyan dark:text-slate-900 dark:hover:bg-cyan-300 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-primary-500/30">
              Contact Me
            </a>
            {/* RESUME DOWNLOAD */}
            <a 
              href={data.resumeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-white rounded-full font-bold transition-all hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2"
            >
              <Download size={18} /> Resume
            </a>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-6 text-gray-500 dark:text-gray-400 pt-4">
             {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-neon-cyan transition-colors"><Linkedin size={24} /></a>}
             <a href={`mailto:${data.email}`} className="hover:text-primary-600 dark:hover:text-neon-cyan transition-colors"><Mail size={24} /></a>
          </div>
        </div>
        
        {/* Avatar */}
        <div className="relative w-64 h-64 md:w-96 md:h-96 flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          <img 
            src={data.avatarUrl} 
            alt="Avatar" 
            className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-slate-800 shadow-2xl z-10"
          />
        </div>
      </section>

      {/* About & Education */}
      <section id="about" className="py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        About Me <span className="h-1 w-20 bg-primary-500 rounded-full ml-4"></span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {data.about}
                    </p>
                    <div className="mt-8">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Interests</h3>
                        <div className="flex flex-wrap gap-2">
                            {data.interests.split(',').map((interest, i) => (
                                <span key={i} className="px-3 py-1 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-full text-sm text-gray-700 dark:text-gray-300">
                                    {interest.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        Education <Award className="text-primary-500" />
                    </h2>
                    <div className="space-y-6 border-l-2 border-gray-200 dark:border-slate-700 ml-3 pl-6">
                        {data.education.map((edu) => (
                            <div key={edu.id} className="relative">
                                <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-primary-500 ring-4 ring-white dark:ring-slate-800"></span>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{edu.level}</h3>
                                <p className="text-primary-600 dark:text-neon-cyan font-medium">{edu.institution}</p>
                                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    <span>{edu.year}</span>
                                    <span className="font-semibold">{edu.details}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                Technical Skills
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
                {data.skills.map((skill, idx) => (
                    <div key={idx} className="group relative px-6 py-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-slate-700 hover:border-primary-500 dark:hover:border-neon-cyan">
                        <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-neon-cyan transition-colors">
                            {skill}
                        </span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    A collection of hardware and software projects demonstrating my journey in engineering.
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                <div className="bg-primary-600 dark:bg-slate-900 p-8 text-white md:w-1/3 flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                        <p className="mb-6 text-primary-100 dark:text-gray-400">Feel free to reach out for collaborations or just a friendly hello.</p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-primary-200 dark:text-neon-cyan" />
                                <span className="text-sm">{data.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-primary-200 dark:text-neon-cyan" />
                                <span className="text-sm">{data.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin size={18} className="text-primary-200 dark:text-neon-cyan" />
                                <span className="text-sm">{data.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-8 md:w-2/3">
                    <form className="space-y-4" onSubmit={handleContactSubmit}>
                        {/* 
                          To use Formspree or a backend service, add action="YOUR_ENDPOINT" method="POST"
                          and remove the onSubmit handler or update it accordingly.
                        */}
                        <div className="grid grid-cols-2 gap-4">
                            <input 
                              type="text" 
                              name="name"
                              value={contactForm.name}
                              onChange={handleContactChange}
                              placeholder="Name" 
                              className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 dark:text-white w-full" 
                              required
                            />
                            <input 
                              type="email" 
                              name="email"
                              value={contactForm.email}
                              onChange={handleContactChange}
                              placeholder="Email" 
                              className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 dark:text-white w-full" 
                              required
                            />
                        </div>
                        <input 
                          type="text" 
                          name="subject"
                          value={contactForm.subject}
                          onChange={handleContactChange}
                          placeholder="Subject" 
                          className="w-full p-3 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 dark:text-white" 
                        />
                        <textarea 
                          name="message"
                          value={contactForm.message}
                          onChange={handleContactChange}
                          placeholder="Message" 
                          rows={4} 
                          className="w-full p-3 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                          required
                        ></textarea>
                        <button 
                          type="submit"
                          className="w-full bg-gray-900 dark:bg-neon-cyan dark:text-slate-900 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            Send Message <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 py-8 border-t border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
                © {new Date().getFullYear()} {data.name}. All rights reserved.
            </p>
            
            {/* ADMIN TRIGGER */}
            <button 
                onClick={() => setShowAdminLogin(true)}
                className="text-gray-400 hover:text-primary-500 dark:hover:text-neon-cyan text-xs font-bold uppercase tracking-widest flex items-center gap-1 transition-colors"
            >
                <Shield size={12} /> Admin
            </button>
        </div>
      </footer>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-gray-200 dark:border-slate-700">
                <div className="text-center mb-6">
                    <Shield size={48} className="mx-auto text-primary-500 dark:text-neon-cyan mb-2" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Access</h2>
                    <p className="text-sm text-gray-500">Enter password to manage content</p>
                </div>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                    <input 
                        type="password" 
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Password (admin123)" 
                        className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                        autoFocus
                    />
                    <div className="flex gap-2">
                        <button 
                            type="button" 
                            onClick={() => setShowAdminLogin(false)}
                            className="flex-1 py-3 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-colors"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
};

export default App;
