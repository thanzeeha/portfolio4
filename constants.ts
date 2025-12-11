
import { ProfileData } from './types';

export const DEFAULT_PROFILE: ProfileData = {
  name: "Nafeesath Thanzeeha",
  tagline: "IoT Enthusiast & Computer Science Engineer",
  intro: "Building the future with code and hardware. Focused on IoT, AI, and solving real-world problems.",
  // <!-- CHANGE AVATAR HERE: Replace the URL below with your tech illustration URL -->
  avatarUrl: "https://i.ibb.co/Q7zXMcbN/Screenshot-2025-12-11-14-48-56-254-com-openai-chatgpt.jpg", 
  email: "naftha126@gmail.com", // <!-- EDIT HERE -->
  phone: "8217513491", // <!-- EDIT HERE -->
  linkedin: "https://www.linkedin.com/in/nafeesath-thanzeeha-b7a34b359?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", // <!-- EDIT HERE -->
  location: "Manjeshwara, India",
  about: "I am a 3rd Semester Computer Science Engineering student at PA College of Engineering, Mangalore. Passionate about bridging the gap between software and hardware through IoT and AI solutions.",
  interests: "IoT, AI, Engineering Projects, Hardware Prototyping, Personal Growth",
  // <!-- UPLOAD RESUME HERE: Replace the link below with your uploaded PDF link -->
  resumeUrl: "resume.pdf", 
  skills: [
    "C", "Python", "Arduino", "ESP32", "IoT Sensors", "ThingSpeak", "Hardware Prototyping", "Problem Solving"
  ],
  education: [
    {
      id: "edu-1",
      level: "B.E. Computer Science Engineering",
      institution: "PA College of Engineering, Mangalore",
      details: "3rd Semester - Current",
      year: "2023 - Present"
    },
    {
      id: "edu-2",
      level: "12th Grade (PUC)",
      institution: "Pre-University College",
      details: "83.33%",
      year: "2023"
    },
    {
      id: "edu-3",
      level: "10th Grade",
      institution: "High School",
      details: "94.72%",
      year: "2021"
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "TerraSafe",
      techStack: "Geospatial Analysis, ML, Satellite Data",
      description: "Satellite-based multi-hazard early detection system aiming to predict natural disasters using real-time data.",
      status: "In Progress",
      imageUrl: "https://picsum.photos/seed/terra/600/400",
      githubUrl: "https://github.com",
      liveDemoUrl: ""
    },
    {
      id: "proj-2",
      title: "EMG Monitoring",
      techStack: "ESP32, Muscle BioAmp, ThingSpeak",
      description: "Real-time muscle activity monitoring system with cloud visualization and local LCD display for patient diagnostics.",
      status: "Completed",
      imageUrl: "https://picsum.photos/seed/emg/600/400",
      githubUrl: "https://github.com",
      liveDemoUrl: "https://thingspeak.com"
    },
    {
      id: "proj-3",
      title: "Footstep Energy Harvester",
      techStack: "Piezoelectric Modules, Boost Converter",
      description: "Sustainable energy solution converting mechanical kinetic energy from footsteps into usable electricity.",
      status: "Prototype",
      imageUrl: "https://picsum.photos/seed/footstep/600/400",
      githubUrl: "",
      liveDemoUrl: ""
    }
  ]
};
