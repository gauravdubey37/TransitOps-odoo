import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Trip, Vehicle, Driver, Notification } from '../../types';
import { KPICard } from '../../components/shared/KPICard';
import { DataTable } from '../../components/shared/DataTable';
import { StatusBadge } from '../../components/shared/StatusBadge';
import {
  Truck,
  Users,
  Navigation,
  Wrench,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Activity,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const ExecutiveDashboard: React.FC = () => {
  // Fetch operational resources
  const { data: trips = [], isLoading: tripsLoading } = useQuery<Trip[]>({
    queryKey: ['trips'],
    queryFn: () => api.get<Trip[]>('/trips'),
  });

  const { data: vehicles = [], isLoading: vehiclesLoading } = useQuery<Vehicle[]>({
    queryKey: ['vehicles'],
    queryFn: () => api.get<Vehicle[]>('/vehicles'),
  });

  const { data: drivers = [], isLoading: driversLoading } = useQuery<Driver[]>({
    queryKey: ['drivers'],
    queryFn: () => api.get<Driver[]>('/drivers'),
  });

  const { data: notifications = [], isLoading: alertsLoading } = useQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: () => api.get<Notification[]>('/notifications'),
  });

  const loading = tripsLoading || vehiclesLoading || driversLoading || alertsLoading;

  // Compute metrics
  const totalTrips = trips.length;
  const activeTrips = trips.filter(t => t.status === 'Assigned' || t.status === 'In Transit').length;
  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter(v => v.status === 'Available').length;
  const maintenanceVehicles = vehicles.filter(v => v.status === 'Maintenance').length;
  const activeDrivers = drivers.filter(d => d.status === 'Assigned').length;
  
  // Hardcoded mockup trend calculations
  const utilizationRate = totalVehicles > 0 ? Math.round(((totalVehicles - availableVehicles) / totalVehicles) * 100) : 0;
  
  // Recharts Mock Chart Data
  const weeklyTripsData = [
    { name: 'Mon', trips: 12, carbon: 450 },
    { name: 'Tue', trips: 15, carbon: 520 },
    { name: 'Wed', trips: 18, carbon: 610 },
    { name: 'Thu', trips: 14, carbon: 480 },
    { name: 'Fri', trips: 22, carbon: 730 },
    { name: 'Sat', trips: 10, carbon: 350 },
    { name: 'Sun', trips: 8, carbon: 280 },
  ];

  const vehicleStatusData = [
    { name: 'Available', value: availableVehicles, color: '#16a34a' },
    { name: 'Assigned', value: totalVehicles - availableVehicles - maintenanceVehicles, color: '#0891b2' },
    { name: 'Maintenance', value: maintenanceVehicles, color: '#dc2626' },
  ];

  const activeTripColumns = [
    { header: 'Trip Number', accessor: 'tripNumber' as keyof Trip },
    { header: 'Driver', accessor: 'driverName' as keyof Trip },
    { header: 'Vehicle', accessor: 'vehiclePlate' as keyof Trip },
    { header: 'Destination', accessor: 'destination' as keyof Trip },
    {
      header: 'Status',
      accessor: (row: Trip) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Progress',
      accessor: (row: Trip) => (
        <div className="w-24">
          <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5">
            <span>{row.progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${row.progress}%` }} />
          </div>
        </div>
      ),
    },
  ];

  // AI recommendations (mocked based on data)
  const aiRecommendations = [
    { id: 1, title: 'Reassign Trip TRP-1001', desc: 'Driver Suresh Raina reports high fatigue score (68). Reassign to Vikram Singh.', priority: 'High' },
    { id: 2, title: 'Optimize Route A-4', desc: 'Accident reported near toll plaza. Reroute via bypass to save 35 minutes.', priority: 'Medium' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Executive Overview</h1>
          <p className="text-xs text-muted-foreground">Monitor real-time transport stats, driver logs, and AI predictions.</p>
        </div>
        <div className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold shadow-sm flex items-center gap-1.5">
          <Activity className="h-3.5 w-3.5 text-success animate-pulse" />
          Live Network Connected
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Active Dispatch Trips"
          value={activeTrips}
          icon={<Navigation className="h-5 w-5" />}
          trend={{ value: 12, type: 'up' }}
          comparisonText="vs yesterday active count"
          loading={loading}
        />
        <KPICard
          title="Fleet Utilization"
          value={`${utilizationRate}%`}
          icon={<Truck className="h-5 w-5" />}
          trend={{ value: 4, type: 'up' }}
          comparisonText="active vehicles in operation"
          loading={loading}
        />
        <KPICard
          title="Active Roster Drivers"
          value={activeDrivers}
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 1, type: 'neutral' }}
          comparisonText="assigned to active routes"
          loading={loading}
        />
        <KPICard
          title="Vehicles in Maintenance"
          value={maintenanceVehicles}
          icon={<Wrench className="h-5 w-5" />}
          trend={{ value: 25, type: 'down' }}
          comparisonText="completed repair orders"
          loading={loading}
        />
      </div>

      {/* Analytical Charts and Recommendations Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly Trip Load */}
        <div className="lg:col-span-2 rounded-lg border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Trip Dispatch Load & Carbon Impact</h2>
              <p className="text-[10px] text-muted-foreground">Trips completed versus carbon emissions footprint.</p>
            </div>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> Weekly Report
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTripsData}>
                <defs>
                  <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="trips" stroke="#2563eb" fillOpacity={1} fill="url(#colorTrips)" strokeWidth={2} name="Trips" />
                <Area type="monotone" dataKey="carbon" stroke="#0891b2" fillOpacity={0} strokeWidth={1.5} name="Carbon (kg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations Panel */}
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm flex flex-col">
          <div className="flex items-center gap-1.5 mb-3 border-b border-border pb-2">
            <Sparkles className="h-4.5 w-4.5 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">AI Intelligence Center</h2>
          </div>
          <div className="flex-1 space-y-3">
            {aiRecommendations.map(rec => (
              <div key={rec.id} className="p-3 bg-muted/40 rounded-lg border border-border space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-foreground">{rec.title}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                    rec.priority === 'High' ? 'bg-destructive/10 text-destructive' : 'bg-warning/10 text-warning'
                  }`}>
                    {rec.priority}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">{rec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables and Alerts Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active Trips Table */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold mb-3">Live Active Trip Logs</h2>
          <DataTable
            data={trips}
            columns={activeTripColumns}
            searchKey="tripNumber"
            searchPlaceholder="Search active trip logs..."
            rowsPerPage={4}
          />
        </div>

        {/* Critical Alerts Center */}
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <h2 className="text-sm font-semibold mb-3 flex items-center text-destructive">
            <AlertTriangle className="h-4 w-4 mr-1.5" /> Critical Alerts
          </h2>
          <div className="space-y-3">
            {notifications.slice(0, 3).map(n => (
              <div key={n.id} className="border-l-2 border-destructive pl-3 py-1 space-y-0.5">
                <p className="text-xs font-semibold text-foreground">{n.title}</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExecutiveDashboard;
