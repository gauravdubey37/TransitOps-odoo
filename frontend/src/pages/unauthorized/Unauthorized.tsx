import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export const Unauthorized: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <ShieldAlert className="h-16 w-16 text-destructive mb-4 animate-pulse" />
      <h1 className="text-3xl font-extrabold tracking-tight">Access Denied</h1>
      <p className="mt-2 text-sm text-muted-foreground max-w-md">
        You do not have the required permissions to view this module. Please contact your administrator if you believe this is an error.
      </p>
      <div className="mt-6">
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/95 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};
