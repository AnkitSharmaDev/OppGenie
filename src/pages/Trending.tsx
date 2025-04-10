import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ChevronRight, Leaf, Code, GraduationCap, Heart, Users, Briefcase, Globe, BookOpen } from 'lucide-react';

interface TrendingTag {
  name: string;
  count: number;
  category: string;
  trend: number;
  description: string;
}

const trendingTags: TrendingTag[] = [
  {
    name: 'Climate Action',
    count: 1250,
    category: 'Environment',
    trend: 25,
    description: 'Opportunities focused on environmental conservation and sustainability initiatives.',
  },
  {
    name: 'Tech4Good',
    count: 980,
    category: 'Technology',
    trend: 18,
    description: 'Technology projects with social impact and community benefit.',
  },
  {
    name: 'Education',
    count: 850,
    category: 'Social',
    trend: 15,
    description: 'Teaching, mentoring, and educational program opportunities.',
  },
  {
    name: 'AI Research',
    count: 760,
    category: 'Technology',
    trend: 30,
    description: 'Artificial intelligence and machine learning research positions.',
  },
  {
    name: 'Community Service',
    count: 680,
    category: 'Social',
    trend: 12,
    description: 'Local community support and development initiatives.',
  },
  {
    name: 'Remote Work',
    count: 920,
    category: 'Work',
    trend: 22,
    description: 'Remote and flexible work opportunities across various fields.',
  },
];

const categories = [
  { name: 'Environment', color: 'bg-green-500', icon: <Leaf className="w-5 h-5" /> },
  { name: 'Technology', color: 'bg-blue-500', icon: <Code className="w-5 h-5" /> },
  { name: 'Education', color: 'bg-yellow-500', icon: <BookOpen className="w-5 h-5" /> },
  { name: 'Social', color: 'bg-purple-500', icon: <Users className="w-5 h-5" /> },
  { name: 'Work', color: 'bg-pink-500', icon: <Briefcase className="w-5 h-5" /> },
  { name: 'Global', color: 'bg-indigo-500', icon: <Globe className="w-5 h-5" /> },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Trending() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-primary-500 dark:text-primary-400 mb-4"
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-lg font-semibold">Trending Now</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Popular Opportunity Categories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Discover what's trending in the world of opportunities and stay ahead of the curve
          </motion.p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="glass p-4 rounded-xl text-center cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-lg ${category.color} mx-auto mb-3 flex items-center justify-center text-white`}>
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                {category.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>

        {/* Trending Tags */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {trendingTags.map((tag) => (
            <motion.div
              key={tag.name}
              variants={item}
              whileHover={{ scale: 1.02 }}
              className="glass p-6 rounded-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {tag.name}
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {tag.category}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-green-500">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+{tag.trend}%</span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {tag.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {tag.count.toLocaleString()} opportunities
                </span>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-primary-500 dark:text-primary-400 inline-flex items-center gap-1 text-sm font-medium"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 