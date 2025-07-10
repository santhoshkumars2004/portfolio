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
      image: "/project3.jpg",
      technologies: ["Python", "TensorFlow", "React", "WebSocket"],
      github: "https://github.com/username/ai-chat",
      live: "https://ai-chat-demo.com"
    },
    {
      id: 'new-project-1',
      title: "[New Project Title 1]",
      subtitle: "[New Project Subtitle 1]",
      category: "[Category]",
      description: "[Brief description of the project.]",
      image: "[Placeholder Image URL 1]",
      technologies: [],
      github: "[GitHub Link 1]",
      live: "[Live Demo Link 1]"
    },
  
  ];

  return (
    <section id="projects" className="py-20 bg-white text-gray-800 dark:bg-black dark:text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 dark:text-white">FEATURED PROJECT</h2>

        <div className="flex overflow-x-auto space-x-8 pb-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex-none w-64 md:w-80 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-800 dark:bg-black"
            >
              <div className="relative h-80 w-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale"
                />
                <Link to={`/projects/${project.id}`} className="absolute bottom-4 right-4 bg-white border border-gray-300 w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600">
                  <FaArrowRight className="text-lg text-gray-800 dark:text-white" />
                </Link>
              </div>
              
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 text-xs tracking-widest dark:text-gray-300">{project.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 