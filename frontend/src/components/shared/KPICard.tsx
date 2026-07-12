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
  loading?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon,
  trend,
  comparisonText = 'vs last week',
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="animate-pulse rounded-lg border border-border bg-card p-5 shadow-sm">
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
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline space-x-2">
        <span className="text-2xl font-bold tracking-tight text-foreground">{value}</span>
        {trend && (
          <span
            className={`inline-flex items-center text-xs font-semibold ${
              trend.type === 'up'
                ? 'text-success'
                : trend.type === 'down'
                ? 'text-destructive'
                : 'text-muted-foreground'
            }`}
          >
            {trend.type === 'up' ? (
              <ArrowUpRight className="h-3 w-3 mr-0.5" />
            ) : trend.type === 'down' ? (
              <ArrowDownRight className="h-3 w-3 mr-0.5" />
            ) : (
              <Minus className="h-3 w-3 mr-0.5" />
            )}
            {trend.value}%
          </span>
        )}
      </div>
      <p className="mt-1 text-[11px] text-muted-foreground">{comparisonText}</p>
    </div>
  );
};
