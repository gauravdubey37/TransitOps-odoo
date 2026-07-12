import React from 'react';
import { Outlet } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-border bg-card p-8 shadow-md">
        <div className="flex flex-col items-center">
          <ShieldCheck className="h-12 w-12 text-primary" />
          <h2 className="mt-4 text-center text-3xl font-extrabold tracking-tight text-foreground">
            TransitOps Portal
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Smart Transport Operations Platform
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
