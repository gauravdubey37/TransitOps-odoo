import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/shared/ProtectedRoute';

// Layouts
import { MainLayout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { DriverLayout } from './layouts/DriverLayout';

// Pages
import { Login } from './pages/auth/Login';
import { Unauthorized } from './pages/unauthorized/Unauthorized';
import { ExecutiveDashboard } from './pages/dashboard/ExecutiveDashboard';
import { DriverList } from './pages/drivers/DriverList';
import { VehicleList } from './pages/vehicles/VehicleList';
import { TripList } from './pages/trips/TripList';
import { SettingsPage } from './pages/settings/Settings';
import { DriverPortalDashboard } from './pages/driver-portal/DriverPortalDashboard';
import { DriverTrips } from './pages/driver-portal/DriverTrips';
import { DriverVoice } from './pages/driver-portal/DriverVoice';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public/Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Manager/Admin Console (Desktop First) */}
              <Route
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<ExecutiveDashboard />} />
                
                <Route
                  path="/drivers"
                  element={
                    <ProtectedRoute module="Drivers">
                      <DriverList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/vehicles"
                  element={
                    <ProtectedRoute module="Vehicles">
                      <VehicleList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/trips"
                  element={
                    <ProtectedRoute module="Trips">
                      <TripList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute module="Settings">
                      <SettingsPage />
                    </ProtectedRoute>
                  }
                />
                
                {/* Fallbacks for non-implemented modules in prototype */}
                <Route path="/fuel" element={<div className="p-6 font-semibold">Fuel Module (Prototype placeholder)</div>} />
                <Route path="/expenses" element={<div className="p-6 font-semibold">Expenses Module (Prototype placeholder)</div>} />
                <Route path="/maintenance" element={<div className="p-6 font-semibold">Maintenance Module (Prototype placeholder)</div>} />
                <Route path="/analytics" element={<div className="p-6 font-semibold">Analytics Module (Prototype placeholder)</div>} />
                <Route path="/reports" element={<div className="p-6 font-semibold">Reports Module (Prototype placeholder)</div>} />
              </Route>

              {/* Driver Mobile Portal */}
              <Route
                path="/driver"
                element={
                  <ProtectedRoute>
                    <DriverLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="portal" element={<DriverPortalDashboard />} />
                <Route path="trips" element={<DriverTrips />} />
                <Route path="voice" element={<DriverVoice />} />
              </Route>

              {/* Wildcard Catchall */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
