import React, { createContext, useContext, useState } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (module: string, action: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('transitops-user');
    return saved ? JSON.parse(saved) : null;
  });

  const isAuthenticated = !!user;

  const login = async (email: string, role: string): Promise<boolean> => {
    try {
      // Mock login request calling our local API to find the user or create a session
      const response = await fetch(`http://localhost:5000/users?email=${encodeURIComponent(email)}`);
      const users: User[] = await response.json();
      
      let matchedUser: User;
      if (users.length > 0) {
        matchedUser = users[0];
      } else {
        // Create a mock user if not found
        matchedUser = {
          id: `usr-${Math.random().toString(36).substr(2, 9)}`,
          name: email.split('@')[0].replace('.', ' '),
          email,
          phone: '+91 99999 88888',
          department: role === 'Driver' ? 'Operations' : 'Fleet',
          role: role as User['role'],
          status: 'Active',
          lastLogin: new Date().toISOString()
        };
      }

      localStorage.setItem('transitops-user', JSON.stringify(matchedUser));
      setUser(matchedUser);
      return true;
    } catch (e) {
      console.error('Login error', e);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('transitops-user');
    setUser(null);
  };

  const hasPermission = (module: string, action: string): boolean => {
    if (!user) return false;
    if (user.role === 'Administrator') return true;

    // Direct mapping rules based on our Design System / Business Rules
    if (module === 'Settings') {
      return false; // Administrator is handled above; other roles cannot view settings
    }
    
    if (module === 'Drivers' || module === 'Vehicles') {
      return ['Administrator', 'Fleet Manager', 'Operations Manager'].includes(user.role);
    }

    if (module === 'Trips') {
      if (action === 'Create' || action === 'Update') {
        return ['Administrator', 'Dispatcher', 'Operations Manager'].includes(user.role);
      }
      return true; // All roles can view trips (drivers only view their own)
    }

    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
