import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  Truck,
  MapPin,
  Flame,
  Receipt,
  Wrench,
  BarChart3,
  FileSpreadsheet,
  Settings,
} from 'lucide-react';

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  module: string;
}

export const Sidebar: React.FC = () => {
  const { hasPermission } = useAuth();

  const navigationItems: SidebarItem[] = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, module: 'Dashboard' },
    { name: 'Drivers', path: '/drivers', icon: Users, module: 'Drivers' },
    { name: 'Vehicles', path: '/vehicles', icon: Truck, module: 'Vehicles' },
    { name: 'Trips', path: '/trips', icon: MapPin, module: 'Trips' },
    { name: 'Fuel', path: '/fuel', icon: Flame, module: 'Fuel' },
    { name: 'Expenses', path: '/expenses', icon: Receipt, module: 'Expenses' },
    { name: 'Maintenance', path: '/maintenance', icon: Wrench, module: 'Maintenance' },
    { name: 'Analytics', path: '/analytics', icon: BarChart3, module: 'Analytics' },
    { name: 'Reports', path: '/reports', icon: FileSpreadsheet, module: 'Reports' },
    { name: 'Settings', path: '/settings', icon: Settings, module: 'Settings' },
  ];

  const visibleItems = navigationItems.filter(item => hasPermission(item.module, 'View'));

  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-border bg-card md:flex">
      <div className="flex h-16 flex-col justify-center border-b border-border px-6">
        <div className="flex items-center">
          <Truck className="mr-2 h-5 w-5 text-primary animate-pulse" />
          <span className="text-base font-black tracking-wider text-foreground font-display uppercase">TransitOps Co.</span>
        </div>
        <span className="text-[9px] font-bold text-accent tracking-widest uppercase font-mono mt-0.5">★ HORN OK PLEASE ★</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto font-display">
        {visibleItems.map(item => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center rounded px-3 py-2 text-sm font-bold tracking-wide uppercase transition-all ${
                isActive
                  ? 'bg-primary/10 text-primary border-l-4 border-primary shadow-[inset_0_0_10px_rgba(234,88,12,0.08)]'
                  : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
              }`
            }
          >
            <item.icon className="mr-3 h-4.5 w-4.5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      {/* Truck Art Good Luck Tassel / Slogan Ticker */}
      <div className="bg-muted/40 p-2 text-center border-t border-b border-border">
        <span className="text-[10px] font-bold text-amber-500 font-display block">★ MERA BHARAT MAHAN ★</span>
      </div>

      <div className="border-t border-border p-4 space-y-2">
        <span className="text-[9px] font-extrabold tracking-widest text-muted-foreground uppercase block font-display">DEPOT LOGBOOK (LIVE)</span>
        <div className="space-y-1.5 text-[11px] font-mono">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Gaddi Online (Vehicles)</span>
            <span className="font-bold text-success">312</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">On Route (Active Trips)</span>
            <span className="font-bold text-primary">154</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Depot Mileage</span>
            <span className="font-bold text-info">98%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
