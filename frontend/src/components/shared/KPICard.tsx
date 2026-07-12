import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    type: 'up' | 'down' | 'neutral';
  };
  comparisonText?: string;
  progress?: number; // percentage out of 100
  lastUpdated?: string;
  loading?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon,
  trend,
  comparisonText = 'vs last week',
  progress,
  lastUpdated,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="animate-pulse rounded-lg border border-white/[0.06] bg-[#131D2B] p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="h-8 w-8 rounded-full bg-muted" />
        </div>
        <div className="mt-4 h-8 w-32 rounded bg-muted" />
        <div className="mt-2 h-3 w-40 rounded bg-muted" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/[0.06] bg-[#131D2B] p-5 shadow-sm hover:shadow-md hover:border-white/[0.12] transition-all duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground">{title}</span>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-2xl font-extrabold tracking-tight text-white font-mono">{value}</span>
        {trend && (
          <span
            className={`inline-flex items-center text-xs font-bold ${
              trend.type === 'up'
                ? 'text-success'
                : trend.type === 'down'
                ? 'text-destructive'
                : 'text-muted-foreground'
            }`}
          >
            {trend.type === 'up' ? (
              <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" />
            ) : trend.type === 'down' ? (
              <ArrowDownRight className="h-3.5 w-3.5 mr-0.5" />
            ) : (
              <Minus className="h-3.5 w-3.5 mr-0.5" />
            )}
            {trend.value}%
          </span>
        )}
      </div>

      {/* Optional Mini Progress Bar */}
      {progress !== undefined && (
        <div className="mt-3 h-1.5 w-full rounded-full bg-white/[0.04] overflow-hidden">
          <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground border-t border-white/[0.04] pt-2">
        <span>{comparisonText}</span>
        {lastUpdated && <span className="font-mono text-[9px]">{lastUpdated}</span>}
      </div>
    </div>
  );
};
