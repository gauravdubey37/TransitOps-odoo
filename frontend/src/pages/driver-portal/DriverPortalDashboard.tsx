import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Driver } from '../../types';
import { Award, Star, Compass, AlertCircle } from 'lucide-react';

export const DriverPortalDashboard: React.FC = () => {
  const { user } = useAuth();

  const { data: drivers = [] } = useQuery<Driver[]>({
    queryKey: ['drivers'],
    queryFn: () => api.get<Driver[]>('/drivers'),
  });

  const currentDriver = drivers.find(d => d.name === user?.name);

  return (
    <div className="space-y-4">
      {/* Driver card */}
      <div className="rounded-xl bg-gradient-to-br from-primary to-primary/80 p-5 text-primary-foreground shadow-md">
        <div className="flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white font-bold text-lg">
            {user?.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-bold text-base">{user?.name}</h2>
            <p className="text-[10px] opacity-80">License: {currentDriver?.licenseNumber || 'N/A'}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/20 pt-4 text-center">
          <div>
            <p className="text-[10px] opacity-80">Rating</p>
            <div className="flex items-center justify-center font-bold text-xs mt-0.5">
              <Star className="h-3 w-3 fill-yellow-300 text-yellow-300 mr-0.5" />
              {currentDriver?.rating || '5.0'}
            </div>
          </div>
          <div>
            <p className="text-[10px] opacity-80">Trips</p>
            <p className="font-bold text-xs mt-0.5">{currentDriver?.completedTrips || 0}</p>
          </div>
          <div>
            <p className="text-[10px] opacity-80">Safety Index</p>
            <p className="font-bold text-xs mt-0.5">{currentDriver?.safetyScore || 100}%</p>
          </div>
        </div>
      </div>

      {/* Fatigue Warning Alert */}
      {currentDriver && currentDriver.fatigueScore > 60 && (
        <div className="rounded-lg border border-warning/20 bg-warning/10 p-3 text-warning flex gap-2 text-xs">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <h4 className="font-bold">Fatigue Advisory</h4>
            <p className="text-[10px] mt-0.5 leading-relaxed">
              Your calculated fatigue score is {currentDriver.fatigueScore}%. Consider parking at the next depot for a break.
            </p>
          </div>
        </div>
      )}

      {/* Roster actions checklist */}
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm text-xs space-y-3">
        <h3 className="font-bold text-foreground">Pre-Trip Checklist</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-muted-foreground">
            <input type="checkbox" className="rounded text-primary border-border focus:ring-primary" />
            <span>Inspect vehicle tires & fluid levels</span>
          </label>
          <label className="flex items-center space-x-2 text-muted-foreground">
            <input type="checkbox" className="rounded text-primary border-border focus:ring-primary" />
            <span>Verify assigned trip paperwork / waybills</span>
          </label>
          <label className="flex items-center space-x-2 text-muted-foreground">
            <input type="checkbox" className="rounded text-primary border-border focus:ring-primary" />
            <span>Connect voice assistant earpiece</span>
          </label>
        </div>
      </div>
    </div>
  );
};
export default DriverPortalDashboard;
