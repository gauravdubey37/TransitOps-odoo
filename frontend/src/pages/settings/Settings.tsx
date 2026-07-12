import React from 'react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-sm text-muted-foreground">Administer company details, user permissions, and voice assistant preferences.</p>
      </div>
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Settings settings forms and logs will go here.</p>
      </div>
    </div>
  );
};
