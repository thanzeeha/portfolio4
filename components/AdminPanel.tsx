
import React, { useState, useEffect } from 'react';
import { ProfileData, Project, Education, ADMIN_PASSWORD_HASH } from '../types';
import { Save, LogOut, Plus, Trash2, Upload, Download, RefreshCw, Lock } from 'lucide-react';

interface AdminPanelProps {
  data: ProfileData;
  onSave: (data: ProfileData) => void;
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ data, onSave, onLogout }) => {
  // Local state for the form to avoid excessive re-renders on the main app
  const [formData, setFormData] = useState<ProfileData>(data);
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'projects' | 'education'>('profile');
  const [jsonImport, setJsonImport] = useState('');

  // Update local state if prop changes (rare in this flow but good practice)
  useEffect(() => {
    setFormData(data);
  }, [data]);
  async function saveToGithub(data: any) {
  const response = await fetch("/api/updateContent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      owner: "thanzeeha",
      repo: "portfolio4",
      path: "metadata.json",
      content: JSON.stringify(data, null, 2),
      branch: "main",
      message: "Updated from Admin Panel"
    })
  });

  const result = await response.json();

  if (!response.ok) {
    alert("GitHub update failed! Check console.");
    console.error(result);
    return;
  }

  alert("Saved to GitHub! Vercel is redeploying your site.");
}

  const handleChange = (field: keyof ProfileData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProjectChange = (id: string, field: keyof Project, value: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: "New Project",
      techStack: "Tech Stack",
      description: "Description...",
      status: "Pending",
      imageUrl: "https://picsum.photos/seed/new/600/400",
      githubUrl: "",
      liveDemoUrl: ""
    };
    setFormData(prev => ({ ...prev, projects: [newProject, ...prev.projects] }));
  };

  const removeProject = (id: string) => {
    if(window.confirm("Delete this project?")) {
        setFormData(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== id)
        }));
    }
  };

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  };
  
  const addEducation = () => {
      const newEdu: Education = {
          id: Date.now().toString(),
          level: "New Degree",
          institution: "University Name",
          details: "Grade/Score",
          year: "Year"
      };
      setFormData(prev => ({ ...prev, education: [newEdu, ...prev.education]}));
  };

  const removeEducation = (id: string) => {
      setFormData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id)}));
  };

  const handleSkillChange = (idx: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[idx] = value;
    setFormData(prev => ({ ...prev, skills: newSkills }));
  };

  const addSkill = () => {
    setFormData(prev => ({ ...prev, skills: [...prev.skills, "New Skill"] }));
  };
  
  const removeSkill = (idx: number) => {
      const newSkills = [...formData.skills];
      newSkills.splice(idx, 1);
      setFormData(prev => ({ ...prev, skills: newSkills }));
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "portfolio_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = () => {
    try {
      if (!jsonImport) return;
      const parsed = JSON.parse(jsonImport);
      setFormData(parsed);
      alert("Data imported! Click Save to apply.");
    } catch (e) {
      alert("Invalid JSON");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border-2 border-primary-500 dark:border-neon-cyan">
        
        {/* Header */}
        <div className="bg-primary-600 dark:bg-slate-950 p-6 flex justify-between items-center text-white border-b border-primary-500">
          <div className="flex items-center gap-3">
            <Lock className="text-white animate-pulse" />
            <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
          </div>
          <div className="flex gap-3">
            <button 
                onClick={() => saveToGithub(formData)}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
                <Save size={18} /> SAVE ALL CHANGES
            </button>
            <button 
                onClick={onLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition-transform hover:scale-105"
            >
                <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
            {/* Sidebar / Tabs */}
            <div className="w-full md:w-64 bg-gray-50 dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 p-4">
                <nav className="space-y-2">
                    {['profile', 'education', 'skills', 'projects'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                                activeTab === tab 
                                ? 'bg-primary-100 text-primary-700 dark:bg-slate-800 dark:text-neon-cyan border border-primary-200 dark:border-slate-600' 
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Backup & Restore</h3>
                    <button onClick={handleExport} className="w-full flex items-center gap-2 text-sm text-primary-600 hover:text-primary-800 dark:text-neon-cyan mb-2">
                        <Download size={14} /> Export JSON
                    </button>
                    <div className="mt-2">
                        <textarea 
                            value={jsonImport}
                            onChange={(e) => setJsonImport(e.target.value)}
                            placeholder="Paste JSON here..."
                            className="w-full text-xs p-2 rounded bg-white dark:bg-slate-950 border border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-200"
                            rows={2}
                        />
                        <button onClick={handleImport} className="mt-1 w-full flex items-center justify-center gap-2 text-xs bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white py-1 rounded hover:bg-gray-300 dark:hover:bg-slate-600">
                            <Upload size={12} /> Import
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[80vh]">
                
                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white border-b pb-2 dark:border-slate-700">Personal Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Name" value={formData.name} onChange={(v) => handleChange('name', v)} />
                            <Input label="Tagline" value={formData.tagline} onChange={(v) => handleChange('tagline', v)} />
                            <Input label="Location" value={formData.location} onChange={(v) => handleChange('location', v)} />
                            <Input label="Email" value={formData.email} onChange={(v) => handleChange('email', v)} />
                            <Input label="Phone" value={formData.phone} onChange={(v) => handleChange('phone', v)} />
                            <Input label="LinkedIn URL" value={formData.linkedin} onChange={(v) => handleChange('linkedin', v)} />
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avatar URL</label>
                                <input 
                                    type="text" 
                                    value={formData.avatarUrl} 
                                    onChange={(e) => handleChange('avatarUrl', e.target.value)}
                                    className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
                                />
                                <p className="text-xs text-gray-500 mt-1">Use a URL from Unsplash or similar. Current: {formData.avatarUrl}</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resume Link (PDF)</label>
                                {/* <!-- UPLOAD RESUME HERE and replace value below --> */}
                                <input 
                                    type="text" 
                                    value={formData.resumeUrl} 
                                    onChange={(e) => handleChange('resumeUrl', e.target.value)}
                                    className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
                                />
                                <p className="text-xs text-gray-500 mt-1">Provide a link to your PDF (e.g., Google Drive link or file path if hosted)</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Intro (Hero Section)</label>
                                <textarea 
                                    value={formData.intro} 
                                    onChange={(e) => handleChange('intro', e.target.value)}
                                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white h-24"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">About Me (Full Bio)</label>
                                <textarea 
                                    value={formData.about} 
                                    onChange={(e) => handleChange('about', e.target.value)}
                                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white h-32"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Interests</label>
                                <input 
                                    type="text"
                                    value={formData.interests} 
                                    onChange={(e) => handleChange('interests', e.target.value)}
                                    className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'education' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b pb-2 dark:border-slate-700">
                             <h2 className="text-xl font-bold text-gray-800 dark:text-white">Education Timeline</h2>
                             <button onClick={addEducation} className="flex items-center gap-1 text-sm bg-primary-500 text-white px-3 py-1 rounded hover:bg-primary-600">
                                <Plus size={16} /> Add
                             </button>
                        </div>
                        {formData.education.map((edu, index) => (
                             <div key={edu.id} className="p-4 bg-gray-50 dark:bg-slate-950 rounded-lg border border-gray-200 dark:border-slate-700 relative group">
                                <button 
                                    onClick={() => removeEducation(edu.id)}
                                    className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input label="Level / Degree" value={edu.level} onChange={(v) => handleEducationChange(edu.id, 'level', v)} />
                                    <Input label="Institution" value={edu.institution} onChange={(v) => handleEducationChange(edu.id, 'institution', v)} />
                                    <Input label="Details (Grade/%)" value={edu.details} onChange={(v) => handleEducationChange(edu.id, 'details', v)} />
                                    <Input label="Year" value={edu.year} onChange={(v) => handleEducationChange(edu.id, 'year', v)} />
                                </div>
                             </div>
                        ))}
                    </div>
                )}

                {activeTab === 'skills' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b pb-2 dark:border-slate-700">
                             <h2 className="text-xl font-bold text-gray-800 dark:text-white">Skills</h2>
                             <button onClick={addSkill} className="flex items-center gap-1 text-sm bg-primary-500 text-white px-3 py-1 rounded hover:bg-primary-600">
                                <Plus size={16} /> Add Skill
                             </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {formData.skills.map((skill, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input 
                                        type="text" 
                                        value={skill}
                                        onChange={(e) => handleSkillChange(index, e.target.value)}
                                        className="flex-1 p-2 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
                                    />
                                    <button onClick={() => removeSkill(index)} className="text-red-400 hover:text-red-600">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div className="space-y-8">
                        <div className="flex justify-between items-center border-b pb-2 dark:border-slate-700">
                             <h2 className="text-xl font-bold text-gray-800 dark:text-white">Projects</h2>
                             <button onClick={addProject} className="flex items-center gap-1 text-sm bg-primary-500 text-white px-3 py-1 rounded hover:bg-primary-600">
                                <Plus size={16} /> Add Project
                             </button>
                        </div>
                        {formData.projects.map((proj) => (
                            <div key={proj.id} className="p-6 bg-gray-50 dark:bg-slate-950 rounded-xl border border-gray-200 dark:border-slate-700 relative">
                                <button 
                                    onClick={() => removeProject(proj.id)}
                                    className="absolute top-4 right-4 bg-red-100 dark:bg-red-900/30 text-red-600 p-2 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <Input label="Project Title" value={proj.title} onChange={(v) => handleProjectChange(proj.id, 'title', v)} />
                                    <Input label="Status" value={proj.status} onChange={(v) => handleProjectChange(proj.id, 'status', v)} />
                                    <Input label="GitHub URL" value={proj.githubUrl || ''} onChange={(v) => handleProjectChange(proj.id, 'githubUrl', v)} />
                                    <Input label="Live Demo URL" value={proj.liveDemoUrl || ''} onChange={(v) => handleProjectChange(proj.id, 'liveDemoUrl', v)} />
                                    <div className="md:col-span-2">
                                         <Input label="Tech Stack" value={proj.techStack} onChange={(v) => handleProjectChange(proj.id, 'techStack', v)} />
                                    </div>
                                    <div className="md:col-span-2">
                                         <Input label="Image URL" value={proj.imageUrl} onChange={(v) => handleProjectChange(proj.id, 'imageUrl', v)} />
                                         <img src={proj.imageUrl} alt="preview" className="mt-2 h-20 w-32 object-cover rounded border border-gray-300" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                        <textarea 
                                            value={proj.description} 
                                            onChange={(e) => handleProjectChange(proj.id, 'description', e.target.value)}
                                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white h-24"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
    <div>
        <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1 tracking-wider">{label}</label>
        <input 
            type="text" 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
        />
    </div>
);
