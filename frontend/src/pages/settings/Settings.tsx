import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { SystemSettings, User } from '../../types';
import { DataTable } from '../../components/shared/DataTable';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Sliders, Users, Save } from 'lucide-react';

const settingsSchema = z.object({
  orgName: z.string().min(2, 'Org name must be at least 2 characters'),
  timezone: z.string(),
  currency: z.string(),
  distanceUnit: z.enum(['km', 'miles']),
  fuelUnit: z.enum(['L', 'gallons']),
  carbonUnit: z.enum(['kg', 'lbs']),
  theme: z.enum(['Light', 'Dark', 'System']),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export const SettingsPage: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: settings, isLoading: settingsLoading } = useQuery<SystemSettings>({
    queryKey: ['settings'],
    queryFn: () => api.get<SystemSettings>('/settings'),
  });

  const { data: users = [], isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => api.get<User[]>('/users'),
  });

  const updateMutation = useMutation({
    mutationFn: (newSettings: SettingsFormValues) => api.patch<SystemSettings>('/settings', newSettings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
  });

  // Load defaults
  React.useEffect(() => {
    if (settings) {
      setValue('orgName', settings.orgName);
      setValue('timezone', settings.timezone);
      setValue('currency', settings.currency);
      setValue('distanceUnit', settings.distanceUnit);
      setValue('fuelUnit', settings.fuelUnit);
      setValue('carbonUnit', settings.carbonUnit);
      setValue('theme', settings.theme);
    }
  }, [settings, setValue]);

  const onSubmit = (values: SettingsFormValues) => {
    updateMutation.mutate(values);
  };

  const userColumns = [
    { header: 'Name', accessor: 'name' as keyof User, sortable: true },
    { header: 'Email', accessor: 'email' as keyof User, sortable: true },
    { header: 'Department', accessor: 'department' as keyof User },
    {
      header: 'Role',
      accessor: (row: User) => (
        <span className="inline-flex items-center rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
          {row.role}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: (row: User) => (
        <span className={`font-semibold ${row.status === 'Active' ? 'text-success' : 'text-muted-foreground'}`}>
          {row.status}
        </span>
      ),
    },
  ];

  if (settingsLoading || usersLoading) {
    return <div className="p-6 text-center text-xs text-muted-foreground">Loading configurations...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings & Administration</h1>
        <p className="text-xs text-muted-foreground">Configure organization-wide defaults, measurement systems, and manage console operators.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* System Settings Form */}
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm lg:col-span-1">
          <h2 className="text-sm font-semibold mb-4 border-b border-border pb-2 flex items-center gap-1.5">
            <Sliders className="h-4.5 w-4.5 text-primary" /> General System Configuration
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-muted-foreground mb-1">Organization Name</label>
              <input
                {...register('orgName')}
                className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.orgName && <p className="text-[10px] text-destructive mt-0.5">{errors.orgName.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-muted-foreground mb-1">System Timezone</label>
                <select
                  {...register('timezone')}
                  className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="Asia/Kolkata">IST (Asia/Kolkata)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-muted-foreground mb-1">Currency Code</label>
                <select
                  {...register('currency')}
                  className="w-full rounded border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 border-t border-border pt-3">
              <h3 className="font-semibold text-foreground">Measurement Units</h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] text-muted-foreground mb-0.5">Distance</label>
                  <select
                    {...register('distanceUnit')}
                    className="w-full rounded border border-border bg-background px-2 py-1 text-foreground"
                  >
                    <option value="km">km</option>
                    <option value="miles">miles</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-muted-foreground mb-0.5">Fuel</label>
                  <select
                    {...register('fuelUnit')}
                    className="w-full rounded border border-border bg-background px-2 py-1 text-foreground"
                  >
                    <option value="L">liters (L)</option>
                    <option value="gallons">gallons</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-muted-foreground mb-0.5">Carbon</label>
                  <select
                    {...register('carbonUnit')}
                    className="w-full rounded border border-border bg-background px-2 py-1 text-foreground"
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground shadow hover:bg-primary/95 transition-colors gap-1.5"
              >
                <Save className="h-4 w-4" />
                {updateMutation.isPending ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>

        {/* User Operator Management */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <h2 className="text-sm font-semibold mb-4 border-b border-border pb-2 flex items-center gap-1.5">
              <Users className="h-4.5 w-4.5 text-primary" /> Operators & Console Access
            </h2>
            <DataTable
              data={users}
              columns={userColumns}
              searchKey="name"
              searchPlaceholder="Search system operators..."
              rowsPerPage={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
