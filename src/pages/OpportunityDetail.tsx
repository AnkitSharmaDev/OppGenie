import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, ArrowLeft } from 'lucide-react';
import { fetchAllOpportunities } from '../api/opportunities';
import { generateFallbackLogo } from '../utils/logo';
import { Spin } from 'antd';

interface Opportunity {
  id: string;
  title: string;
  organization: string;
  description: string;
  eligibility: string;
  deadline: string;
  location?: string;
  link: string;
  logo?: string;
  tags?: string[];
}

export default function OpportunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const opportunities = await fetchAllOpportunities();
        const found = opportunities.find(opp => opp.id === id);
        if (found) {
          setOpportunity(found);
        } else {
          setError('Opportunity not found');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load opportunity details');
        setLoading(false);
      }
    };

    fetchOpportunity();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate('/new')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Back to Opportunities
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.button
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate('/new')}
          className="mb-8 flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Opportunities
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <img
                src={opportunity.logo || generateFallbackLogo(opportunity.organization)}
                alt={`${opportunity.organization} logo`}
                className="w-16 h-16 rounded-full object-cover bg-gray-100"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = generateFallbackLogo(opportunity.organization);
                }}
                loading="lazy"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {opportunity.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {opportunity.organization}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar className="w-5 h-5" />
              <span>{opportunity.deadline}</span>
            </div>
            {opportunity.location && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>{opportunity.location}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Description
            </h2>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
              {opportunity.description}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Eligibility
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {opportunity.eligibility}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {opportunity.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={opportunity.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Apply Now
            <ExternalLink className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
} 