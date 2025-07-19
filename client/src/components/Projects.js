import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Projects = () => {
  const projects = [
    {
      id: 'legal-ai-fir-assist',
      title: "Legal AI FIR Assist",
      subtitle: "AI-CHATBOT",
      category: "website",
      description: "AI-powered legal assistant for First Information Report (FIR) filing and tracking.",
      image: "/images/project1.jpg",
      technologies: ["HTML", "CSS", "Django", "Machine Learning(LLM & NLP)", "Power BI"],
      github: "https://github.com/username/ecommerce",
      live: "https://ecommerce-demo.com",
      date: "Jan 10, 2024",
      details: "This project revolutionizes the process of filing First Information Reports (FIRs) by leveraging advanced Natural Language Processing (NLP) and AI technologies. Designed to assist both police officers and complainants, the system integrates a Legal Language Model to predict and suggest relevant sections of the Indian Penal Code (IPC) and the Code of Criminal Procedure (CRPC) based on crime descriptions.\n\nThe platform supports multiple input formats, including text, voice, and Optical Character Recognition (OCR) for printed or handwritten documents in Hindi and English. It generates editable FIR drafts, saving time and improving accuracy. A dashboard provides crime hotspot analysis, enabling proactive patrol recommendations and resource optimization.\n\nThe solution is accessible via an open-source cloud platform (Streamlit), ensuring usability across various devices and locations. With its user-friendly chatbot and multilingual support, the system empowers complainants to navigate the legal process confidently while helping police officers make informed decisions efficiently.\n\nKey Features:\n\n• Predicts IPC & CRPC sections with an NLP-based Legal Language Model.\n• Offers multilingual input support (text, voice, handwritten, and printed formats).\n• Automatically drafts editable FIRs for accuracy and speed.\n• Provides a crime analysis dashboard with hotspot identification and patrol recommendations.\n• Enhances accessibility and usability via an open-source platform.\n\nThis project ensures a more streamlined, fair, and transparent FIR filing process, benefiting law enforcement and the public alike."
    },
    {
      id: 'petition-tracking-using-ai',
      title: "Petition Tracking Using AI",
      subtitle: "AI Management System",
      category: "Website",
      description: "A collaborative task management application with real-time updates, team features, and progress tracking.",
      image: "/images/project2.jpg",
      technologies: ["Html","Css","Django Machine Learning(LLM & NLP)" ,"Power Bi"],
      github: "https://github.com/username/task-manager",
      live: "https://task-manager-demo.com"
    },
    {
      id: 'cococyclerevive',
      title: "CocoCyle",
      subtitle: "AI POWERED CHAT",
      category: "website",
      description: "An AI-powered chat application that uses natural language processing to provide intelligent responses.",
      image: "/images/project3.jpg",
      technologies: ["Python", "TensorFlow", "React", "WebSocket"],
      github: "https://github.com/username/ai-chat",
      live: "https://ai-chat-demo.com"
    },
  ];

  // Calculate optimal grid columns based on number of projects
  const getGridCols = () => {
    const count = projects.length;
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-1 sm:grid-cols-2";
    if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    if (count === 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4";
    if (count === 5) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
    if (count === 6) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6";
    // For more than 6 projects, use a standard responsive grid
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
  };

  // Calculate max width based on number of projects
  const getMaxWidth = () => {
    const count = projects.length;
    if (count === 1) return "max-w-md";
    if (count === 2) return "max-w-4xl";
    if (count === 3) return "max-w-6xl";
    if (count === 4) return "max-w-7xl";
    return "max-w-7xl";
  };

  return (
    <section id="projects" className="py-8 sm:py-12 md:py-16 lg:py-20 text-gray-800 dark:text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12 dark:text-white">FEATURED PROJECT</h2>

        <div className={`grid ${getGridCols()} gap-3 sm:gap-4 md:gap-6 lg:gap-8 ${getMaxWidth()} mx-auto justify-items-center`}>
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm dark:bg-black rounded-lg overflow-hidden border border-gray-300/50 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-sm"
            >
              <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 w-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
                <Link to={`/projects/${project.id}`} className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 bg-white border border-gray-300 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600">
                  <FaArrowRight className="text-xs sm:text-sm md:text-lg text-gray-800 dark:text-white" />
                </Link>
              </div>
              
              <div className="p-3 sm:p-4 text-center">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 dark:text-white line-clamp-2">{project.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm tracking-widest dark:text-gray-300">{project.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 