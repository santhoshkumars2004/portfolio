import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      setStatus({ type: 'success', message: response.data.message });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Something went wrong. Please try again.'
      });
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-textPrimary mb-8">Get In Touch</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-textPrimary mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <FaEnvelope className="text-secondary text-xl" />
                  <div>
                    <h3 className="text-textPrimary font-semibold">Email</h3>
                    <a
                      href="mailto:santhoshkumar.btech1@gmail.com"
                      className="text-textSecondary hover:text-secondary transition-colors duration-300"
                    >
                      santhoshkumar.btech1@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <FaPhone className="text-secondary text-xl" />
                  <div>
                    <h3 className="text-textPrimary font-semibold">Phone</h3>
                    <a
                      href="tel:+919344705641"
                      className="text-textSecondary hover:text-secondary transition-colors duration-300"
                    >
                      +91 9344705641
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <FaMapMarkerAlt className="text-secondary text-xl" />
                  <div>
                    <h3 className="text-textPrimary font-semibold">Location</h3>
                    <p className="text-textSecondary">
                      Madurai, Tamilnadu, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-textPrimary mb-6">Send Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-textPrimary mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-tertiary text-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-textPrimary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-tertiary text-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-textPrimary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 bg-tertiary text-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  ></textarea>
                </div>

                {status.message && (
                  <div
                    className={`p-4 rounded-lg ${
                      status.type === 'success'
                        ? 'bg-green-500/20 text-green-500'
                        : status.type === 'error'
                        ? 'bg-red-500/20 text-red-500'
                        : 'bg-blue-500/20 text-blue-500'
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-secondary text-primary font-semibold rounded-lg hover:bg-opacity-90 transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact; 