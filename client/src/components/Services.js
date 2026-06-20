import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const certificates = [
  {
    id: 'aws',
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    image: '/images/amazon.jpg',
  },
  {
    id: 'sql',
    title: 'SQL with Relational Database',
    issuer: 'IBM',
    image: '/images/sql.jpg',
  },
  {
    id: 'claude-code',
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    image: '/images/ai1.jpg',
  },
  {
    id: 'hackathon-finalist',
    title: 'Rajasthan Police Hackathon 2024',
    issuer: 'Finalist Recognition',
    image: '/images/project1.jpg',
  },
];

const Services = () => {
  return (
    <section id="certificates" className="py-20 bg-[#0B1020] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-blue-500 text-sm tracking-[0.3em] font-mono mb-4">07. CERTIFICATES</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Certifications & Recognition</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Credentials that validate my foundation in cloud, AI tooling, and software engineering delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-[#22314f] bg-[#121A2B]/80"
            >
              <img src={cert.image} alt={cert.title} className="h-44 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-base font-semibold text-white leading-snug">{cert.title}</h3>
                <p className="text-sm text-gray-400 mt-2">{cert.issuer}</p>
                <Link
                  to={`/certificate/${cert.id}`}
                  className="inline-block mt-4 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
