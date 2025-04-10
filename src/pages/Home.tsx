import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { Search, Sparkles, Users, Zap } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-900 dark:to-dark-800 animate-gradient-xy opacity-50" />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center space-y-8"
          >
            <motion.h1 
              variants={item}
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white"
            >
              Discover Your Perfect{' '}
              <span className="text-gradient">Opportunity</span>
            </motion.h1>
            
            <motion.p 
              variants={item}
              className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300"
            >
              Connect with meaningful opportunities tailored for Gen Z. From internships to volunteering, 
              find experiences that align with your passions and goals.
            </motion.p>

            <motion.div variants={item} className="flex justify-center gap-4">
              {!user ? (
                <>
                  <Link
                    to="/register"
                    className="px-8 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors font-medium"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/about"
                    className="px-8 py-3 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-dark-800 dark:text-white dark:hover:bg-dark-700 transition-colors font-medium"
                  >
                    Learn More
                  </Link>
                </>
              ) : (
                <Link
                  to="/chat"
                  className="px-8 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors font-medium"
                >
                  Start Exploring
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="glass p-6 rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-dark-800 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Matching</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our intelligent system matches you with opportunities that align perfectly with your interests and skills.
            </p>
          </div>

          <div className="glass p-6 rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-dark-800 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Stay informed with instant notifications about new opportunities and application deadlines.
            </p>
          </div>

          <div className="glass p-6 rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-dark-800 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join a community of like-minded individuals and share experiences and opportunities.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Search Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass p-8 rounded-xl text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start your journey?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Explore thousands of opportunities or let our AI assistant help you find the perfect match.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/new"
              className="px-8 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors font-medium"
            >
              Browse Opportunities
            </Link>
            <Link
              to="/chat"
              className="px-8 py-3 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-dark-800 dark:text-white dark:hover:bg-dark-700 transition-colors font-medium"
            >
              Chat with AI
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 