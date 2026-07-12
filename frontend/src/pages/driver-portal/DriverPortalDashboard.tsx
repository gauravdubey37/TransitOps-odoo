import React from 'react';

export const DriverPortalDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Driver Profile</h1>
        <p className="text-xs text-muted-foreground">Manage details, credentials, and check-in statuses.</p>
      </div>
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <p className="text-xs text-muted-foreground font-semibold">Your profiles and ratings details will go here.</p>
      </div>
    </div>
  );
};
