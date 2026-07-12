import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import type { Trip, Vehicle, Driver, Notification } from '../../types';
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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

export const ExecutiveDashboard: React.FC = () => {
  const [time, setTime] = React.useState(new Date());
  
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  const activeTripColumns = [
    { 
      header: 'Trip Number', 
      accessor: (row: Trip) => <span className="font-mono text-primary font-medium">{row.tripNumber}</span> 
    },
    { header: 'Driver', accessor: 'driverName' as keyof Trip },
    { 
      header: 'Vehicle', 
      accessor: (row: Trip) => <span className="font-mono">{row.vehiclePlate}</span> 
    },
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
            <span className="font-mono">{row.progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${row.progress}%` }} />
          </div>
        </div>
      ),
    },
  ];

  // AI recommendations (mocked based on data)
  const aiRecommendations = [
    { id: 1, type: 'Route Optimization', save: 'Save 23 minutes', benefit: 'Fuel Saving: ₹3,420', confidence: 96 },
    { id: 2, type: 'Driver Fatigue Alert', save: 'Safety Warning', benefit: 'Reassign TRP-1001', confidence: 94 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Good Morning, Himanshu</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mt-1 text-muted-foreground">
            <span className="text-success font-semibold flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-success animate-ping" />
              Fleet Operating Normally
            </span>
            <span>• 98.2% Operational Efficiency</span>
            <span>• No Critical Incidents Detected</span>
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold shadow-sm flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-success animate-pulse" />
            Live Network Connected
          </div>
          <span className="text-[10px] text-muted-foreground font-mono mt-1">
            {time.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} • {time.toLocaleTimeString()}
          </span>
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

        {/* AI Command Center Panel */}
        <div className="rounded-lg border border-primary/25 bg-[#131D2B] p-5 shadow-[0_0_20px_rgba(59,130,246,0.05)] flex flex-col">
          <div className="flex items-center gap-1.5 mb-3 border-b border-white/[0.06] pb-2">
            <Sparkles className="h-4.5 w-4.5 text-primary animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary">AI Command Center</h2>
          </div>
          <div className="flex-1 space-y-3">
            {aiRecommendations.map(rec => (
              <div key={rec.id} className="p-3 bg-[#09111D]/80 rounded-lg border border-white/[0.04] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white tracking-wide">{rec.type}</span>
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold">{rec.confidence}% confidence</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                  <div className="bg-white/[0.02] border border-white/[0.04] rounded p-1.5">
                    <span className="text-muted-foreground block text-[8px] uppercase tracking-wide">Target Save</span>
                    <span className="font-semibold text-white">{rec.save}</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.04] rounded p-1.5">
                    <span className="text-muted-foreground block text-[8px] uppercase tracking-wide">Calculated Benefit</span>
                    <span className="font-semibold text-success font-mono">{rec.benefit}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Recommendation applied: ${rec.type}`)}
                  className="w-full mt-2 inline-flex items-center justify-center rounded border border-primary/40 bg-primary/10 hover:bg-primary/20 transition-all py-1 text-[10px] font-bold text-primary shadow-[0_0_10px_rgba(59,130,246,0.1)] active:scale-98"
                >
                  Accept Dispatch Recommendation
                </button>
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
