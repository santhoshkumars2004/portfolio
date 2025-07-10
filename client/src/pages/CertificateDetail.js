import React from 'react';
import { useParams, Link } from 'react-router-dom';

const certificates = [
  {
    id: 'java',
    title: 'Java Crash Course',
    subtitle: 'Issued by Udemy',
    image: '/images/java1.jpg',
  },
  {
    id: 'sql',
    title: 'SQL With Relational Database',
    subtitle: 'Issued by IBM',
    image: '/images/sql.jpg',
  },
  {
    id: 'htmlcssjs',
    title: 'Html, Css, Javascript',
    subtitle: 'Issued by Great Learning',
    image: '/images/certificate3.jpg',
  },
  {
    id: 'ai',
    title: 'Learn AI Skill Challenge',
    subtitle: 'Issued by Microsoft',
    image: '/images/ai1.jpg',
  },
  {
    id: 'aws',
    title: 'AWS Cloud Practitioner',
    subtitle: 'Issued by AWS',
    image: '/images/certificate5.jpg',
  },
  {
    id: 'design',
    title: 'Enterprise Design Thinking Practitioner',
    subtitle: 'Issued by IBM',
    image: '/images/design.jpg',
  },
];

const CertificateDetail = () => {
  const { id } = useParams();
  const cert = certificates.find(c => c.id === id);

  if (!cert) {
    return <div className="min-h-screen flex items-center justify-center text-2xl">Certificate not found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-black dark:to-gray-900 py-20 px-4">
      <div className="bg-white dark:bg-black rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8 flex flex-col items-center max-w-xl w-full">
        <img src={cert.image} alt={cert.title} className="w-full h-[500px] object-contain rounded-2xl mb-8 border-b border-gray-100 dark:border-gray-700" />
        <h1 className="text-3xl font-bold mb-2 text-center dark:text-white">{cert.title}</h1>
        <h2 className="text-lg text-gray-500 dark:text-gray-400 mb-6 text-center">{cert.subtitle}</h2>
        <Link to="/" className="mt-4 px-6 py-2 bg-secondary text-white rounded-full font-semibold hover:bg-secondary/80 transition-colors shadow-lg">Back to Home</Link>
      </div>
    </div>
  );
};

export default CertificateDetail; 