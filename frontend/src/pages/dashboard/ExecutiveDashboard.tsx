import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import type { Trip, Vehicle, Driver, Notification } from '../../types';
import { KPICard } from '../../components/shared/KPICard';
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

  // AI recommendations (mocked based on data)
  const aiRecommendations = [
    { id: 1, type: 'Route Optimization', save: 'Save 23 minutes', benefit: 'Fuel Saving: ₹3,420', confidence: 96 },
    { id: 2, type: 'Driver Fatigue Alert', save: 'Safety Warning', benefit: 'Reassign TRP-1001', confidence: 94 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-border pb-4 font-display">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-foreground">Depot Control Center • Delhi-NCR</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mt-1 text-muted-foreground">
            <span className="text-success font-bold flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-success animate-ping" />
              SAB SAHI HAI (All Operations Normal)
            </span>
            <span className="font-bold">• 98.2% Running Efficiency</span>
            <span className="font-bold text-amber-500">• 0 Challans Pending</span>
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="rounded border border-border bg-card px-3 py-1 text-xs font-bold tracking-wide uppercase text-accent shadow-sm flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-accent animate-pulse" />
            Wireless Connected [RADIO]
          </div>
          <span className="text-[10px] text-muted-foreground font-mono mt-1.5">
            {time.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} • {time.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Gaddi On Route (Trips)"
          value={activeTrips}
          icon={<Navigation className="h-5 w-5" />}
          trend={{ value: 12, type: 'up' }}
          comparisonText="active dispatch register"
          progress={78}
          lastUpdated="Updated 3s ago"
          loading={loading}
        />
        <KPICard
          title="Fleet Utilization"
          value={`${utilizationRate}%`}
          icon={<Truck className="h-5 w-5" />}
          trend={{ value: 4, type: 'up' }}
          comparisonText="trucks on asphalt road"
          progress={utilizationRate}
          lastUpdated="Updated 5s ago"
          loading={loading}
        />
        <KPICard
          title="Assigned Drivers"
          value={activeDrivers}
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 1, type: 'neutral' }}
          comparisonText="active duty roster"
          progress={84}
          lastUpdated="Updated 1m ago"
          loading={loading}
        />
        <KPICard
          title="Trucks in Garage"
          value={maintenanceVehicles}
          icon={<Wrench className="h-5 w-5" />}
          trend={{ value: 25, type: 'down' }}
          comparisonText="ongoing breakdown repairs"
          progress={15}
          lastUpdated="Updated 10m ago"
          loading={loading}
        />
      </div>

      {/* Analytical Charts and Recommendations Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly Trip Load */}
        <div className="lg:col-span-2 rounded-lg border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-border pb-2 font-display">
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-foreground">Weekly Freight Load vs Diesel Consumption</h2>
              <div className="flex gap-4 mt-1.5 text-[10px]">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground font-bold">Total Trips: <strong className="text-foreground font-mono">99</strong></span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-info" />
                  <span className="text-muted-foreground font-bold">Estimated Diesel: <strong className="text-foreground font-mono">3,420 Litres</strong></span>
                </div>
              </div>
            </div>
            <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_10px_rgba(234,88,12,0.05)]">
              <TrendingUp className="h-3.5 w-3.5" /> Road Cargo Load
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTripsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--info)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="var(--info)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(234,88,12,0.08)" />
                <XAxis dataKey="name" stroke="var(--foreground)" opacity={0.4} fontSize={10} tickLine={false} />
                <YAxis stroke="var(--foreground)" opacity={0.4} fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                    borderRadius: '4px',
                    color: 'var(--foreground)',
                    fontSize: '10px',
                    fontFamily: 'JetBrains Mono',
                  }}
                />
                <Area type="monotone" dataKey="trips" stroke="var(--primary)" fillOpacity={1} fill="url(#colorTrips)" strokeWidth={2.5} name="Trips Registry" />
                <Area type="monotone" dataKey="carbon" stroke="var(--info)" fillOpacity={1} fill="url(#colorCarbon)" strokeWidth={1.5} name="Diesel Used (L)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Command Center Panel */}
        <div className="rounded-lg border border-primary/25 bg-card p-5 shadow-[0_0_20px_rgba(234,88,12,0.05)] flex flex-col font-display">
          <div className="flex items-center gap-1.5 mb-3 border-b border-border pb-2">
            <Sparkles className="h-4.5 w-4.5 text-primary animate-pulse" />
            <h2 className="text-xs font-black uppercase tracking-wider text-primary">AI Route & Dhandha Advisory</h2>
          </div>
          <div className="flex-1 space-y-3">
            {aiRecommendations.map(rec => (
              <div key={rec.id} className="p-3 bg-background rounded border border-border space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-foreground tracking-wide uppercase">{rec.type}</span>
                  <span className="text-[10px] font-mono text-info font-bold">{rec.confidence}% accuracy</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-[10px] pt-0.5">
                  <div className="bg-card border border-border rounded p-1.5">
                    <span className="text-muted-foreground block text-[8px] uppercase font-bold tracking-wide">Depot Advisory</span>
                    <span className="font-bold text-foreground">{rec.save}</span>
                  </div>
                  <div className="bg-card border border-border rounded p-1.5">
                    <span className="text-muted-foreground block text-[8px] uppercase font-bold tracking-wide">Net Profit</span>
                    <span className="font-bold text-success font-mono">{rec.benefit}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Recommendation applied: ${rec.type}`)}
                  className="w-full mt-2 inline-flex items-center justify-center rounded border border-primary/40 bg-primary/10 hover:bg-primary/20 transition-all py-1.5 text-[10px] font-bold text-primary shadow-[0_0_10px_rgba(234,88,12,0.1)] active:scale-98 uppercase tracking-wider"
                >
                  Accept Dispatch Advisory
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables and Alerts Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active Trips Center */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2 font-display uppercase tracking-wide">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
            </span>
            Live Route Dispatch Register (Gaddi Status)
          </h2>
          <div className="space-y-3">
            {trips.length === 0 ? (
              <div className="rounded border border-border bg-card p-8 text-center text-xs text-muted-foreground font-display">
                🚛 No Active Gaddi Trips. Start a dispatch in the register.
              </div>
            ) : (
              trips.slice(0, 3).map(trip => (
                <div key={trip.id} className="rounded border border-border bg-card p-4 hover:border-primary/30 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-foreground tracking-wide">{trip.tripNumber}</span>
                      <StatusBadge status={trip.status} />
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Highway Route: <strong className="text-foreground font-bold">{trip.origin} ➔ {trip.destination}</strong> ({trip.route})
                    </p>
                    <div className="flex gap-4 text-[10px] text-muted-foreground pt-1">
                      <span>Driver (Ustad): <strong className="text-foreground font-bold">{trip.driverName}</strong></span>
                      <span>Gaddi No: <strong className="text-foreground font-mono font-bold">{trip.vehiclePlate}</strong></span>
                    </div>
                  </div>
                  <div className="w-full sm:w-48 space-y-1.5">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-muted-foreground font-bold">Route Progress</span>
                      <span className="font-mono text-foreground font-bold">{trip.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out animate-pulse" 
                        style={{ width: `${trip.progress}%` }} 
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Radar Map & Alerts Column */}
        <div className="space-y-6 lg:col-span-1">
          {/* Live Fleet Radar Map */}
          <div className="rounded border border-border bg-card p-5 shadow-sm space-y-3 font-display">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-success animate-pulse" /> Highway Gaddi Radar
              </h2>
              <span className="text-[9px] bg-success/10 text-success border border-success/35 px-1.5 py-0.5 rounded font-mono font-bold animate-pulse">
                RADIO FEED
              </span>
            </div>
            
            {/* SVG Interactive Map */}
            <div className="relative h-44 rounded bg-background border border-border overflow-hidden flex items-center justify-center">
              {/* Radar circular lines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-12 h-12 rounded-full border border-primary animate-ping" />
                <div className="w-24 h-24 rounded-full border border-primary/40" />
                <div className="w-36 h-36 rounded-full border border-primary/20" />
              </div>

              {/* Animated Map Routes */}
              <svg className="absolute inset-0 h-full w-full stroke-foreground/[0.08] fill-none" xmlns="http://www.w3.org/2000/svg">
                {/* Routes */}
                <path d="M 20 20 L 80 50 L 150 30 L 220 90 L 280 120" strokeWidth="1.5" />
                <path d="M 50 140 L 120 100 L 150 30 L 250 20" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 10 90 Q 90 120 180 80 T 300 20" strokeWidth="1.5" />

                {/* Moving Trucks represented as green/cyan dots */}
                <circle r="3.5" fill="var(--success)">
                  <animateMotion dur="8s" repeatCount="indefinite" path="M 20 20 L 80 50 L 150 30 L 220 90 L 280 120" />
                </circle>
                <circle r="3" fill="var(--info)">
                  <animateMotion dur="11s" begin="2s" repeatCount="indefinite" path="M 50 140 L 120 100 L 150 30 L 250 20" />
                </circle>
                <circle r="3.5" fill="var(--primary)">
                  <animateMotion dur="9s" repeatCount="indefinite" path="M 10 90 Q 90 120 180 80 T 300 20" />
                </circle>
              </svg>
              
              <span className="absolute bottom-2 left-2 text-[9px] font-mono text-muted-foreground font-bold">
                Golden Quadrilateral Hwy Grid
              </span>
            </div>
          </div>

          {/* Critical Alerts Center */}
          <div className="rounded border border-border bg-card p-5 shadow-sm font-display">
            <h2 className="text-xs font-black uppercase tracking-wider text-destructive mb-3 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-destructive animate-bounce" /> Critical Road Warnings
            </h2>
            <div className="space-y-3">
              {notifications.slice(0, 3).map(n => (
                <div key={n.id} className="border-l-4 border-destructive bg-destructive/5 pl-3 py-2 rounded-r space-y-0.5 border-y border-r border-border">
                  <p className="text-xs font-bold text-foreground tracking-wide uppercase">{n.title}</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{n.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExecutiveDashboard;
