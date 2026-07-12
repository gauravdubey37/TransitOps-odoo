import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  module?: string;
  action?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  module,
  action = 'View',
}) => {
  const { isAuthenticated, hasPermission, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Segment user flows: Drivers only see driver portal, non-drivers only see manager console
  if (user?.role === 'Driver' && !location.pathname.startsWith('/driver')) {
    return <Navigate to="/driver/trips" replace />;
  }

  if (user?.role !== 'Driver' && location.pathname.startsWith('/driver')) {
    return <Navigate to="/dashboard" replace />;
  }

  if (module && !hasPermission(module, action)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
