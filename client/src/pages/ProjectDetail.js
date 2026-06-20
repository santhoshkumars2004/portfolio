import React from 'react';
import { useParams } from 'react-router-dom';

const projects = [
  {
    id: 'ai-powered-legal-query-system',
    title: 'AI-Powered Legal Query System',
    subtitle: 'Python, Django, AWS',
    description:
      'A secure legal-assist platform for police workflows that predicts relevant IPC/CrPC sections from complaint context and reduces manual legal lookup.',
    image: '/images/project1.jpg',
    technologies: ['Python', 'Django', 'AWS', 'Tesseract OCR', 'spaCy NLP', 'HTML', 'CSS'],
    github: 'https://github.com/Guruoo7/teja_rajasthan_hackathon',
    date: 'Jan 2024 - Feb 2024',
    details:
      'Built an end-to-end web app with authentication, restricted access, and a guided legal-drafting flow. Added OCR for uploaded Hindi complaint letters and integrated NLP-based section suggestions to improve drafting speed and accuracy. Designed the product for practical officer workflows and measurable reduction in manual section mapping effort.',
  },
  {
    id: 'psb-security-compliance-pipeline',
    title: 'PSB Security Compliance Pipeline',
    subtitle: 'Python, LLMs, MCP Servers',
    description:
      'Production AI compliance workflow that scans large codebases, identifies policy gaps, and converts validated findings into actionable tickets.',
    image: '/images/project2.jpg',
    technologies: ['Python', 'LLM Orchestration', 'MCP', 'JIRA', 'GitHub Copilot', 'OpenAI Codex'],
    date: 'Cisco - 2026',
    details:
      'Designed a 12-phase pipeline where only 4 phases invoke LLMs, improving efficiency and cost. Implemented a probe compiler to bucket OOD/NOISY/DEAD files before model inference, filtering roughly 70% irrelevant files. Replaced single-prompt decisions with a consensus voting strategy using parallel LLM calls and historical scoring to reduce hallucinated gaps. Wired JIRA + coding assistants through MCP for automated triage and owner-ready ticketing.',
  },
  {
    id: 'cusp-test-automation-scale-up',
    title: 'CUSP Test Automation Scale-up',
    subtitle: 'Playwright, TypeScript, Jenkins',
    description:
      'Automation expansion initiative for key application flows with stronger release confidence and measurable quality outcomes.',
    image: '/images/project3.jpg',
    technologies: ['Playwright', 'TypeScript', 'CI Pipelines', 'Jenkins', 'Test Reliability'],
    date: 'Cisco - 2026',
    details:
      'Expanded automation coverage from 100 to 200+ test cases and increased effective coverage to 95%. Added headed-mode validation loops to detect UI/backend mismatches early and confirm pipeline readiness before team sign-off. This reduced release risk and made regression verification more predictable.',
  },
];

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-[#0B1020] dark:text-white">
        Project not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-800 dark:text-white py-20 pt-32">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 dark:text-white">{project.title}</h1>
        <p className="text-xl text-gray-600 text-center mb-4 dark:text-gray-300">{project.subtitle}</p>
        {project.date && <p className="text-lg text-gray-500 text-center mb-12 dark:text-gray-400">{project.date}</p>}

        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <img src={project.image} alt={project.title} className="w-full h-auto rounded-lg shadow-lg" />
          </div>

          <div className="md:w-1/2 text-gray-700 dark:text-gray-300">
            <h3 className="text-2xl font-semibold mb-4 dark:text-white">Description</h3>
            <p className="mb-6">{project.description}</p>

            <h3 className="text-2xl font-semibold mb-4 dark:text-white">More Details</h3>
            <div className="mb-6 whitespace-pre-line">{project.details}</div>

            <h3 className="text-2xl font-semibold mb-4 dark:text-white">Technologies</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-700 dark:bg-[#121A2B] dark:text-gray-200 border border-gray-200/50 dark:border-[#22314f]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  GitHub
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
