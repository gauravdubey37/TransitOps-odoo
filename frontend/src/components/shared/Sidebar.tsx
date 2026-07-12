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
  ShieldCheck,
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
    <aside className="hidden h-screen w-64 flex-col border-r border-white/[0.06] bg-[#131D2B] md:flex">
      <div className="flex h-16 items-center justify-start border-b border-white/[0.06] px-6">
        <ShieldCheck className="mr-2 h-6 w-6 text-primary shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
        <span className="text-lg font-extrabold tracking-tight text-white">TransitOps</span>
      </div>
      <nav className="flex-1 space-y-1.5 px-3 py-4 overflow-y-auto">
        {visibleItems.map(item => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center rounded px-3 py-2 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary/10 text-primary border-l-2 border-primary shadow-[inset_0_0_10px_rgba(59,130,246,0.05)]'
                  : 'text-muted-foreground hover:bg-white/[0.02] hover:text-white'
              }`
            }
          >
            <item.icon className="mr-3 h-4.5 w-4.5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/[0.06] p-4 space-y-2">
        <span className="text-[9px] font-extrabold tracking-widest text-muted-foreground uppercase block">LIVE STATUS</span>
        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Vehicles Online</span>
            <span className="font-mono font-bold text-success">312</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Active Trips</span>
            <span className="font-mono font-bold text-primary">154</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Fleet Efficiency</span>
            <span className="font-mono font-bold text-cyan-400">98%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
