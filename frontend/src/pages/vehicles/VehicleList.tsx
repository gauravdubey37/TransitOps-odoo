import React from 'react';

export const VehicleList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Vehicle Management</h1>
        <p className="text-sm text-muted-foreground">Manage and track fleet vehicles, maintenance logs, and health status.</p>
      </div>
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Vehicle table list will go here.</p>
      </div>
    </div>
  );
};
