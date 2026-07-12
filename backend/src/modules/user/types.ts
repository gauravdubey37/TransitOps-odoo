export interface RoleEntity {
  role_id: string; // UUID
  role_name: string;
  description: string | null;
}

export interface UserEntity {
  user_id: string; // UUID
  full_name: string;
  email: string;
  password_hash: string;
  role_id: string; // UUID
  phone: string | null;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserPayload {
  userId: string;
  email: string;
  role: string;
}
