import { Router } from 'express';
import { ExpenseController } from './controller';

const router = Router();
const controller = new ExpenseController();

router.get('/', controller.getAllExpenses);
router.get('/:id', controller.getExpenseById);
router.post('/', controller.createExpense);

// Exposing trip expenses directly here
router.get('/trip/:id', controller.getExpensesByTripId);

export default router;
