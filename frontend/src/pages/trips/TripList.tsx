import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import type { Trip, Driver, Vehicle } from '../../types';
import { DataTable } from '../../components/shared/DataTable';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { Navigation, Plus, Flame, AlertTriangle, MapPin, Building2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const tripSchema = z.object({
  driverId: z.string().min(1, 'Please select a driver'),
  vehicleId: z.string().min(1, 'Please select a vehicle'),
  origin: z.string().min(2, 'Origin location required'),
  destination: z.string().min(2, 'Destination location required'),
  route: z.string().min(2, 'Route description required'),
  distanceKm: z.number().min(1, 'Distance must be positive'),
  estimatedDurationHours: z.number().min(0.5, 'Duration must be at least 30 mins'),
});

type TripFormValues = z.infer<typeof tripSchema>;

export const TripList: React.FC = () => {
  const queryClient = useQueryClient();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  // Queries
  const { data: trips = [] } = useQuery<Trip[]>({
    queryKey: ['trips'],
    queryFn: () => api.get<Trip[]>('/trips'),
  });

  const { data: drivers = [] } = useQuery<Driver[]>({
    queryKey: ['drivers'],
    queryFn: () => api.get<Driver[]>('/drivers'),
  });

  const { data: vehicles = [] } = useQuery<Vehicle[]>({
    queryKey: ['vehicles'],
    queryFn: () => api.get<Vehicle[]>('/vehicles'),
  });

  const availableDrivers = drivers.filter(d => d.status === 'Available');
  const availableVehicles = vehicles.filter(v => v.status === 'Available');

  const createMutation = useMutation({
    mutationFn: (newTrip: Partial<Trip>) => api.post<Trip>('/trips', newTrip),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      // Invalidate drivers/vehicles so they are marked as Assigned in full integration
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      setShowAddModal(false);
      reset();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TripFormValues>({
    resolver: zodResolver(tripSchema),
  });

  const onSubmit = (values: TripFormValues) => {
    const selectedDriver = drivers.find(d => d.id === values.driverId);
    const selectedVehicle = vehicles.find(v => v.id === values.vehicleId);

    // Auto-calculate carbon emissions mock: 0.3kg per km
    const carbonEmission = Math.round(values.distanceKm * 0.32 * 10) / 10;

    createMutation.mutate({
      tripNumber: `TRP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      driverId: values.driverId,
      driverName: selectedDriver ? selectedDriver.name : 'Unknown',
      vehicleId: values.vehicleId,
      vehiclePlate: selectedVehicle ? selectedVehicle.plateNumber : 'Unknown',
      origin: values.origin,
      destination: values.destination,
      status: 'Assigned',
      startDateTime: new Date().toISOString(),
      endDateTime: null,
      route: values.route,
      distanceKm: values.distanceKm,
      progress: 0,
      estimatedDurationHours: values.estimatedDurationHours,
      carbonEmissionKg: carbonEmission,
    });
  };

  const columns = [
    {
      header: 'Trip Number',
      accessor: (row: Trip) => (
        <button
          onClick={() => setSelectedTrip(row)}
          className="text-left font-semibold text-primary hover:underline"
        >
          {row.tripNumber}
        </button>
      ),
      sortable: true,
    },
    { header: 'Driver', accessor: 'driverName' as keyof Trip },
    { header: 'Vehicle', accessor: 'vehiclePlate' as keyof Trip },
    { header: 'Route', accessor: 'route' as keyof Trip },
    {
      header: 'Status',
      accessor: (row: Trip) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Carbon (kg)',
      accessor: (row: Trip) => `${row.carbonEmissionKg} kg`,
      sortable: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Trip Dispatch Control</h1>
          <p className="text-xs text-muted-foreground">Assign drivers and vehicles, schedule routes, and monitor trip logs.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center rounded-md bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow hover:bg-primary/95 transition-colors gap-1.5"
        >
          <Plus className="h-4 w-4" /> Dispatch Trip
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Trips logs table */}
        <div className="lg:col-span-2 space-y-4">
          <DataTable
            data={trips}
            columns={columns}
            searchKey="tripNumber"
            searchPlaceholder="Search trip schedules..."
            rowsPerPage={6}
          />
        </div>

        {/* Selected Trip Details & Status Timeline */}
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <h2 className="text-sm font-semibold mb-4 border-b border-border pb-2 flex items-center gap-1.5">
            <Navigation className="h-4.5 w-4.5 text-primary" /> Trip Dispatch Details
          </h2>
          {selectedTrip ? (
            <div className="space-y-4 text-xs">
              <div>
                <h3 className="font-bold text-sm text-foreground">{selectedTrip.tripNumber}</h3>
                <p className="text-[11px] text-muted-foreground">{selectedTrip.route}</p>
              </div>

              {/* Status Flow Timeline */}
              <div className="relative border-l border-white/[0.06] pl-6 space-y-5">
                {/* Depot Left Event */}
                <div className="relative">
                  <span className="absolute -left-[33px] flex h-5 w-5 items-center justify-center rounded-full bg-success/10 border border-success/30 text-success text-[10px]">
                    <Building2 className="h-3 w-3" />
                  </span>
                  <div className="flex justify-between items-baseline">
                    <p className="font-bold text-white text-[11px]">Vehicle Left Depot</p>
                    <span className="font-mono text-[9px] text-muted-foreground">09:24</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Dispatched from logistics depot and driver took shift control.</p>
                </div>

                {/* Fuel Logged Event */}
                <div className="relative">
                  <span className="absolute -left-[33px] flex h-5 w-5 items-center justify-center rounded-full bg-warning/10 border border-warning/30 text-warning text-[10px]">
                    <Flame className="h-3 w-3" />
                  </span>
                  <div className="flex justify-between items-baseline">
                    <p className="font-bold text-white text-[11px]">Fuel Refill Logged</p>
                    <span className="font-mono text-[9px] text-muted-foreground">10:18</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">42 Liters refueled at Highway Station NH-48.</p>
                </div>

                {/* Traffic Delay Alert Event */}
                <div className="relative">
                  <span className={`absolute -left-[33px] flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                    selectedTrip.status === 'Completed'
                      ? 'bg-success/10 border border-success/30 text-success'
                      : 'bg-destructive/10 border border-destructive/30 text-destructive animate-pulse'
                  }`}>
                    <AlertTriangle className="h-3 w-3" />
                  </span>
                  <div className="flex justify-between items-baseline">
                    <p className="font-bold text-white text-[11px]">Traffic Delay Advisory</p>
                    <span className="font-mono text-[9px] text-muted-foreground">12:14</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Rerouted automatically due to heavy bypass toll lane congestion.</p>
                </div>

                {/* Destination Reached Event */}
                <div className="relative">
                  <span className={`absolute -left-[33px] flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                    selectedTrip.status === 'Completed'
                      ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                      : 'bg-white/[0.02] border border-white/[0.06] text-muted-foreground'
                  }`}>
                    <MapPin className="h-3 w-3" />
                  </span>
                  <div className="flex justify-between items-baseline">
                    <p className="font-bold text-[11px]">Destination Arrived</p>
                    <span className="font-mono text-[9px] text-muted-foreground">13:02</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    {selectedTrip.status === 'Completed'
                      ? 'Shipment unloaded and cargo verified by recipient.'
                      : 'Planned arrival destination window.'}
                  </p>
                </div>
              </div>

              <div className="space-y-2 border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Origin:</span>
                  <span className="font-medium">{selectedTrip.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Destination:</span>
                  <span className="font-medium">{selectedTrip.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Odometer Distance:</span>
                  <span className="font-medium">{selectedTrip.distanceKm} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Duration:</span>
                  <span className="font-medium">{selectedTrip.estimatedDurationHours} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Carbon Emissions:</span>
                  <span className="font-medium text-success">{selectedTrip.carbonEmissionKg} kg CO₂</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-muted-foreground">
              Select a trip number from the roster to view dispatch timeline.
            </div>
          )}
        </div>
      </div>

      {/* Dispatch New Trip Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-foreground">Dispatch New Trip</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Assign Driver</label>
                  <select
                    {...register('driverId')}
                    className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select driver...</option>
                    {availableDrivers.map(d => (
                      <option key={d.id} value={d.id}>{d.name} (Score: {d.safetyScore})</option>
                    ))}
                  </select>
                  {errors.driverId && <p className="text-[10px] text-destructive mt-0.5">{errors.driverId.message}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Assign Vehicle</label>
                  <select
                    {...register('vehicleId')}
                    className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select vehicle...</option>
                    {availableVehicles.map(v => (
                      <option key={v.id} value={v.id}>{v.plateNumber} ({v.model})</option>
                    ))}
                  </select>
                  {errors.vehicleId && <p className="text-[10px] text-destructive mt-0.5">{errors.vehicleId.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Origin Hub</label>
                  <input
                    {...register('origin')}
                    placeholder="e.g., Pune Depot"
                    className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {errors.origin && <p className="text-[10px] text-destructive mt-0.5">{errors.origin.message}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Destination Hub</label>
                  <input
                    {...register('destination')}
                    placeholder="e.g., Goa Warehouse"
                    className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {errors.destination && <p className="text-[10px] text-destructive mt-0.5">{errors.destination.message}</p>}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-muted-foreground mb-1">Route Plan Details</label>
                <input
                  {...register('route')}
                  placeholder="e.g., NH48 Expressway bypass"
                  className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.route && <p className="text-[10px] text-destructive mt-0.5">{errors.route.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Distance (km)</label>
                  <input
                    type="number"
                    {...register('distanceKm', { valueAsNumber: true })}
                    placeholder="e.g., 420"
                    className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {errors.distanceKm && <p className="text-[10px] text-destructive mt-0.5">{errors.distanceKm.message}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Est. Duration (hours)</label>
                  <input
                    type="number"
                    step="0.5"
                    {...register('estimatedDurationHours', { valueAsNumber: true })}
                    placeholder="e.g., 8"
                    className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {errors.estimatedDurationHours && <p className="text-[10px] text-destructive mt-0.5">{errors.estimatedDurationHours.message}</p>}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded border border-border bg-card px-4 py-1.5 font-semibold text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="rounded bg-primary px-4 py-1.5 font-semibold text-primary-foreground hover:bg-primary/95 disabled:opacity-50"
                >
                  {createMutation.isPending ? 'Scheduling...' : 'Dispatch Trip'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default TripList;
