
export interface Project {
  id: string;
  title: string;
  techStack: string;
  description: string;
  status: string;
  imageUrl: string;
  liveDemoUrl?: string;
  githubUrl?: string;
}

export interface Education {
  id: string;
  level: string; // e.g., "10th Grade", "B.E. CSE"
  institution: string;
  details: string; // Grade or percentage
  year: string;
}

export interface ProfileData {
  name: string;
  tagline: string;
  intro: string;
  avatarUrl: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  about: string;
  interests: string;
  resumeUrl: string;
  skills: string[];
  education: Education[];
  projects: Project[];
}

export const ADMIN_PASSWORD_HASH = "nafee123"; // SHA-256 for 'admin'
// TO CHANGE PASSWORD: Generate a SHA-256 hash of your desired password and replace the string above.
