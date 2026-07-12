import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('arjun.sharma@transitops.com');
  const [role, setRole] = useState('Administrator');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const success = await login(email, role);
      if (success) {
        if (role === 'Driver') {
          navigate('/driver/trips');
        } else {
          navigate(from, { replace: true });
        }
      } else {
        setError('Login failed. Please check your network or try again.');
      }
    } catch {
      setError('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-xs text-destructive font-medium">
          {error}
        </div>
      )}
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="relative block w-full rounded-t-md border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="role-select" className="sr-only">Select Role</label>
          <select
            id="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="relative block w-full rounded-b-md border border-border bg-background px-3 py-2 text-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
          >
            <option value="Administrator">Administrator (Arjun)</option>
            <option value="Dispatcher">Dispatcher (Priya)</option>
            <option value="Fleet Manager">Fleet Manager (Rajesh)</option>
            <option value="Driver">Driver (Vikram)</option>
          </select>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="group relative flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/95 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
};
