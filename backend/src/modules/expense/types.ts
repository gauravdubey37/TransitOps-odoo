export enum ExpenseCategory {
  Toll = 'Toll',
  Parking = 'Parking',
  Maintenance = 'Maintenance',
  Meals = 'Meals',
  Other = 'Other'
}

export interface TripExpenseEntity {
  expense_id: string; // UUID
  trip_id: string; // UUID
  driver_id: string; // UUID
  category: ExpenseCategory;
  amount: number; // DECIMAL
  description: string | null;
  receipt_path: string | null;
  timestamp: Date;
}
