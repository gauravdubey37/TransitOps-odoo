import React from 'react';

type StatusType =
  | 'Available'
  | 'Assigned'
  | 'Completed'
  | 'Delayed'
  | 'Maintenance'
  | 'Fatigued'
  | 'Cancelled'
  | 'In Transit'
  | 'Active'
  | 'Inactive'
  | 'Out of Service'
  | 'Draft';

interface StatusBadgeProps {
  status: StatusType;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getColors = () => {
    switch (status) {
      case 'Available':
      case 'Completed':
      case 'Active':
        return 'bg-success/10 text-success border-success/20';
      case 'Assigned':
      case 'In Transit':
        return 'bg-info/10 text-info border-info/20';
      case 'Delayed':
      case 'Fatigued':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Maintenance':
      case 'Cancelled':
      case 'Inactive':
      case 'Out of Service':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold tracking-wide ${getColors()}`}
    >
      {status}
    </span>
  );
};
