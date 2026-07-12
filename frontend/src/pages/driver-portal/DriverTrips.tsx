import React from 'react';

export const DriverTrips: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Active Trips</h1>
        <p className="text-xs text-muted-foreground">Log fuel, expenses, and track routes on assigned trips.</p>
      </div>
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <p className="text-xs text-muted-foreground">Active trip maps and task checklists will go here.</p>
      </div>
    </div>
  );
};
