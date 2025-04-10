import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { ThemeProvider } from './providers/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import New from './pages/New';
import Trending from './pages/Trending';
import Login from './pages/Login';
import Register from './pages/Register';
import Chatbot from './pages/Chatbot';
import About from './pages/About';
import AdminPanel from './pages/AdminPanel';
import Settings from './pages/Settings';
import Footer from './components/Footer';
import { motion } from 'framer-motion';

function Navigation() {
  const { user, signOut } = useAuth();
  const isAdmin = user?.email === import.meta.env.VITE_ADMIN_EMAIL;
  
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-dark-900/80 border-b border-gray-200 dark:border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <motion.span 
                className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                OppGenie
              </motion.span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400"
              >
                Home
              </Link>
              {user && (
                <>
                  <Link
                    to="/chat"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400"
                  >
                    Chat
                  </Link>
                  <Link
                    to="/settings"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400"
                  >
                    Settings
                  </Link>
                </>
              )}
              <Link
                to="/new"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400"
              >
                New
              </Link>
              <Link
                to="/trending"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400"
              >
                Trending
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400"
              >
                About
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
            {user ? (
              <button
                onClick={() => signOut()}
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Sign Out
              </button>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-transparent hover:bg-primary-50 dark:hover:bg-dark-800"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-dark-900 dark:bg-dark-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
    </div>
  );
}

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-dark-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/chat" 
              element={
                <ProtectedRoute>
                  <Chatbot />
                </ProtectedRoute>
              } 
            />
            <Route path="/new" element={<New />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App; 