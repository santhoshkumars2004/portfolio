import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
  const { projectId } = useParams(); // Get project ID from URL

  // In a real application, you would fetch project data based on projectId
  // For now, we'll use placeholder data or find from the existing projects array

  // Placeholder project data (replace with actual data fetching logic)
  const projects = [
    {
      id: 'legal-ai-fir-assist',
      title: "Legal AI FIR Assist",
      subtitle: "AI-CHATBOT",
      category: "website",
      description: "AI-powered legal assistant for First Information Report (FIR) filing and tracking.",
      image: "/images/project1.jpg",
      technologies: ["HTML", "CSS", "Django", "Machine Learning(LLM & NLP)", "Power BI"],
      github: "https://github.com/Guruoo7/teja_rajasthan_hackathon", // Updated GitHub link
      live: "", // Removed Live Demo link
      date: "Jan 10, 2024",
      details: "This project revolutionizes the process of filing First Information Reports (FIRs) by leveraging advanced Natural Language Processing (NLP) and AI technologies. Designed to assist both police officers and complainants, the system integrates a Legal Language Model to predict and suggest relevant sections of the Indian Penal Code (IPC) and the Code of Criminal Procedure (CRPC) based on crime descriptions.\n\nThe platform supports multiple input formats, including text, voice, and Optical Character Recognition (OCR) for printed or handwritten documents in Hindi and English. It generates editable FIR drafts, saving time and improving accuracy. A dashboard provides crime hotspot analysis, enabling proactive patrol recommendations and resource optimization.\n\nThe solution is accessible via an open-source cloud platform (Streamlit), ensuring usability across various devices and locations. With its user-friendly chatbot and multilingual support, the system empowers complainants to navigate the legal process confidently while helping police officers make informed decisions efficiently.\n\nKey Features:\n\n• Predicts IPC & CRPC sections with an NLP-based Legal Language Model.\n• Offers multilingual input support (text, voice, handwritten, and printed formats).\n• Automatically drafts editable FIRs for accuracy and speed.\n• Provides a crime analysis dashboard with hotspot identification and patrol recommendations.\n• Enhances accessibility and usability via an open-source platform.\n\nThis project ensures a more streamlined, fair, and transparent FIR filing process, benefiting law enforcement and the public alike."
    },
    {
      id: 'petition-tracking-using-ai',
      title: "Petition Tracking Using AI",
      subtitle: "AI Management System",
      category: "Website",
      description: "A collaborative task management application with real-time updates, team features, and progress tracking. [More detailed description here]",
      image: "/project2.jpg",
      technologies: ["Html","Css","Django Machine Learning(LLM & NLP)" ,"Power Bi"],
      github: "https://github.com/username/task-manager",
      live: "",
      // Add more details specific to this project
      details: "This system employs AI algorithms to analyze petition data, categorize them, and track their progress through various stages. It provides users with real-time updates and insights into the petition resolution process.",
      date: "2024-04-01"
    },
    {
      id: 'cococyclerevive',
      title: "CocoCyle",
      subtitle: "AI POWERED CHAT",
      category: "website",
      description: "Sustainable waste management and recycling solution",
      image: "/project3.jpg",
      technologies: ["Html", "Css", "JavaScript", "Django", "Arduino and IOT"],
      github: "https://github.com/santhoshkumars2004/carbon-green", // Updated GitHub link
      youtube: "https://youtu.be/O_0DCLTIUJw?si=CxptlaQlg6h7xxvL", // Added YouTube link
      date: "Mar 15, 2024",
      details: "This project focuses on addressing environmental sustainability challenges by creating an efficient system for collecting and recycling discarded coconut shells. It integrates technology and consumer engagement to reduce waste and promote eco-friendly practices.\n\nThe solution involves deploying reverse vending machines in public areas to collect coconut shells. These machines incentivize consumers with reward points based on the weight of their contributions. Consumers can redeem these points to purchase sustainable products from local Micro, Small, and Medium Enterprises (MSMEs), fostering a circular economy.\n\nThe collected shells are processed into activated carbon, which is in high demand for applications like air and water purification, healthcare, and other industries. By partnering with MSMEs, the project supports local businesses while encouraging consumers to adopt sustainable habits.\n\nKey Features:\n\n• Reverse Vending Machines: Collect, store, and notify when full, ensuring efficient waste collection.\n• Consumer Incentives: Reward points for contributing coconut shells, redeemable for eco-friendly products.\n• Resource Transformation: Converts coconut shells into valuable activated carbon, reducing environmental impact.\n• Support for MSMEs: Promotes local businesses by enabling the sale of sustainable products.\n\nThis project not only reduces coconut shell waste but also actively contributes to environmental sustainability and economic empowerment."
    },
  ];

  // Find the project with the matching ID
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">Project not found.</div>; // Handle case where project ID doesn't match
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-black dark:text-white py-20 pt-32"> {/* Adjusted padding-top to account for fixed Navbar */}
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 dark:text-white">{project.title}</h1>
        <p className="text-xl text-gray-600 text-center mb-4 dark:text-gray-300">{project.subtitle}</p>
        {project.date && (
          <p className="text-lg text-gray-500 text-center mb-12 dark:text-gray-400">{project.date}</p>
        )}

        <div className="flex flex-col md:flex-row gap-12">
          {/* Project Image */}
          <div className="md:w-1/2">
            <img 
              src={project.image}
              alt={project.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Project Details */}
          <div className="md:w-1/2 text-gray-700 dark:text-gray-300">
            <h3 className="text-2xl font-semibold mb-4 dark:text-white">Description</h3>
            <p className="mb-6">{project.description}</p>
            
            {/* More Detailed Information */}
             <h3 className="text-2xl font-semibold mb-4 dark:text-white">More Details</h3>
            <div className="mb-6 whitespace-pre-line">{project.details}</div>

            <h3 className="text-2xl font-semibold mb-4 dark:text-white">Technologies</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm font-semibold text-gray-700 dark:bg-black dark:text-gray-200">
                  {tech}
                </span>
              ))}
            </div>

            {/* Project Links */}
            <div className="flex gap-4">
              {project.github && (
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  GitHub
                </a>
              )}
              {project.live && (
                 <a 
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  Live Demo
                </a>
              )}
              {project.youtube && (
                 <a 
                  href={project.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  YouTube
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail; 