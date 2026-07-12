import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import type { Vehicle } from '../../types';
import { DataTable } from '../../components/shared/DataTable';
import { KPICard } from '../../components/shared/KPICard';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { ShieldAlert, CheckCircle2, Wrench } from 'lucide-react';

export const MaintenanceList: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: vehicles = [], isLoading: vehiclesLoading } = useQuery<Vehicle[]>({
    queryKey: ['vehicles'],
    queryFn: () => api.get<Vehicle[]>('/vehicles'),
  });

  const sendToMaintenanceMutation = useMutation({
    mutationFn: (vehicleId: string) =>
      api.patch<Vehicle>(`/vehicles/${vehicleId}`, { status: 'Maintenance', healthScore: 95 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      alert('Vehicle diagnostic recalibrated and scheduled for service successfully!');
    },
  });

  // Filter vehicles that require attention (health score < 80 or status is Maintenance)
  const maintenanceList = vehicles.filter(v => v.healthScore < 80 || v.status === 'Maintenance');
  const healthyVehicles = vehicles.filter(v => v.healthScore >= 80 && v.status !== 'Maintenance');

  const handleRecalibrate = (id: string) => {
    sendToMaintenanceMutation.mutate(id);
  };

  const columns = [
    { header: 'Plate Number', accessor: 'plateNumber' as keyof Vehicle, sortable: true },
    { header: 'Model', accessor: 'model' as keyof Vehicle, sortable: true },
    { header: 'Type', accessor: 'type' as keyof Vehicle },
    {
      header: 'Health Index',
      accessor: (row: Vehicle) => (
        <span className={`font-semibold ${row.healthScore < 50 ? 'text-destructive' : row.healthScore < 75 ? 'text-warning' : 'text-success'}`}>
          {row.healthScore}%
        </span>
      ),
      sortable: true,
    },
    {
      header: 'Status',
      accessor: (row: Vehicle) => <StatusBadge status={row.status} />,
      sortable: true,
    },
    {
      header: 'Odometer',
      accessor: (row: Vehicle) => `${row.odometer.toLocaleString()} km`,
      sortable: true,
    },
    {
      header: 'Service Action',
      accessor: (row: Vehicle) => (
        <button
          onClick={() => handleRecalibrate(row.id)}
          disabled={sendToMaintenanceMutation.isPending}
          className="inline-flex items-center justify-center rounded bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary hover:bg-primary/15 disabled:opacity-50 gap-1"
        >
          <Wrench className="h-3 w-3" /> Fix & Tune
        </button>
      ),
    },
  ];

  if (vehiclesLoading) {
    return <div className="p-6 text-center text-xs text-muted-foreground">Analyzing vehicle health matrix...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Fleet Diagnostics & Maintenance</h1>
        <p className="text-xs text-muted-foreground">Monitor breakdown risks, scheduled services, and trigger diagnostic repairs.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <KPICard
          title="Attention Required"
          value={maintenanceList.length}
          icon={<ShieldAlert className="h-4 w-4 text-destructive" />}
          comparisonText="Vehicles below 80% health index"
        />
        <KPICard
          title="Fully Operational"
          value={healthyVehicles.length}
          icon={<CheckCircle2 className="h-4 w-4 text-success" />}
          comparisonText="Normal diagnostic standing"
        />
        <KPICard
          title="Roster Utilization"
          value={`${Math.round((healthyVehicles.length / (vehicles.length || 1)) * 100)}%`}
          icon={<Wrench className="h-4 w-4 text-primary" />}
          comparisonText="Optimal utility rate target"
        />
      </div>

      <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-semibold mb-4 text-foreground flex items-center gap-1.5">
          🛠️ Actionable Diagnostic Flags
        </h3>
        <DataTable
          data={maintenanceList}
          columns={columns}
          searchKey="plateNumber"
          searchPlaceholder="Search flagged plate numbers..."
          rowsPerPage={6}
        />
      </div>
    </div>
  );
};
export default MaintenanceList;
