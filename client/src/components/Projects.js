import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useStaggerAnimation } from '../hooks/useScrollAnimation';

const projects = [
  {
    id: 'ai-powered-legal-query-system',
    title: 'AI-Powered Legal Query System',
    subtitle: 'Python, Django, AWS',
    summary:
      'Built a secure web platform that maps crime descriptions to relevant legal sections and reduces manual legal lookup effort.',
    metrics: ['Jan 2024 - Feb 2024', 'OCR + NLP', 'Law Enforcement Use Case'],
    image: '/images/project1.jpg',
  },
  {
    id: 'psb-security-compliance-pipeline',
    title: 'PSB Security Compliance Pipeline',
    subtitle: 'Python, LLMs, MCP Servers',
    summary:
      'Shipped a production-grade AI compliance workflow that scans large codebases and converts validated findings into actionable engineering tickets.',
    metrics: ['168k files scanned', '2 years -> < 2 hours', '70% pre-filtered'],
    image: '/images/project2.jpg',
  },
  {
    id: 'cusp-test-automation-scale-up',
    title: 'CUSP Test Automation Scale-up',
    subtitle: 'Playwright, TypeScript, Jenkins',
    summary:
      'Expanded and stabilized test automation coverage for major user flows, improving release confidence and pipeline reliability.',
    metrics: ['100 -> 200+ tests', '95% coverage', 'CI-ready test packs'],
    image: '/images/project3.jpg',
  },
];

const Projects = () => {
  const [containerRef, animatedItems] = useStaggerAnimation(projects, 0.15);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="projects" className="py-20 bg-[#0B1020] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.15),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.12),transparent_45%)]" />

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={animatedItems.length > 0 ? 'visible' : 'hidden'}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div variants={cardVariants} className="text-center mb-12">
          <p className="text-blue-500 text-sm tracking-[0.3em] font-mono mb-4">04. PROJECTS</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Proof Of Execution</h2>
          <p className="max-w-2xl mx-auto text-gray-400 mt-4">
            A curated project stack that demonstrates practical AI engineering and measurable delivery.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-6">
          {projects.map((project, index) => {
            const featured = index === 0;

            return (
              <motion.article
                key={project.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className={`${featured ? 'lg:col-span-6' : 'lg:col-span-3'} rounded-2xl border border-[#22314f] bg-[#121A2B]/85 overflow-hidden`}
              >
                {featured ? (
                  <div className="grid grid-cols-1 md:grid-cols-12">
                    <img src={project.image} alt={project.title} className="md:col-span-5 h-64 md:h-full w-full object-cover" />
                    <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-center">
                      <p className="text-xs tracking-[0.2em] text-blue-400 uppercase">{project.subtitle}</p>
                      <h3 className="text-2xl md:text-3xl font-semibold text-white mt-2">{project.title}</h3>
                      <p className="text-sm md:text-base text-gray-300 mt-4 leading-relaxed">{project.summary}</p>

                      <div className="flex flex-wrap gap-2 mt-5">
                        {project.metrics.map((metric) => (
                          <span key={metric} className="text-xs px-3 py-1 rounded-full border border-[#33538a] text-blue-100 bg-blue-500/10">
                            {metric}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/projects/${project.id}`}
                        className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
                      >
                        View Case Study
                        <FaArrowRight className="text-xs" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <img src={project.image} alt={project.title} className="h-52 w-full object-cover" />
                    <div className="p-5">
                      <p className="text-xs tracking-[0.2em] text-blue-400 uppercase">{project.subtitle}</p>
                      <h3 className="text-xl font-semibold text-white mt-2">{project.title}</h3>
                      <p className="text-sm text-gray-400 mt-3 leading-relaxed">{project.summary}</p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.metrics.map((metric) => (
                          <span key={metric} className="text-xs px-3 py-1 rounded-full border border-gray-700 text-gray-300">
                            {metric}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/projects/${project.id}`}
                        className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        View Case Study
                        <FaArrowRight className="text-xs" />
                      </Link>
                    </div>
                  </>
                )}
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
