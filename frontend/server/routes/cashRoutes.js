import express from 'express';
import {
    addExpense,
    addExpenseCategory,
    addIncome,
    addIncomeCategory,
    getAllExpense,
    getAllIncome,
    getCashbookEntries,
    getExpenseCategories,
    getExpenseData,
    getIncomeCategories,
    getIncomeData,
    getTotalExpenses,
    getTotalIncome,
} from '../controllers/cashController.js';

const cashRouter = express.Router();

cashRouter.post('/addExpenseCategory', addExpenseCategory);
cashRouter.post('/getExpenseCategories', getExpenseCategories);
cashRouter.post('/addIncomeCategory', addIncomeCategory);
cashRouter.post('/getIncomeCategories', getIncomeCategories);
cashRouter.post('/addIncome', addIncome);
cashRouter.post('/addExpense', addExpense);
cashRouter.post('/getAllIncome', getAllIncome);
cashRouter.post('/getAllExpense', getAllExpense);
cashRouter.post('/getCashbookEntries', getCashbookEntries);
cashRouter.post('/getTotalIncome', getTotalIncome);
cashRouter.post('/getTotalExpenses', getTotalExpenses);
cashRouter.post('/getIncomeData', getIncomeData);
cashRouter.post('/getExpenseData', getExpenseData);

export default cashRouter;
