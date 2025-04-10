import React from 'react';
import { motion } from 'framer-motion';
import meImage from '../assets/me.png';
// import <Home className="tsx"></Home>
import { 
  Sparkles, 
  Users, 
  Target, 
  Rocket,
  Globe,
  Heart,
  MessageSquare,
  Shield,
  Zap
} from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'AI-Powered Matching',
    description: 'Our intelligent system matches you with opportunities that align perfectly with your skills and interests.'
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Global Reach',
    description: 'Access opportunities from around the world, breaking down geographical barriers to growth.'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Real-time Updates',
    description: 'Stay informed with instant notifications about new opportunities and application deadlines.'
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'AI Assistant',
    description: 'Get personalized guidance and answers to your questions from our intelligent chatbot.'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Verified Opportunities',
    description: 'All opportunities are carefully vetted to ensure legitimacy and quality.'
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Community Driven',
    description: 'Join a supportive community of like-minded individuals pursuing their dreams.'
  }
];

const teamMembers = [
  {
    name: 'Ankit Sharma',
    role: 'Founder & CEO',
    image: meImage,
    description: 'Tech lead with a passion for creating equal opportunities in tech.'
  }
  // more to be added here :
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-primary-500 dark:text-primary-400 mb-4"
          >
            <Target className="w-6 h-6" />
            <span className="text-lg font-semibold">Our Mission</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500"
          >
            Empowering Your Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            OppGenie is dedicated to democratizing access to opportunities, connecting talented individuals with meaningful projects, internships, and jobs worldwide.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={item}
              whileHover={{ scale: 1.02 }}
              className="glass p-6 rounded-xl"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-500/10 dark:bg-primary-400/10 flex items-center justify-center text-primary-500 dark:text-primary-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-primary-500 dark:text-primary-400 mb-4"
            >
              <Users className="w-6 h-6" />
              <span className="text-lg font-semibold">Our Team</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Meet the Visionaries
            </motion.h2>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={item}
                whileHover={{ scale: 1.02 }}
                className="glass p-6 rounded-xl text-center"
              >
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-500 dark:text-primary-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 text-primary-500 dark:text-primary-400 mb-4">
            <Rocket className="w-6 h-6" />
            <span className="text-lg font-semibold">Get Started</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Join OppGenie today and unlock a world of opportunities tailored just for you.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
} 