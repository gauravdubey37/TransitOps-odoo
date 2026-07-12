import React from 'react';

export const TripList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trip Management</h1>
        <p className="text-sm text-muted-foreground">Schedule trips, monitor dispatch lifecycle, and track routes.</p>
      </div>
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Trips scheduler and status table will go here.</p>
      </div>
    </div>
  );
};
