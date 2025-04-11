import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ChevronRight, Leaf, Code, GraduationCap, Heart, Users, Briefcase, Globe, ExternalLink } from 'lucide-react';
import { getTrendingOpportunities, Opportunity } from '../api/opportunities';
import { useNavigate } from 'react-router-dom';

interface CategoryCount {
  name: string;
  count: number;
  trend: number;
}

const categories = [
  { name: 'Technology', color: 'bg-blue-500', icon: <Code className="w-5 h-5" /> },
  { name: 'Education', color: 'bg-yellow-500', icon: <GraduationCap className="w-5 h-5" /> },
  { name: 'Healthcare', color: 'bg-pink-500', icon: <Heart className="w-5 h-5" /> },
  { name: 'Social', color: 'bg-purple-500', icon: <Users className="w-5 h-5" /> },
  { name: 'Environment', color: 'bg-green-500', icon: <Leaf className="w-5 h-5" /> },
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

// Add a function to generate fallback logo
const generateFallbackLogo = (organization: string) => {
  const letter = organization.charAt(0).toUpperCase();
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="${color}"/><text x="20" y="20" text-anchor="middle" dy="7" fill="white" font-family="Arial" font-size="20">${letter}</text></svg>`;
};

export default function Trending() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingOpps = async () => {
      try {
        const opps = await getTrendingOpportunities();
        setOpportunities(opps);
        setLoading(false);
      } catch (err) {
        setError('Failed to load opportunities. Please try again later.');
        setLoading(false);
      }
    };

    fetchTrendingOpps();
  }, []);

  const handleOpportunityClick = (opp: Opportunity) => {
    // Navigate to the opportunity detail page
    navigate(`/opportunity/${opp.id}`);
  };

  const handleCategoryClick = (category: string) => {
    // Navigate to category opportunities page with the exact category name
    navigate(`/category?category=${category}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
            Popular Opportunities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Discover trending opportunities from top organizations and open source projects
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
              onClick={() => handleCategoryClick(category.name)}
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

        {/* Trending Opportunities */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {opportunities.map((opp) => (
            <motion.div
              key={opp.id}
              variants={item}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleOpportunityClick(opp)}
              className="glass p-6 rounded-xl cursor-pointer hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={opp.logo || generateFallbackLogo(opp.organization)}
                    alt={`${opp.organization} logo`} 
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Prevent infinite loop
                      target.src = generateFallbackLogo(opp.organization);
                    }}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {opp.title}
                    </h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {opp.organization}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                {opp.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {opp.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    opp.type === 'Open Source' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                    opp.type === 'Internship' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                    'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                  }`}>
                    {opp.type}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {opp.deadline}
                  </span>
                </div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="text-primary-500 dark:text-primary-400 inline-flex items-center gap-1 text-sm font-medium"
                >
                  Apply Now
                  <ExternalLink className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 