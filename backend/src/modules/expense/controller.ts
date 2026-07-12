import { Request, Response, NextFunction } from 'express';
import { ExpenseService } from './service';
import { sendSuccess } from '../../utils/response';
import { CreateExpenseSchema } from './validator';

export class ExpenseController {
  private service: ExpenseService;

  constructor() {
    this.service = new ExpenseService();
  }

  getAllExpenses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenses = await this.service.getAllExpenses();
      return sendSuccess(res, expenses, 'Expenses retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  getExpenseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const expense = await this.service.getExpenseById(id);
      
      if (!expense) {
        throw { statusCode: 404, message: 'Expense not found' };
      }
      
      return sendSuccess(res, expense, 'Expense retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  getExpensesByTripId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const expenses = await this.service.getExpensesByTripId(id);
      return sendSuccess(res, expenses, 'Trip expenses retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  createExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = CreateExpenseSchema.parse(req.body);
      const newExpense = await this.service.createExpense(data);
      return sendSuccess(res, newExpense, 'Expense created successfully', 201);
    } catch (error) {
      next(error);
    }
  };
}
