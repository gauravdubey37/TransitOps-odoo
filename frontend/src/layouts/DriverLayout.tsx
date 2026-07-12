import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, MapPin, Mic, User } from 'lucide-react';

export const DriverLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen flex-col bg-background md:max-w-md md:mx-auto md:border-x md:border-border overflow-hidden">
      {/* Top Mobile Header */}
      <header className="flex h-14 w-full items-center justify-between border-b border-border bg-card px-4 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
            {user?.name.charAt(0)}
          </div>
          <div>
            <p className="text-xs font-semibold">{user?.name}</p>
            <p className="text-[10px] text-muted-foreground">Driver Mode</p>
          </div>
        </div>
        <button onClick={() => { logout(); navigate('/login'); }} className="rounded-full p-2 text-destructive hover:bg-muted" title="Log Out">
          <LogOut className="h-4.5 w-4.5" />
        </button>
      </header>

      {/* Main Workspace (Mobile) */}
      <main className="flex-1 overflow-y-auto px-4 py-3 pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 border-t border-border bg-card shadow-lg md:max-w-md md:mx-auto">
        <NavLink
          to="/driver/trips"
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center justify-center text-xs transition-colors ${
              isActive ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          <MapPin className="h-5 w-5 mb-1" />
          <span>My Trips</span>
        </NavLink>
        
        {/* Floating Voice Assistant Trigger */}
        <div className="relative -top-5 flex flex-1 justify-center">
          <button
            onClick={() => navigate('/driver/voice')}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform"
          >
            <Mic className="h-6 w-6" />
          </button>
        </div>

        <NavLink
          to="/driver/portal"
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center justify-center text-xs transition-colors ${
              isActive ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          <User className="h-5 w-5 mb-1" />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};
