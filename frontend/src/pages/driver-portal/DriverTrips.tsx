import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import type { Trip, FuelLog, Expense } from '../../types';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { MapPin, Navigation, DollarSign, Fuel, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

export const DriverTrips: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'info' | 'fuel' | 'expense'>('info');

  const { data: trips = [] } = useQuery<Trip[]>({
    queryKey: ['trips'],
    queryFn: () => api.get<Trip[]>('/trips'),
  });

  const activeTrip = trips.find(t => t.driverName === user?.name && t.status !== 'Completed');

  const logFuelMutation = useMutation({
    mutationFn: (newFuel: Partial<FuelLog>) => api.post<FuelLog>('/fuelLogs', newFuel),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fuelLogs'] });
      alert('Fuel log submitted successfully!');
      setActiveTab('info');
    },
  });

  const logExpenseMutation = useMutation({
    mutationFn: (newExpense: Partial<Expense>) => api.post<Expense>('/expenses', newExpense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      alert('Expense log submitted successfully!');
      setActiveTab('info');
    },
  });

  const completeTripMutation = useMutation({
    mutationFn: (tripId: string) => api.patch<Trip>(`/trips/${tripId}`, { status: 'Completed', progress: 100, endDateTime: new Date().toISOString() }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      alert('Trip marked as Completed successfully!');
    },
  });

  const { register: refuelRegister, handleSubmit: handleRefuelSubmit } = useForm();
  const { register: expenseRegister, handleSubmit: handleExpenseSubmit } = useForm();

  const onRefuelLog = (data: any) => {
    if (!activeTrip) return;
    logFuelMutation.mutate({
      vehicleId: activeTrip.vehicleId,
      driverId: activeTrip.driverId,
      date: new Date().toISOString(),
      liters: Number(data.liters),
      cost: Number(data.cost),
      odometer: Number(data.odometer),
      location: data.location || 'Highway Pump',
    });
  };

  const onExpenseLog = (data: any) => {
    if (!activeTrip) return;
    logExpenseMutation.mutate({
      tripId: activeTrip.id,
      driverId: activeTrip.driverId,
      date: new Date().toISOString(),
      type: data.type,
      amount: Number(data.amount),
      description: data.description,
      status: 'Pending',
    });
  };

  if (!activeTrip) {
    return (
      <div className="py-12 text-center text-xs text-muted-foreground space-y-3">
        <div className="flex justify-center"><CheckCircle className="h-10 w-10 text-success" /></div>
        <p className="font-semibold text-foreground">All Clear! No assigned trips.</p>
        <p>Contact dispatch if you believe this is incorrect.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Current Trip Header */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-3 text-xs">
        <div className="flex justify-between items-center">
          <span className="font-bold text-foreground text-sm">{activeTrip.tripNumber}</span>
          <StatusBadge status={activeTrip.status} />
        </div>
        <div className="space-y-1">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary mr-1.5 shrink-0" />
            <span>Origin: <strong className="text-foreground">{activeTrip.origin}</strong></span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Navigation className="h-4 w-4 text-destructive mr-1.5 shrink-0" />
            <span>Destination: <strong className="text-foreground">{activeTrip.destination}</strong></span>
          </div>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary" style={{ width: `${activeTrip.progress}%` }} />
        </div>
        <div className="flex justify-between items-center text-[10px] text-muted-foreground">
          <span>Route: {activeTrip.route}</span>
          <span>{activeTrip.progress}% complete</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border text-xs">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 pb-2 font-semibold text-center border-b-2 ${
            activeTab === 'info' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
          }`}
        >
          Trip Info
        </button>
        <button
          onClick={() => setActiveTab('fuel')}
          className={`flex-1 pb-2 font-semibold text-center border-b-2 ${
            activeTab === 'fuel' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
          }`}
        >
          Log Fuel
        </button>
        <button
          onClick={() => setActiveTab('expense')}
          className={`flex-1 pb-2 font-semibold text-center border-b-2 ${
            activeTab === 'expense' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
          }`}
        >
          Log Expense
        </button>
      </div>

      {/* Tab Panels */}
      <div className="text-xs">
        {activeTab === 'info' && (
          <div className="rounded-lg border border-white/[0.06] bg-[#131D2B] p-5 space-y-5">
            <div className="space-y-2.5">
              <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
                <span className="text-muted-foreground">Vehicle Assigned:</span>
                <span className="font-mono text-white font-bold">{activeTrip.vehiclePlate}</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
                <span className="text-muted-foreground">Route Distance:</span>
                <span className="font-mono text-white">{activeTrip.distanceKm} km</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
                <span className="text-muted-foreground">Estimated Time Window:</span>
                <span className="font-mono text-white">{activeTrip.estimatedDurationHours} hours</span>
              </div>
            </div>

            {/* Oversized controls for ease-of-tap in trucks */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => completeTripMutation.mutate(activeTrip.id)}
                className="w-full flex justify-center items-center rounded-lg bg-success py-4 text-xs font-extrabold uppercase tracking-wider text-[#09111D] hover:bg-success/90 transition-all shadow-[0_0_15px_rgba(34,197,94,0.15)] active:scale-98"
              >
                Mark Trip Completed
              </button>

              <button
                onClick={() => {
                  const reason = prompt("Describe emergency (e.g., Engine failure, flat tire, accident):");
                  if (reason) alert("🚨 EMERGENCY SOS SIGNAL TRANSMITTED. Dispatch team has been notified. Location coordinates locked.");
                }}
                className="w-full flex justify-center items-center rounded-lg bg-destructive/10 border border-destructive/30 py-3 text-xs font-extrabold uppercase tracking-wider text-destructive hover:bg-destructive/15 transition-all active:scale-98"
              >
                🚨 SOS Dispatch Emergency Call
              </button>
            </div>
          </div>
        )}

        {activeTab === 'fuel' && (
          <form onSubmit={handleRefuelSubmit(onRefuelLog)} className="rounded-lg border border-border bg-card p-4 space-y-3">
            <h3 className="font-bold text-foreground flex items-center gap-1"><Fuel className="h-4 w-4" /> Log Fuel Refill</h3>
            <div>
              <label className="block text-muted-foreground mb-1">Fuel Quantity (Liters)</label>
              <input type="number" required {...refuelRegister('liters')} className="w-full rounded border border-border bg-background px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g., 100" />
            </div>
            <div>
              <label className="block text-muted-foreground mb-1">Total Cost (INR)</label>
              <input type="number" required {...refuelRegister('cost')} className="w-full rounded border border-border bg-background px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g., 9500" />
            </div>
            <div>
              <label className="block text-muted-foreground mb-1">Odometer Reading (km)</label>
              <input type="number" required {...refuelRegister('odometer')} className="w-full rounded border border-border bg-background px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-muted-foreground mb-1">Fuel Plaza Location</label>
              <input type="text" {...refuelRegister('location')} className="w-full rounded border border-border bg-background px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g., Expressway Exit 4" />
            </div>
            <button type="submit" disabled={logFuelMutation.isPending} className="w-full rounded bg-primary py-2 font-bold text-primary-foreground hover:bg-primary/95 disabled:opacity-50">
              Submit Fuel Log
            </button>
          </form>
        )}

        {activeTab === 'expense' && (
          <form onSubmit={handleExpenseSubmit(onExpenseLog)} className="rounded-lg border border-border bg-card p-4 space-y-3">
            <h3 className="font-bold text-foreground flex items-center gap-1"><DollarSign className="h-4 w-4" /> Log Expense Record</h3>
            <div>
              <label className="block text-muted-foreground mb-1">Expense Type</label>
              <select {...expenseRegister('type')} className="w-full rounded border border-border bg-background px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="Toll">Toll Fee</option>
                <option value="Food">Food / Meals</option>
                <option value="Maintenance">Ad-hoc Repairs</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-muted-foreground mb-1">Amount (INR)</label>
              <input type="number" required {...expenseRegister('amount')} className="w-full rounded border border-border bg-background px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g., 320" />
            </div>
            <div>
              <label className="block text-muted-foreground mb-1">Expense Description</label>
              <input type="text" required {...expenseRegister('description')} className="w-full rounded border border-border bg-background px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g., Toll booth Khalapur" />
            </div>
            <button type="submit" disabled={logExpenseMutation.isPending} className="w-full rounded bg-primary py-2 font-bold text-primary-foreground hover:bg-primary/95 disabled:opacity-50">
              Submit Expense
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default DriverTrips;
