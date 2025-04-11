import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, MapPin, Users, Tag } from 'lucide-react';
import { fetchAllOpportunities, Opportunity } from '../api/opportunities';

// Add a function to generate fallback logo
const generateFallbackLogo = (organization: string) => {
  const letter = organization.charAt(0).toUpperCase();
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="${color}"/><text x="20" y="20" text-anchor="middle" dy="7" fill="white" font-family="Arial" font-size="20">${letter}</text></svg>`;
};

export default function OpportunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const allOpps = await fetchAllOpportunities();
        const opp = allOpps.find(o => o.id === id);
        if (opp) {
          setOpportunity(opp);
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

  const handleApply = () => {
    if (opportunity?.link) {
      window.open(opportunity.link, '_blank', 'noopener noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Opportunities
        </button>

        {/* Header */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-8 shadow-lg mb-8">
          <div className="flex items-start gap-6">
            <img
              src={opportunity.logo || generateFallbackLogo(opportunity.organization)}
              alt={`${opportunity.organization} logo`}
              className="w-20 h-20 rounded-lg object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = generateFallbackLogo(opportunity.organization);
              }}
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {opportunity.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                {opportunity.organization}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Deadline: {opportunity.deadline}</span>
                </div>
                {opportunity.location && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{opportunity.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{opportunity.type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-dark-800 rounded-xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                About this Opportunity
              </h2>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line mb-6">
                {opportunity.description}
              </p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Eligibility
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {opportunity.eligibility}
              </p>

              {opportunity.tags && opportunity.tags.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Skills & Tags
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {opportunity.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 rounded-full"
                      >
                        <Tag className="w-4 h-4" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column - Apply */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-dark-800 rounded-xl p-8 shadow-lg sticky top-8">
              <button
                onClick={handleApply}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg mb-4 flex items-center justify-center gap-2"
              >
                Apply Now
                <ExternalLink className="w-4 h-4" />
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                You will be redirected to the official application page
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 