
import React from 'react';
import { Project } from '../types';
import { ExternalLink, Code, Github, Globe } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:-translate-y-1 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md rounded-full border border-white/20">
            {project.status}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-neon-cyan transition-colors">
          {project.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
          <Code size={16} className="text-primary-500 dark:text-neon-cyan" />
          <span className="font-medium truncate">{project.techStack}</span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
          {project.description}
        </p>
        
        <div className="flex gap-2 mt-auto">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
              >
                <Github size={16} /> Code
              </a>
            )}
            {project.liveDemoUrl ? (
              <a 
                href={project.liveDemoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-primary-50 dark:bg-slate-700 text-primary-700 dark:text-neon-cyan border border-primary-200 dark:border-slate-600 rounded-lg text-sm font-medium hover:bg-primary-100 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
              >
                <Globe size={16} /> Live Demo
              </a>
            ) : (
               <button disabled className="flex-1 px-4 py-2 opacity-50 cursor-not-allowed bg-gray-50 dark:bg-slate-800 text-gray-400 rounded-lg text-sm font-medium border border-gray-100 dark:border-slate-700 flex items-center justify-center gap-2">
                 <ExternalLink size={14} /> Details
               </button>
            )}
        </div>
      </div>
    </div>
  );
};
