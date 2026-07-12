import { UserService } from '../user/service';
import { LoginDTO, ChangePasswordDTO } from './dto';
import { AuthSession } from './types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';

export class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(data: LoginDTO): Promise<AuthSession> {
    const user = await this.userService.getUserForAuth(data.email);
    
    if (!user || !user.is_active) {
      throw { statusCode: 401, message: 'Invalid credentials or user disabled' };
    }

    const isMatch = await bcrypt.compare(data.password, user.password_hash);
    if (!isMatch) {
      throw { statusCode: 401, message: 'Invalid credentials' };
    }

    const role = await this.userService.getRoleById(user.role_id);
    const roleName = role ? role.role_name : 'Unknown';

    const payload = {
      userId: user.user_id,
      email: user.email,
      role: roleName
    };

    const accessToken = jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
    const refreshToken = jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.REFRESH_TOKEN_EXPIRES_IN });

    // Assuming expiresIn is roughly 900 seconds (15m) for parsing if needed, but we'll return the string.
    let expiresInSec = 900;
    if (env.JWT_EXPIRES_IN.endsWith('m')) {
      expiresInSec = parseInt(env.JWT_EXPIRES_IN) * 60;
    }

    return {
      accessToken,
      refreshToken,
      expiresIn: expiresInSec,
      user: payload
    };
  }

  async refreshToken(token: string): Promise<{ accessToken: string; expiresIn: number }> {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as any;
      
      const payload = {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role
      };

      const accessToken = jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
      
      let expiresInSec = 900;
      if (env.JWT_EXPIRES_IN.endsWith('m')) {
        expiresInSec = parseInt(env.JWT_EXPIRES_IN) * 60;
      }

      return { accessToken, expiresIn: expiresInSec };
    } catch (error) {
      throw { statusCode: 401, message: 'Invalid refresh token' };
    }
  }

  async changePassword(userId: string, data: ChangePasswordDTO): Promise<void> {
    const user = await this.userService.getUserById(userId);
    // Since getUserById strips password, we need the auth getter
    const authUser = await this.userService.getUserForAuth(user?.email || '');
    
    if (!authUser) {
      throw { statusCode: 404, message: 'User not found' };
    }

    const isMatch = await bcrypt.compare(data.currentPassword, authUser.password_hash);
    if (!isMatch) {
      throw { statusCode: 401, message: 'Invalid current password' };
    }

    await this.userService.updateUser(userId, {}, data.newPassword);
  }
}
