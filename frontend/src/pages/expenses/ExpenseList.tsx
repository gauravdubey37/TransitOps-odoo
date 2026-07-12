import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import type { Expense, Driver, Trip } from '../../types';
import { DataTable } from '../../components/shared/DataTable';
import { KPICard } from '../../components/shared/KPICard';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { DollarSign, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const ExpenseList: React.FC = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: expenses = [], isLoading: expensesLoading } = useQuery<Expense[]>({
    queryKey: ['expenses'],
    queryFn: () => api.get<Expense[]>('/expenses'),
  });

  const { data: drivers = [] } = useQuery<Driver[]>({
    queryKey: ['drivers'],
    queryFn: () => api.get<Driver[]>('/drivers'),
  });

  const { data: trips = [] } = useQuery<Trip[]>({
    queryKey: ['trips'],
    queryFn: () => api.get<Trip[]>('/trips'),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'Approved' | 'Rejected' }) =>
      api.patch<Expense>(`/expenses/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      alert('Expense status updated successfully!');
    },
  });

  const getDriverName = (driverId: string) => {
    return drivers.find(d => d.id === driverId)?.name || driverId;
  };

  const getTripNumber = (tripId: string) => {
    return trips.find(t => t.id === tripId)?.tripNumber || `Trip-${tripId}`;
  };

  const pendingExpenses = expenses.filter(e => e.status === 'Pending');
  const approvedExpenses = expenses.filter(e => e.status === 'Approved');

  const totalPendingAmount = pendingExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const totalApprovedAmount = approvedExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  const handleAction = (id: string, action: 'Approved' | 'Rejected') => {
    updateStatusMutation.mutate({ id, status: action });
  };

  const canApprove = user?.role === 'Administrator' || user?.role === 'Dispatcher';

  const columns = [
    {
      header: 'Trip Number',
      accessor: (row: Expense) => getTripNumber(row.tripId),
      sortable: true,
    },
    {
      header: 'Driver',
      accessor: (row: Expense) => getDriverName(row.driverId),
      sortable: true,
    },
    {
      header: 'Date',
      accessor: (row: Expense) => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
    {
      header: 'Type',
      accessor: 'type' as keyof Expense,
      sortable: true,
    },
    {
      header: 'Amount',
      accessor: (row: Expense) => `₹${row.amount.toLocaleString()}`,
      sortable: true,
    },
    {
      header: 'Description',
      accessor: 'description' as keyof Expense,
    },
    {
      header: 'Status',
      accessor: (row: Expense) => <StatusBadge status={row.status === 'Approved' ? 'Completed' : row.status === 'Pending' ? 'Assigned' : 'Cancelled'} />,
    },
    {
      header: 'Actions',
      accessor: (row: Expense) => {
        if (row.status !== 'Pending') {
          return <span className="text-[10px] text-muted-foreground italic">Processed</span>;
        }
        if (!canApprove) {
          return <span className="text-[10px] text-muted-foreground italic">Read-only</span>;
        }
        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleAction(row.id, 'Approved')}
              disabled={updateStatusMutation.isPending}
              className="inline-flex items-center justify-center rounded bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success hover:bg-success/20 disabled:opacity-50"
            >
              Approve
            </button>
            <button
              onClick={() => handleAction(row.id, 'Rejected')}
              disabled={updateStatusMutation.isPending}
              className="inline-flex items-center justify-center rounded bg-destructive/15 px-2 py-0.5 text-[10px] font-semibold text-destructive hover:bg-destructive/20 disabled:opacity-50"
            >
              Reject
            </button>
          </div>
        );
      },
    },
  ];

  if (expensesLoading) {
    return <div className="p-6 text-center text-xs text-muted-foreground">Loading expense sheets...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Expense Claims & Auditing</h1>
        <p className="text-xs text-muted-foreground">Audit driver toll claims, fuel receipts, meals, and ad-hoc vehicle repairs.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <KPICard
          title="Pending Claims"
          value={pendingExpenses.length}
          icon={<Clock className="h-4 w-4 text-warning" />}
          comparisonText={`₹${totalPendingAmount.toLocaleString()} awaiting audit`}
        />
        <KPICard
          title="Approved Disbursements"
          value={`₹${totalApprovedAmount.toLocaleString()}`}
          icon={<DollarSign className="h-4 w-4 text-success" />}
          comparisonText={`${approvedExpenses.length} claims processed`}
        />
        <KPICard
          title="Total Claims Logged"
          value={expenses.length}
          icon={<CheckCircle2 className="h-4 w-4 text-primary" />}
          comparisonText="All-time logged claims count"
        />
      </div>

      <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <DataTable
          data={expenses}
          columns={columns}
          searchKey="type"
          searchPlaceholder="Search by expense type (Toll, Food, Maintenance, etc.)..."
          rowsPerPage={8}
        />
      </div>
    </div>
  );
};
export default ExpenseList;
