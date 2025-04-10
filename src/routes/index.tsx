import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Home from '../pages/Home';
import Chatbot from '../pages/Chatbot';
import Trending from '../pages/Trending';
import New from '../pages/New';
import AdminPanel from '../pages/AdminPanel';
import OpportunityDetail from '../pages/OpportunityDetail';
import Layout from '../components/Layout';

// Protected route wrapper
const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && user.email !== import.meta.env.VITE_ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'chat',
        element: (
          <ProtectedRoute>
            <Chatbot />
          </ProtectedRoute>
        ),
      },
      {
        path: 'trending',
        element: <Trending />,
      },
      {
        path: 'new',
        element: <New />,
      },
      {
        path: 'opportunity/:id',
        element: <OpportunityDetail />,
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute adminOnly>
            <AdminPanel />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
} 