import React from 'react';
import { Outlet } from 'react-router-dom';
import { Truck } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 overflow-hidden font-display">
      {/* Animated Route Network Background */}
      <div className="absolute inset-0 opacity-40 z-0">
        <svg className="h-full w-full stroke-primary/15 fill-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100,200 C300,150 400,-50 800,250 C1200,550 1300,300 2000,900" strokeWidth="1.5" strokeDasharray="6 6" />
          <path d="M100,-100 C300,400 100,700 900,550 C1300,450 1500,900 2100,300" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M300,950 C700,550 900,950 1300,350 C1600,50 1800,-150 2300,150" strokeWidth="2" strokeDasharray="8 8" />

          {/* Animated moving nodes (Vehicles/Trips) */}
          <circle r="4.5" fill="var(--primary)" className="animate-pulse">
            <animateMotion dur="15s" repeatCount="indefinite" path="M-100,200 C300,150 400,-50 800,250 C1200,550 1300,300 2000,900" />
          </circle>
          <circle r="3.5" fill="var(--info)">
            <animateMotion dur="20s" begin="3s" repeatCount="indefinite" path="M-100,200 C300,150 400,-50 800,250 C1200,550 1300,300 2000,900" />
          </circle>
          <circle r="3.5" fill="var(--info)">
            <animateMotion dur="18s" repeatCount="indefinite" path="M100,-100 C300,400 100,700 900,550 C1300,450 1500,900 2100,300" />
          </circle>
          <circle r="5" fill="var(--success)">
            <animateMotion dur="12s" begin="5s" repeatCount="indefinite" path="M100,-100 C300,400 100,700 900,550 C1300,450 1500,900 2100,300" />
          </circle>
          <circle r="4.5" fill="var(--success)">
            <animateMotion dur="22s" repeatCount="indefinite" path="M300,950 C700,550 900,950 1300,350 C1600,50 1800,-150 2300,150" />
          </circle>
          <circle r="3.5" fill="var(--primary)">
            <animateMotion dur="14s" begin="2s" repeatCount="indefinite" path="M300,950 C700,550 900,950 1300,350 C1600,50 1800,-150 2300,150" />
          </circle>
        </svg>
      </div>

      {/* Floating Login Card Container */}
      <div className="relative z-10 w-full max-w-md space-y-8 rounded border border-border bg-card/90 p-8 shadow-[0_0_50px_rgba(234,88,12,0.08)] backdrop-blur-md">
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10 border border-primary/20 text-primary shadow-[0_0_15px_rgba(234,88,12,0.2)]">
            <Truck className="h-6 w-6 animate-pulse" />
          </div>
          <h2 className="mt-5 text-center text-3xl font-black tracking-widest text-foreground uppercase">
            TransitOps Co.
          </h2>
          <p className="mt-1 text-center text-[10px] uppercase tracking-widest text-accent font-bold font-mono">
            ★ HORN OK PLEASE ★
          </p>
          <p className="mt-2 text-center text-xs text-muted-foreground font-bold">
            SAFE JOURNEY • HAPPY JOURNEY • NO ENTRY REGISTER
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default AuthLayout;
