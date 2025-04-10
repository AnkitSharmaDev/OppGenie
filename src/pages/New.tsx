import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Building2, ExternalLink, Briefcase, GraduationCap, Heart, Users } from 'lucide-react';

interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: 'internship' | 'volunteer' | 'job' | 'research';
  location: string;
  posted: string;
  deadline: string;
  description: string;
  tags: string[];
  url: string;
}

const typeIcons = {
  internship: <Briefcase className="w-5 h-5" />,
  volunteer: <Heart className="w-5 h-5" />,
  job: <Building2 className="w-5 h-5" />,
  research: <GraduationCap className="w-5 h-5" />,
};

const typeColors = {
  internship: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  volunteer: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  job: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  research: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};

const opportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Youth Coding Mentor',
    organization: 'Code for Change',
    type: 'volunteer',
    location: 'Remote',
    posted: '2024-03-15',
    deadline: '2024-04-15',
    description: 'Help teach coding to underprivileged youth. Looking for passionate mentors with basic programming knowledge.',
    tags: ['education', 'programming', 'mentorship'],
    url: '#',
  },
  {
    id: '2',
    title: 'Climate Research Intern',
    organization: 'GreenEarth Institute',
    type: 'internship',
    location: 'New York, NY',
    posted: '2024-03-14',
    deadline: '2024-04-01',
    description: 'Join our research team studying climate change impacts. Perfect for environmental science students.',
    tags: ['climate', 'research', 'science'],
    url: '#',
  },
  {
    id: '3',
    title: 'Digital Marketing Associate',
    organization: 'TechStart',
    type: 'job',
    location: 'San Francisco, CA',
    posted: '2024-03-13',
    deadline: '2024-03-31',
    description: 'Entry-level position for creative minds interested in digital marketing and growth hacking.',
    tags: ['marketing', 'social-media', 'growth'],
    url: '#',
  },
  {
    id: '4',
    title: 'AI Research Assistant',
    organization: 'Future Labs',
    type: 'research',
    location: 'Boston, MA',
    posted: '2024-03-12',
    deadline: '2024-04-10',
    description: 'Assist in cutting-edge AI research projects. Strong mathematics and programming skills required.',
    tags: ['AI', 'machine-learning', 'research'],
    url: '#',
  },
  {
    id: '5',
    title: 'Community Outreach Coordinator',
    organization: 'Youth Empowerment',
    type: 'volunteer',
    location: 'Chicago, IL',
    posted: '2024-03-11',
    deadline: '2024-03-25',
    description: 'Coordinate youth empowerment programs in local communities. Strong communication skills needed.',
    tags: ['community', 'leadership', 'youth'],
    url: '#',
  },
];

export default function New() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesType = selectedType ? opp.type === selectedType : true;
    const matchesSearch = searchTerm
      ? opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      : true;
    return matchesType && matchesSearch;
  });

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
            className="text-gray-600 dark:text-gray-300"
          >
            Discover fresh opportunities updated daily
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between"
        >
          <div className="flex flex-wrap gap-2">
            {Object.entries(typeIcons).map(([type, icon]) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedType(selectedType === type ? null : type)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  selectedType === type
                    ? typeColors[type as keyof typeof typeColors]
                    : 'bg-gray-100 text-gray-700 dark:bg-dark-700 dark:text-gray-300'
                }`}
              >
                {icon}
                <span className="capitalize">{type}</span>
              </motion.button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search opportunities..."
              className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-700 bg-white/50 dark:bg-dark-800/50 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredOpportunities.map((opportunity) => (
              <motion.div
                key={opportunity.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                className="glass p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {opportunity.title}
                    </h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                      <Building2 className="w-4 h-4 mr-1" />
                      {opportunity.organization}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${typeColors[opportunity.type]}`}>
                    {typeIcons[opportunity.type]}
                    <span className="capitalize">{opportunity.type}</span>
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {opportunity.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {opportunity.location}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {opportunity.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={opportunity.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 transition-colors text-sm"
                >
                  Learn More
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 