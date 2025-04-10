import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';

interface Opportunity {
  id: string;
  name: string;
  category: string;
  description: string;
  organization: string;
  location: string;
  deadline: string;
  requirements: string[];
  link: string;
}

export default function OpportunityDetail() {
  const { id } = useParams<{ id: string }>();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunity = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, 'opportunities', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOpportunity({ id: docSnap.id, ...docSnap.data() } as Opportunity);
        }
      } catch (error) {
        console.error('Error fetching opportunity:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunity();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Opportunity not found</h2>
        <Link to="/trending" className="mt-4 text-primary-600 hover:text-primary-500">
          Back to Trending
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            to="/trending"
            className="text-primary-600 hover:text-primary-500 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Trending
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{opportunity.name}</h1>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                {opportunity.category}
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">About the Opportunity</h2>
                <p className="text-gray-600">{opportunity.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Organization</h2>
                <p className="text-gray-600">{opportunity.organization}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Location</h2>
                  <p className="text-gray-600">{opportunity.location}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Application Deadline</h2>
                  <p className="text-gray-600">{new Date(opportunity.deadline).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Requirements</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {opportunity.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <a
                  href={opportunity.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Apply Now
                  <svg
                    className="ml-2 -mr-1 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 