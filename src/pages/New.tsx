import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, MapPin, ExternalLink, Filter } from 'lucide-react';
import { fetchAllOpportunities, Opportunity } from '../api/opportunities';
import { useNavigate } from 'react-router-dom';
import { generateFallbackLogo } from '../utils/logo';

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

const opportunityTypes = ['All Types', 'Internship', 'Volunteer', 'Job', 'Research', 'Fellowship'];

export default function New() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOpps = async () => {
      try {
        const opps = await fetchAllOpportunities();
        // Filter out opportunities older than a month and sort by deadline
        const currentDate = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(currentDate.getMonth() - 1);

        const currentOpps = opps.filter(opp => {
          if (opp.deadline === 'Rolling Applications' || opp.deadline === 'Ongoing') return true;
          const deadlineDate = new Date(opp.deadline);
          return deadlineDate >= oneMonthAgo;
        });

        const sortedOpps = currentOpps.sort((a, b) => {
          if (a.deadline === 'Rolling Applications' || a.deadline === 'Ongoing') return -1;
          if (b.deadline === 'Rolling Applications' || b.deadline === 'Ongoing') return 1;
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        });
        
        setOpportunities(sortedOpps);
        setFilteredOpportunities(sortedOpps);
        setLoading(false);
      } catch (err) {
        setError('Failed to load opportunities. Please try again later.');
        setLoading(false);
      }
    };

    fetchOpps();
  }, []);

  useEffect(() => {
    const filtered = opportunities.filter(opp => {
      const matchesSearch = searchTerm === '' || 
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === 'All Types' || opp.type === selectedType;
      
      return matchesSearch && matchesType;
    });
    setFilteredOpportunities(filtered);
  }, [searchTerm, selectedType, opportunities]);

  const handleOpportunityClick = (opp: Opportunity) => {
    navigate(`/opportunity/${opp.id}`);
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
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Latest Opportunities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Discover fresh opportunities updated daily
          </motion.p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {opportunityTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedType === type
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Opportunities Grid */}
        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No opportunities found matching your criteria.
            </p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredOpportunities.map((opp) => (
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
                        target.onerror = null;
                        target.src = generateFallbackLogo(opp.organization);
                      }}
                      loading="lazy"
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
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/opportunity/${opp.id}`);
                    }}
                  >
                    Learn More
                    <ExternalLink className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
} 