import { Request, Response, NextFunction } from 'express';
import { AuthService } from './service';
import { sendSuccess } from '../../utils/response';
import { LoginSchema, RefreshTokenSchema, ChangePasswordSchema } from './validator';

export class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = LoginSchema.parse(req.body);
      const session = await this.service.login(data);
      return sendSuccess(res, session, 'Login successful');
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = RefreshTokenSchema.parse(req.body);
      const session = await this.service.refreshToken(data.refreshToken);
      return sendSuccess(res, session, 'Token refreshed successfully');
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // In MVP, logout is mostly handled client-side by destroying the token
      return sendSuccess(res, {}, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  };

  getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return sendSuccess(res, req.user, 'Current user retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = ChangePasswordSchema.parse(req.body);
      if (!req.user) {
        throw { statusCode: 401, message: 'Not authenticated' };
      }
      await this.service.changePassword(req.user.userId, data);
      return sendSuccess(res, {}, 'Password changed successfully');
    } catch (error) {
      next(error);
    }
  };
}
