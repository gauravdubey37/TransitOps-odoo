export interface DepotEntity {
  id: string; // UUID
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  latitude: number | null;
  longitude: number | null;
  created_at?: Date;
  updated_at?: Date;
}
