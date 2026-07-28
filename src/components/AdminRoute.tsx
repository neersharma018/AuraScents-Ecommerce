import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const AdminRoute: React.FC = () => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-ivory)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--gold)]" />
      </div>
    );
  }

  // If not logged in, redirect to home and trigger login modal (handled in Navbar usually, but here just redirect)
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If logged in but not an admin, redirect to home
  if (role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // User is admin, render the nested admin routes
  return <Outlet />;
};

export default AdminRoute;
