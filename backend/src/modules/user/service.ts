import { UserRepository } from './repository';
import { UserEntity, RoleEntity } from './types';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import bcrypt from 'bcrypt';
import { db } from '../../config/database';

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async getAllUsers(): Promise<Omit<UserEntity, 'password_hash'>[]> {
    const users = await this.repository.findAll();
    return users.map(({ password_hash, ...rest }) => rest);
  }

  async getUserById(id: string): Promise<Omit<UserEntity, 'password_hash'> | null> {
    const user = await this.repository.findById(id);
    if (!user) return null;
    const { password_hash, ...rest } = user;
    return rest;
  }
  
  async getUserForAuth(email: string): Promise<UserEntity | null> {
    return this.repository.findByEmail(email);
  }

  async getRoleById(id: string): Promise<RoleEntity | null> {
    const query = `SELECT * FROM roles WHERE role_id = $1`;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  async createUser(data: CreateUserDTO): Promise<Omit<UserEntity, 'password_hash'>> {
    const existingEmail = await this.repository.findByEmail(data.email);
    if (existingEmail) {
      throw { statusCode: 422, message: 'User with this email already exists' };
    }

    const existingRole = await this.getRoleById(data.role_id);
    if (!existingRole) {
      throw { statusCode: 422, message: 'Invalid role ID' };
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const newUser = await this.repository.create(data, passwordHash);
    const { password_hash, ...rest } = newUser;
    return rest;
  }

  async updateUser(id: string, data: UpdateUserDTO, newPassword?: string): Promise<Omit<UserEntity, 'password_hash'>> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw { statusCode: 404, message: 'User not found' };
    }

    if (data.email && data.email !== existing.email) {
      const emailCheck = await this.repository.findByEmail(data.email);
      if (emailCheck) {
        throw { statusCode: 422, message: 'User with this email already exists' };
      }
    }
    
    if (data.role_id && data.role_id !== existing.role_id) {
      const roleCheck = await this.getRoleById(data.role_id);
      if (!roleCheck) {
        throw { statusCode: 422, message: 'Invalid role ID' };
      }
    }

    let passwordHash: string | undefined;
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(newPassword, salt);
    }

    const updated = await this.repository.update(id, data, passwordHash);
    if (!updated) {
      throw { statusCode: 500, message: 'Failed to update user' };
    }

    const { password_hash, ...rest } = updated;
    return rest;
  }
}
