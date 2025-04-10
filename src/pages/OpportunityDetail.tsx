import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Building2, FileText, Link as LinkIcon, Users, Globe } from 'lucide-react';
import { Opportunity } from '../api/opportunities';

export default function OpportunityDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { opportunity } = location.state as { opportunity: Opportunity };

  if (!opportunity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Opportunity not found</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    window.open(opportunity.link, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Opportunities</span>
        </motion.button>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-2xl"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {opportunity.title}
            </h1>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Building2 className="w-5 h-5" />
                <span>{opportunity.organization}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FileText className="w-5 h-5" />
                <span>{opportunity.type}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-5 h-5" />
                <span>Deadline: {opportunity.deadline}</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {opportunity.description}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Eligibility
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {opportunity.eligibility}
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Globe className="w-5 h-5" />
                  <span>{opportunity.category}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <LinkIcon className="w-5 h-5" />
                  <span>Source: {opportunity.source}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleApply}
                className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Apply Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 