import { Request, Response, NextFunction } from 'express';
import { UserService } from './service';
import { sendSuccess } from '../../utils/response';
import { CreateUserSchema, UpdateUserSchema } from './validator';

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.service.getAllUsers();
      return sendSuccess(res, users, 'Users retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await this.service.getUserById(id);
      
      if (!user) {
        throw { statusCode: 404, message: 'User not found' };
      }
      
      return sendSuccess(res, user, 'User retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = CreateUserSchema.parse(req.body);
      const newUser = await this.service.createUser(data);
      return sendSuccess(res, newUser, 'User created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = UpdateUserSchema.parse(req.body);
      const updatedUser = await this.service.updateUser(id, data);
      return sendSuccess(res, updatedUser, 'User updated successfully');
    } catch (error) {
      next(error);
    }
  };
}
