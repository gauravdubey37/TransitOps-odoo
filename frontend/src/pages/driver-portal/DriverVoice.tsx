import React from 'react';

export const DriverVoice: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Voice Assistant</h1>
        <p className="text-xs text-muted-foreground">Log fuel, tolls, or trip status updates hands-free.</p>
      </div>
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <p className="text-xs text-muted-foreground">Voice waveforms and transcripts will go here.</p>
      </div>
    </div>
  );
};
