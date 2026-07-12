import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import type { Trip, FuelLog } from '../../types';
import { KPICard } from '../../components/shared/KPICard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { BarChart3, TrendingUp, Sparkles, Activity } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { data: trips = [] } = useQuery<Trip[]>({
    queryKey: ['trips'],
    queryFn: () => api.get<Trip[]>('/trips'),
  });

  const { data: fuelLogs = [] } = useQuery<FuelLog[]>({
    queryKey: ['fuelLogs'],
    queryFn: () => api.get<FuelLog[]>('/fuelLogs'),
  });

  // Calculate dynamic stats
  const totalCarbon = trips.reduce((sum, t) => sum + (t.carbonEmissionKg || 0), 0);
  const totalDistance = trips.reduce((sum, t) => sum + (t.distanceKm || 0), 0);
  const averageCarbonPerKm = totalDistance > 0 ? (totalCarbon / totalDistance).toFixed(3) : '0';

  // Group trip carbon emissions by trip number or route for chart
  const carbonChartData = trips.slice(-6).map(t => ({
    name: t.tripNumber,
    carbon: t.carbonEmissionKg,
    distance: t.distanceKm,
  }));

  // Group fuel logs cost & liters for refuel progression chart
  const fuelChartData = fuelLogs.slice(-6).map((f, i) => ({
    name: `Refuel ${i + 1}`,
    liters: f.liters,
    cost: f.cost,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Advanced Analytics Engine</h1>
        <p className="text-xs text-muted-foreground">Audit carbon offset benchmarks, fuel economy rates, and fleet utilization metrics.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <KPICard
          title="All-Time Carbon Footprint"
          value={`${totalCarbon.toLocaleString()} kg`}
          icon={<Activity className="h-4 w-4 text-emerald-500" />}
          comparisonText="Total platform CO₂ emissions"
        />
        <KPICard
          title="CO₂ Intensity Index"
          value={`${averageCarbonPerKm} kg/km`}
          icon={<TrendingUp className="h-4 w-4 text-primary" />}
          comparisonText="Average carbon per kilometer run"
        />
        <KPICard
          title="Refueling Frequency"
          value={fuelLogs.length}
          icon={<BarChart3 className="h-4 w-4 text-info" />}
          comparisonText="Total fuel records analyzed"
        />
      </div>

      {/* AI Assistant recommendation banner */}
      <div className="rounded-lg border border-primary/20 bg-primary/10 p-4 text-xs flex gap-3 text-primary">
        <Sparkles className="h-5 w-5 shrink-0 animate-pulse" />
        <div>
          <h4 className="font-bold">AI Fleet Intelligence advisory</h4>
          <p className="text-[10px] mt-0.5 leading-relaxed">
            By shifting 15% of your cargo load from heavy-duty trucks to hybrid containers on the NH48 route, you can offset up to 450 kg of carbon emissions next week.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Carbon & Distance Chart */}
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <h3 className="text-xs font-semibold mb-4 text-muted-foreground tracking-wide uppercase">
            Carbon Emissions vs. Route Distance
          </h3>
          <div className="h-64 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={carbonChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="fill-muted-foreground text-[10px]" />
                <YAxis className="fill-muted-foreground text-[10px]" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                <Bar dataKey="carbon" fill="hsl(var(--primary))" name="Carbon (kg)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="distance" fill="hsl(var(--accent))" name="Distance (km)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Refuel Trend Chart */}
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <h3 className="text-xs font-semibold mb-4 text-muted-foreground tracking-wide uppercase">
            Refueling Quantities & Costs Trend
          </h3>
          <div className="h-64 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fuelChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="fill-muted-foreground text-[10px]" />
                <YAxis className="fill-muted-foreground text-[10px]" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                <Area type="monotone" dataKey="cost" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive)/10)" name="Cost (INR)" />
                <Area type="monotone" dataKey="liters" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/10)" name="Liters (L)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnalyticsDashboard;
