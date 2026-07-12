import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import type { Driver } from '../../types';
import { DataTable } from '../../components/shared/DataTable';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { Users, UserPlus, ShieldAlert, Star } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const driverSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  licenseNumber: z.string().min(5, 'License number is required'),
  licenseExpiry: z.string().nonempty('Expiry date is required'),
  insuranceExpiry: z.string().nonempty('Insurance expiry is required'),
  depotId: z.string().min(1, 'Depot is required'),
});

type DriverFormValues = z.infer<typeof driverSchema>;

export const DriverList: React.FC = () => {
  const queryClient = useQueryClient();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const { data: drivers = [] } = useQuery<Driver[]>({
    queryKey: ['drivers'],
    queryFn: () => api.get<Driver[]>('/drivers'),
  });

  const createMutation = useMutation({
    mutationFn: (newDriver: Partial<Driver>) => api.post<Driver>('/drivers', newDriver),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      setShowAddModal(false);
      reset();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DriverFormValues>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      depotId: 'depot-001',
    },
  });

  const onSubmit = (values: DriverFormValues) => {
    createMutation.mutate({
      ...values,
      status: 'Available',
      fatigueScore: 0,
      safetyScore: 100,
      completedTrips: 0,
      rating: 5.0,
    });
  };

  const columns = [
    {
      header: 'Driver Name',
      accessor: (row: Driver) => (
        <button
          onClick={() => setSelectedDriver(row)}
          className="text-left font-semibold text-primary hover:underline"
        >
          {row.name}
        </button>
      ),
      sortable: true,
    },
    { header: 'License Number', accessor: 'licenseNumber' as keyof Driver },
    {
      header: 'Status',
      accessor: (row: Driver) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Fatigue Score',
      accessor: (row: Driver) => (
        <div className="flex items-center space-x-1.5">
          <span className={`font-semibold ${row.fatigueScore > 70 ? 'text-destructive' : 'text-foreground'}`}>
            {row.fatigueScore}
          </span>
          <div className="h-1.5 w-12 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full ${row.fatigueScore > 70 ? 'bg-destructive' : 'bg-primary'}`}
              style={{ width: `${row.fatigueScore}%` }}
            />
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Safety Score',
      accessor: (row: Driver) => (
        <span className={`font-semibold ${row.safetyScore > 85 ? 'text-success' : 'text-warning'}`}>
          {row.safetyScore}/100
        </span>
      ),
      sortable: true,
    },
    {
      header: 'Rating',
      accessor: (row: Driver) => (
        <div className="flex items-center">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="font-semibold">{row.rating}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between font-display">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-foreground">Ustad Register (Drivers List)</h1>
          <p className="text-xs text-muted-foreground">Inspect driver licenses, active duty status, and fatigue registers.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center rounded bg-primary px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow hover:bg-primary/95 transition-colors gap-1.5"
        >
          <UserPlus className="h-4 w-4" /> Add New Ustad
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Roster List */}
        <div className="lg:col-span-2 space-y-4">
          <DataTable
            data={drivers}
            columns={columns}
            searchKey="name"
            searchPlaceholder="Search driver register..."
            rowsPerPage={6}
          />
        </div>

        {/* Selected Driver Profile Details Drawer */}
        <div className="rounded border border-border bg-card p-5 shadow-sm font-display">
          <h2 className="text-xs font-black uppercase tracking-wider text-primary mb-4 border-b border-border pb-2 flex items-center gap-1.5">
            <Users className="h-4.5 w-4.5" /> Driver Telemetry Control
          </h2>
          {selectedDriver ? (
            <div className="space-y-4 text-xs">
              <div className="flex items-center space-x-3 bg-background border border-border p-3 rounded">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10 text-primary border border-primary/20 font-black text-lg shadow-[0_0_15px_rgba(234,88,12,0.1)] font-mono">
                  {selectedDriver.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground tracking-wide">{selectedDriver.name}</h3>
                  <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wide">OPERATOR ID: {selectedDriver.id}</p>
                </div>
              </div>

              {/* Glowing Circular Fatigue Gauge */}
              <div className="flex flex-col items-center justify-center bg-background border border-border rounded p-4 space-y-2">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Fatigue Index Telemetry</span>
                <div className="relative flex items-center justify-center">
                  <svg className="h-20 w-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      className="stroke-muted"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      className={`transition-all duration-1000 ease-out ${
                        selectedDriver.fatigueScore > 70 
                          ? 'stroke-destructive' 
                          : selectedDriver.fatigueScore > 40 
                          ? 'stroke-warning' 
                          : 'stroke-success'
                      }`}
                      strokeWidth="6"
                      strokeDasharray={2 * Math.PI * 32}
                      strokeDashoffset={2 * Math.PI * 32 * (1 - selectedDriver.fatigueScore / 100)}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-sm font-black font-mono text-foreground">{selectedDriver.fatigueScore}%</span>
                  </div>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${
                  selectedDriver.fatigueScore > 70 
                    ? 'text-destructive animate-pulse' 
                    : selectedDriver.fatigueScore > 40 
                    ? 'text-warning' 
                    : 'text-success'
                }`}>
                  {selectedDriver.fatigueScore > 70 ? 'Critical Rest Req (Dhaba)' : selectedDriver.fatigueScore > 40 ? 'Moderate Alert' : 'Optimal Standing'}
                </span>
              </div>

              <div className="space-y-2 border-t border-border pt-3 font-mono">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="text-foreground font-bold">{selectedDriver.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">License ID:</span>
                  <span className="text-foreground font-bold">{selectedDriver.licenseNumber}</span>
                </div>
                <div className="flex justify-between font-display">
                  <span className="text-muted-foreground font-bold">Safety Index Score:</span>
                  <span className="text-success font-bold">{selectedDriver.safetyScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Trips Completed:</span>
                  <span className="text-foreground font-bold">{selectedDriver.completedTrips} trips</span>
                </div>
              </div>

              {selectedDriver.fatigueScore > 70 && (
                <div className="rounded border border-destructive/20 bg-destructive/10 p-3 text-destructive flex gap-2 font-display">
                  <ShieldAlert className="h-5 w-5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wide">High Fatigue Advisory</h4>
                    <p className="text-[10px] mt-0.5 leading-relaxed font-semibold">
                      Ustad fatigue score is {selectedDriver.fatigueScore}%. Assigning new routes is blocked. Please direct to resting area / dhaba.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-muted-foreground">
              Select an Ustad from the list to load operator records.
            </div>
          )}
        </div>
      </div>

      {/* Add Driver Dialog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-foreground">Add New Fleet Driver</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-muted-foreground mb-1">Driver Name</label>
                <input
                  {...register('name')}
                  placeholder="e.g., Ramesh Pathak"
                  className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.name && <p className="text-[10px] text-destructive mt-0.5">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block font-semibold text-muted-foreground mb-1">Phone Number</label>
                <input
                  {...register('phone')}
                  placeholder="e.g., 9876543210"
                  className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.phone && <p className="text-[10px] text-destructive mt-0.5">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block font-semibold text-muted-foreground mb-1">License Number</label>
                <input
                  {...register('licenseNumber')}
                  placeholder="e.g., DL1420230005432"
                  className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.licenseNumber && <p className="text-[10px] text-destructive mt-0.5">{errors.licenseNumber.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">License Expiry</label>
                  <input
                    type="date"
                    {...register('licenseExpiry')}
                    className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {errors.licenseExpiry && <p className="text-[10px] text-destructive mt-0.5">{errors.licenseExpiry.message}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Insurance Expiry</label>
                  <input
                    type="date"
                    {...register('insuranceExpiry')}
                    className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {errors.insuranceExpiry && <p className="text-[10px] text-destructive mt-0.5">{errors.insuranceExpiry.message}</p>}
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
                  {createMutation.isPending ? 'Saving...' : 'Add Driver'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default DriverList;
