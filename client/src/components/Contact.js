import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('http://localhost:5050/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Clear status message after 3 seconds
      setTimeout(() => setSubmitStatus(''), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-8 sm:py-12 md:py-16 lg:py-20 text-gray-800 dark:text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12 dark:text-white">Get In Touch</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 rounded-full text-gray-800 border border-gray-300 dark:text-white dark:border-gray-700 flex-shrink-0">
                <FaEnvelope className="text-lg sm:text-xl" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-900 dark:text-white">Email</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">santhoshkumar.btech1@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 rounded-full text-gray-800 border border-gray-300 dark:text-white dark:border-gray-700 flex-shrink-0">
                <FaPhone className="text-lg sm:text-xl" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-900 dark:text-white">Phone</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">+91 9344705641</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 rounded-full text-gray-800 border border-gray-300 dark:text-white dark:border-gray-700 flex-shrink-0">
                <FaMapMarkerAlt className="text-lg sm:text-xl" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-900 dark:text-white">Location</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Madurai, Tamilnadu, India</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-3 sm:p-4 md:p-6 lg:p-8 border border-gray-300/50 rounded-lg dark:border-gray-700 dark:bg-black order-1 lg:order-2 bg-white/80 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1 sm:mb-2 dark:text-gray-300 text-sm sm:text-base">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 dark:bg-black dark:border-gray-600 dark:text-white dark:focus:border-gray-500 text-sm sm:text-base"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1 sm:mb-2 dark:text-gray-300 text-sm sm:text-base">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 dark:bg-black dark:border-gray-600 dark:text-white dark:focus:border-gray-500 text-sm sm:text-base"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-1 sm:mb-2 dark:text-gray-300 text-sm sm:text-base">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 dark:bg-black dark:border-gray-600 dark:text-white dark:focus:border-gray-500 text-sm sm:text-base"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-800 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-700 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="text-green-600 dark:text-green-400 text-sm text-center">
                  Message sent successfully! You'll receive a response soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="text-red-600 dark:text-red-400 text-sm text-center">
                  Failed to send message. Please try again or contact directly via email.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 