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
    <aside className="hidden h-screen w-64 flex-col border-r border-border bg-card md:flex">
      <div className="flex h-16 items-center justify-start border-b border-border px-6">
        <ShieldCheck className="mr-2 h-6 w-6 text-primary" />
        <span className="text-lg font-bold tracking-tight text-foreground">TransitOps</span>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-4 overflow-y-auto">
        {visibleItems.map(item => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-border p-4">
        <div className="rounded bg-muted p-3 text-center text-xs text-muted-foreground">
          <p className="font-semibold text-foreground">Version 1.0.0 (Local)</p>
          <p className="mt-0.5">Development Environment</p>
        </div>
      </div>
    </aside>
  );
};
