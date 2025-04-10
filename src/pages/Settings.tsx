import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Moon,
  Sun,
  Globe,
  Shield,
  Mail,
  Save,
  Upload
} from 'lucide-react';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const notificationSettings: NotificationSetting[] = [
  {
    id: 'new_opportunities',
    title: 'New Opportunities',
    description: 'Get notified when new opportunities matching your interests are posted',
    enabled: true,
  },
  {
    id: 'application_updates',
    title: 'Application Updates',
    description: 'Receive updates about your submitted applications',
    enabled: true,
  },
  {
    id: 'deadlines',
    title: 'Deadline Reminders',
    description: 'Get reminded about upcoming application deadlines',
    enabled: true,
  },
  {
    id: 'messages',
    title: 'Messages',
    description: 'Receive notifications for new messages and responses',
    enabled: true,
  }
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

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(notificationSettings);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleNotificationToggle = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id
        ? { ...notification, enabled: !notification.enabled }
        : notification
    ));
  };

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
            <SettingsIcon className="w-6 h-6" />
            <span className="text-lg font-semibold">Settings</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Customize Your Experience
          </motion.h1>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Profile Settings */}
          <motion.div variants={item} className="glass p-6 rounded-xl lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-primary-500 dark:text-primary-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Settings</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 p-1 bg-primary-500 rounded-full text-white hover:bg-primary-600 transition-colors">
                    <Upload className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Profile Photo</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Update your profile picture
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bio
                  </label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    rows={3}
                    placeholder="Tell us about yourself"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preferences */}
          <motion.div variants={item} className="space-y-6">
            {/* Theme Toggle */}
            <div className="glass p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {darkMode ? (
                    <Moon className="w-6 h-6 text-primary-500 dark:text-primary-400" />
                  ) : (
                    <Sun className="w-6 h-6 text-primary-500 dark:text-primary-400" />
                  )}
                  <div>
                    <h2 className="font-semibold text-gray-900 dark:text-white">Theme</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Toggle dark mode
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    darkMode ? 'bg-primary-500' : 'bg-gray-200'
                  }`}
                >
                  <motion.div
                    animate={{ x: darkMode ? 24 : 0 }}
                    className="w-6 h-6 rounded-full bg-white shadow"
                  />
                </button>
              </div>
            </div>

            {/* Language Settings */}
            <div className="glass p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-primary-500 dark:text-primary-400" />
                <h2 className="font-semibold text-gray-900 dark:text-white">Language</h2>
              </div>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            {/* Privacy Settings */}
            <div className="glass p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary-500 dark:text-primary-400" />
                <h2 className="font-semibold text-gray-900 dark:text-white">Privacy</h2>
              </div>
              <div className="space-y-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Make profile public
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Show email address
                  </span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div variants={item} className="glass p-6 rounded-xl lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-primary-500 dark:text-primary-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Notification Preferences
              </h2>
            </div>
            <div className="grid gap-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-dark-800"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {notification.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle(notification.id)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      notification.enabled ? 'bg-primary-500' : 'bg-gray-200'
                    }`}
                  >
                    <motion.div
                      animate={{ x: notification.enabled ? 24 : 0 }}
                      className="w-6 h-6 rounded-full bg-white shadow"
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
} 