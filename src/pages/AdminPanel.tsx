import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  userId: string;
}

interface Analytics {
  totalUsers: number;
  totalChats: number;
  averageMessagesPerUser: number;
}

export default function AdminPanel() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalUsers: 0,
    totalChats: 0,
    averageMessagesPerUser: 0,
  });
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Check if user is admin
  if (!user || user.email !== import.meta.env.VITE_ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  const tags = [
    'all',
    'computer science',
    'software development',
    'internships',
    'open source',
    'tech',
    'coding',
    'bootcamp',
  ];

  useEffect(() => {
    fetchData();
  }, [selectedTag]);

  const fetchData = async () => {
    try {
      // Fetch messages
      const messagesQuery = query(
        collection(db, 'messages'),
        orderBy('timestamp', 'desc')
      );
      const messagesSnapshot = await getDocs(messagesQuery);
      const messagesData: ChatMessage[] = [];
      const userIds = new Set<string>();

      messagesSnapshot.forEach((doc) => {
        const data = doc.data() as ChatMessage;
        messagesData.push({ ...data, id: doc.id });
        if (data.role === 'user') {
          userIds.add(data.userId);
        }
      });

      // Filter messages by tag if selected
      const filteredMessages = selectedTag === 'all'
        ? messagesData
        : messagesData.filter(msg => msg.content.toLowerCase().includes(selectedTag));

      setMessages(filteredMessages);

      // Calculate analytics
      setAnalytics({
        totalUsers: userIds.size,
        totalChats: messagesData.filter(msg => msg.role === 'user').length,
        averageMessagesPerUser: userIds.size
          ? Math.round((messagesData.filter(msg => msg.role === 'user').length / userIds.size) * 10) / 10
          : 0,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-dark-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {/* Analytics cards */}
        <div className="bg-dark-800 rounded-lg shadow-xl p-6 border border-dark-700">
          <h3 className="text-lg font-medium text-gray-300">Total Users</h3>
          <p className="mt-2 text-3xl font-bold text-primary-400">{analytics.totalUsers}</p>
        </div>
        <div className="bg-dark-800 rounded-lg shadow-xl p-6 border border-dark-700">
          <h3 className="text-lg font-medium text-gray-300">Total Chats</h3>
          <p className="mt-2 text-3xl font-bold text-primary-400">{analytics.totalChats}</p>
        </div>
        <div className="bg-dark-800 rounded-lg shadow-xl p-6 border border-dark-700">
          <h3 className="text-lg font-medium text-gray-300">Avg. Messages/User</h3>
          <p className="mt-2 text-3xl font-bold text-primary-400">{analytics.averageMessagesPerUser}</p>
        </div>
      </motion.div>

      {/* Tag filters */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-300 mb-4">Filter by Topic</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedTag === tag
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Chat history */}
      <div className="bg-dark-800 rounded-lg shadow-xl border border-dark-700">
        <div className="px-4 py-5 sm:px-6 border-b border-dark-700">
          <h3 className="text-lg font-medium text-gray-300">Chat History</h3>
        </div>
        <div>
          <ul role="list" className="divide-y divide-dark-700">
            {messages.map((message) => (
              <motion.li
                key={message.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 py-5 sm:px-6"
              >
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-300">
                        {message.role === 'user' ? 'User' : 'Assistant'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-400">{message.content}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 