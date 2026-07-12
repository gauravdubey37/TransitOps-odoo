import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import type { FuelLog, Driver, Vehicle } from '../../types';
import { DataTable } from '../../components/shared/DataTable';
import { KPICard } from '../../components/shared/KPICard';
import { Fuel, DollarSign, Droplet } from 'lucide-react';

export const FuelLogs: React.FC = () => {
  const { data: fuelLogs = [], isLoading: logsLoading } = useQuery<FuelLog[]>({
    queryKey: ['fuelLogs'],
    queryFn: () => api.get<FuelLog[]>('/fuelLogs'),
  });

  const { data: drivers = [] } = useQuery<Driver[]>({
    queryKey: ['drivers'],
    queryFn: () => api.get<Driver[]>('/drivers'),
  });

  const { data: vehicles = [] } = useQuery<Vehicle[]>({
    queryKey: ['vehicles'],
    queryFn: () => api.get<Vehicle[]>('/vehicles'),
  });

  const getDriverName = (driverId: string) => {
    return drivers.find(d => d.id === driverId)?.name || driverId;
  };

  const getVehiclePlate = (vehicleId: string) => {
    return vehicles.find(v => v.id === vehicleId)?.plateNumber || vehicleId;
  };

  const totalLiters = fuelLogs.reduce((sum, log) => sum + (log.liters || 0), 0);
  const totalCost = fuelLogs.reduce((sum, log) => sum + (log.cost || 0), 0);
  const avgCostPerLiter = totalLiters > 0 ? (totalCost / totalLiters).toFixed(2) : '0';

  const columns = [
    {
      header: 'Vehicle',
      accessor: (row: FuelLog) => getVehiclePlate(row.vehicleId),
      sortable: true,
    },
    {
      header: 'Driver',
      accessor: (row: FuelLog) => getDriverName(row.driverId),
      sortable: true,
    },
    {
      header: 'Date',
      accessor: (row: FuelLog) => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
    {
      header: 'Liters',
      accessor: (row: FuelLog) => `${row.liters} L`,
      sortable: true,
    },
    {
      header: 'Cost (INR)',
      accessor: (row: FuelLog) => `₹${row.cost.toLocaleString()}`,
      sortable: true,
    },
    {
      header: 'Odometer (km)',
      accessor: (row: FuelLog) => `${row.odometer.toLocaleString()} km`,
      sortable: true,
    },
    {
      header: 'Location',
      accessor: 'location' as keyof FuelLog,
    },
  ];

  if (logsLoading) {
    return <div className="p-6 text-center text-xs text-muted-foreground">Loading fuel log dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Fuel Administration</h1>
        <p className="text-xs text-muted-foreground">Monitor fleet refueling logs, efficiency expenditures, and location consumption stats.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <KPICard
          title="Total Liters Refilled"
          value={`${totalLiters.toLocaleString()} L`}
          icon={<Droplet className="h-4 w-4" />}
          comparisonText="Cumulative volume refilled"
        />
        <KPICard
          title="Total Expenditures"
          value={`₹${totalCost.toLocaleString()}`}
          icon={<DollarSign className="h-4 w-4" />}
          comparisonText="Total refueling costs"
        />
        <KPICard
          title="Average Cost / L"
          value={`₹${avgCostPerLiter}`}
          icon={<Fuel className="h-4 w-4" />}
          comparisonText="Average unit price across log"
        />
      </div>

      <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <DataTable
          data={fuelLogs}
          columns={columns}
          searchKey="location"
          searchPlaceholder="Search by fuel plaza location..."
          rowsPerPage={8}
        />
      </div>
    </div>
  );
};
export default FuelLogs;
