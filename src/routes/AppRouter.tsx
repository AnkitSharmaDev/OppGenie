import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Chatbot from '../pages/Chatbot';
import Trending from '../pages/Trending';
import New from '../pages/New';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import OpportunityDetail from '../pages/OpportunityDetail';
import CategoryOpportunities from '../pages/CategoryOpportunities';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/category" element={<CategoryOpportunities />} />
          <Route path="/new" element={<ProtectedRoute><New /></ProtectedRoute>} />
          <Route path="/opportunity/:id" element={<OpportunityDetail />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
} 