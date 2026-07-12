import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Vehicle } from '../../types';
import { DataTable } from '../../components/shared/DataTable';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { Truck, Plus, AlertCircle, ShieldAlert, Activity, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const vehicleSchema = z.object({
  plateNumber: z.string().min(5, 'Plate number must be at least 5 characters'),
  model: z.string().min(2, 'Model is required'),
  type: z.string().min(2, 'Type is required'),
  fuelLevel: z.coerce.number().min(0).max(100),
  healthScore: z.coerce.number().min(0).max(100),
  odometer: z.coerce.number().min(0),
  depotId: z.string().default('depot-001'),
});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

export const VehicleList: React.FC = () => {
  const queryClient = useQueryClient();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const { data: vehicles = [], isLoading } = useQuery<Vehicle[]>({
    queryKey: ['vehicles'],
    queryFn: () => api.get<Vehicle[]>('/vehicles'),
  });

  const createMutation = useMutation({
    mutationFn: (newVehicle: Partial<Vehicle>) => api.post<Vehicle>('/vehicles', newVehicle),
    onSuccess: () => {
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
  } = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      fuelLevel: 100,
      healthScore: 100,
      odometer: 0,
    }
  });

  const onSubmit = (values: VehicleFormValues) => {
    createMutation.mutate({
      ...values,
      status: 'Available',
      mileage: 4.5,
      tireHealth: {
        frontLeft: 100,
        frontRight: 100,
        rearLeftInner: 100,
        rearLeftOuter: 100,
        rearRightInner: 100,
        rearRightOuter: 100,
      },
      nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
  };

  const columns = [
    {
      header: 'Plate Number',
      accessor: (row: Vehicle) => (
        <button
          onClick={() => setSelectedVehicle(row)}
          className="text-left font-semibold text-primary hover:underline"
        >
          {row.plateNumber}
        </button>
      ),
      sortable: true,
    },
    { header: 'Model', accessor: 'model' as keyof Vehicle },
    { header: 'Type', accessor: 'type' as keyof Vehicle },
    {
      header: 'Status',
      accessor: (row: Vehicle) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Health Score',
      accessor: (row: Vehicle) => (
        <span className={`font-semibold ${row.healthScore > 90 ? 'text-success' : row.healthScore > 60 ? 'text-warning' : 'text-destructive'}`}>
          {row.healthScore}%
        </span>
      ),
      sortable: true,
    },
    {
      header: 'Odometer',
      accessor: (row: Vehicle) => `${row.odometer.toLocaleString()} km`,
      sortable: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Vehicle Fleet Management</h1>
          <p className="text-xs text-muted-foreground">Monitor health indexes, fuel diagnostics, odometer updates, and tire safety wear.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center rounded-md bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow hover:bg-primary/95 transition-colors gap-1.5"
        >
          <Plus className="h-4 w-4" /> Add Vehicle
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Roster list */}
        <div className="lg:col-span-2 space-y-4">
          <DataTable
            data={vehicles}
            columns={columns}
            searchKey="plateNumber"
            searchPlaceholder="Search by plate number..."
            rowsPerPage={6}
          />
        </div>

        {/* Selected Vehicle Health and Tire wear Details */}
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <h2 className="text-sm font-semibold mb-4 border-b border-border pb-2 flex items-center gap-1.5">
            <Truck className="h-4.5 w-4.5 text-primary" /> Vehicle Diagnostics
          </h2>
          {selectedVehicle ? (
            <div className="space-y-4 text-xs">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground">{selectedVehicle.plateNumber}</h3>
                  <p className="text-[11px] text-muted-foreground">{selectedVehicle.model} ({selectedVehicle.type})</p>
                </div>
              </div>

              <div className="space-y-2 border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fuel Level:</span>
                  <span className="font-medium">{selectedVehicle.fuelLevel}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Maintenance:</span>
                  <span className="font-medium text-warning">{selectedVehicle.nextMaintenance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Odometer:</span>
                  <span className="font-medium">{selectedVehicle.odometer.toLocaleString()} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fuel Mileage:</span>
                  <span className="font-medium">{selectedVehicle.mileage} km/L</span>
                </div>
              </div>

              {/* Tire Wear visual map */}
              <div className="space-y-2 border-t border-border pt-3">
                <h4 className="font-semibold text-foreground flex items-center gap-1">
                  <Activity className="h-3.5 w-3.5" /> Tire Wear Indexes
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 rounded bg-muted/50 border border-border">
                    <p className="text-muted-foreground">Front Left</p>
                    <p className="font-bold text-foreground mt-0.5">{selectedVehicle.tireHealth.frontLeft}%</p>
                  </div>
                  <div className="p-2 rounded bg-muted/50 border border-border">
                    <p className="text-muted-foreground">Front Right</p>
                    <p className="font-bold text-foreground mt-0.5">{selectedVehicle.tireHealth.frontRight}%</p>
                  </div>
                  <div className="p-2 rounded bg-muted/50 border border-border">
                    <p className="text-muted-foreground">Rear Left Inner</p>
                    <p className="font-bold text-foreground mt-0.5">{selectedVehicle.tireHealth.rearLeftInner}%</p>
                  </div>
                  <div className="p-2 rounded bg-muted/50 border border-border">
                    <p className="text-muted-foreground">Rear Right Inner</p>
                    <p className="font-bold text-foreground mt-0.5">{selectedVehicle.tireHealth.rearRightInner}%</p>
                  </div>
                </div>
              </div>

              {selectedVehicle.healthScore < 60 && (
                <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-destructive flex gap-2">
                  <ShieldAlert className="h-5 w-5 shrink-0" />
                  <div>
                    <h4 className="font-bold">Critical Health Alert</h4>
                    <p className="text-[10px] mt-0.5 leading-relaxed">
                      Vehicle health score is at {selectedVehicle.healthScore}%. Immediate service required.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-muted-foreground">
              Select a vehicle plate from the list to view diagnostic logs.
            </div>
          )}
        </div>
      </div>

      {/* Add Vehicle Modal Dialog */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-foreground">Add New Fleet Vehicle</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-muted-foreground mb-1">Plate Number</label>
                <input
                  {...register('plateNumber')}
                  placeholder="e.g., MH 12 GH 5432"
                  className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.plateNumber && <p className="text-[10px] text-destructive mt-0.5">{errors.plateNumber.message}</p>}
              </div>

              <div>
                <label className="block font-semibold text-muted-foreground mb-1">Model Name</label>
                <input
                  {...register('model')}
                  placeholder="e.g., Tata Prima 4925"
                  className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.model && <p className="text-[10px] text-destructive mt-0.5">{errors.model.message}</p>}
              </div>

              <div>
                <label className="block font-semibold text-muted-foreground mb-1">Vehicle Type</label>
                <select
                  {...register('type')}
                  className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="Heavy Duty Truck">Heavy Duty Truck</option>
                  <option value="Medium Duty Truck">Medium Duty Truck</option>
                  <option value="Dumper">Dumper</option>
                  <option value="Light Cargo Van">Light Cargo Van</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Fuel level (%)</label>
                  <input
                    type="number"
                    {...register('fuelLevel')}
                    className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {errors.fuelLevel && <p className="text-[10px] text-destructive mt-0.5">{errors.fuelLevel.message}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Health Score (%)</label>
                  <input
                    type="number"
                    {...register('healthScore')}
                    className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {errors.healthScore && <p className="text-[10px] text-destructive mt-0.5">{errors.healthScore.message}</p>}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-muted-foreground mb-1">Initial Odometer Reading (km)</label>
                <input
                  type="number"
                  {...register('odometer')}
                  className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.odometer && <p className="text-[10px] text-destructive mt-0.5">{errors.odometer.message}</p>}
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
                  {createMutation.isPending ? 'Saving...' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default VehicleList;
