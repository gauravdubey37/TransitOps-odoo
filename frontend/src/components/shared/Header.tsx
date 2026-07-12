import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Bell, Sun, Moon, LogOut, User as UserIcon, Search, Check } from 'lucide-react';
import { api } from '../../lib/api';
import { Notification } from '../../types';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await api.get<Notification[]>('/notifications');
        setNotifications(data);
      } catch (err) {
        console.error('Failed to fetch notifications', err);
      }
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = async () => {
    try {
      const unread = notifications.filter(n => !n.read);
      await Promise.all(unread.map(n => api.patch(`/notifications/${n.id}`, { read: true })));
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-card px-6 shadow-sm">
      {/* Brand Search */}
      <div className="relative w-64 md:w-96">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
          <Search className="h-4 w-4" />
        </span>
        <input
          type="search"
          placeholder="Global search (Ctrl + K)..."
          className="w-full rounded-md border border-border bg-background py-1.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Quick Controls */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'Dark' ? 'Light' : 'Dark')}
          className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          title="Toggle Theme"
        >
          {theme === 'Dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg border border-border bg-card p-2 shadow-lg ring-1 ring-black/5">
              <div className="flex items-center justify-between border-b border-border pb-2 px-3">
                <span className="text-xs font-semibold">Notifications</span>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-[10px] text-primary hover:underline flex items-center gap-1">
                    <Check className="h-3 w-3" /> Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-60 overflow-y-auto pt-2 space-y-1">
                {notifications.length === 0 ? (
                  <div className="py-4 text-center text-xs text-muted-foreground">No alerts</div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className={`p-2 rounded text-xs transition-colors ${n.read ? 'opacity-65' : 'bg-muted/50 font-medium'}`}>
                      <div className="flex justify-between">
                        <span className={`font-semibold ${n.severity === 'Critical' ? 'text-destructive' : n.severity === 'Warning' ? 'text-warning' : 'text-info'}`}>
                          {n.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-0.5">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center space-x-2 rounded-md p-1.5 hover:bg-muted text-left"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
              {user?.name.charAt(0)}
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-medium">{user?.name}</p>
              <p className="text-[10px] text-muted-foreground">{user?.role}</p>
            </div>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card p-1 shadow-lg ring-1 ring-black/5">
              <div className="px-3 py-2 border-b border-border">
                <p className="text-xs font-semibold">{user?.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="flex w-full items-center px-3 py-2 text-xs text-destructive hover:bg-muted rounded"
              >
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
