import { body, validationResult } from 'express-validator';
import CashbookModel from '../models/cashbookModel.js';
import ExpenseCategoryModel from '../models/expenseCategoryModel.js';
import ExpenseModel from '../models/expenseModel.js';
import IncomeCategoryModel from '../models/incomeCategoryModel.js';
import IncomeModel from '../models/incomeModel.js';


const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


const categoryValidationRules = [
    body('user').notEmpty().withMessage('User is required'),
    body('expenseCategoryName')
        .optional()
        .trim()
        .isLength({ min: 1 })
        .withMessage('Expense category name is required'),
    body('incomeCategoryName')
        .optional()
        .trim()
        .isLength({ min: 1 })
        .withMessage('Income category name is required'),
];

const incomeValidationRules = [
    body('user').notEmpty().withMessage('User is required'),
    body('incomeName')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Income name is required'),
    body('incomeCategory')
        .notEmpty()
        .withMessage('Income category is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('incomeDate').isISO8601().toDate().withMessage('Invalid date format'),
];

const expenseValidationRules = [
    body('user').notEmpty().withMessage('User is required'),
    body('expenseName')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Expense name is required'),
    body('expenseCategory')
        .notEmpty()
        .withMessage('Expense category is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('expenseDate').isISO8601().toDate().withMessage('Invalid date format'),
];

export const addExpenseCategory = [
    ...categoryValidationRules,
    validateRequest,
    async (req, res) => {
        try {
            const { user, expenseCategoryName } = req.body;

            const expenseCategory = await ExpenseCategoryModel.create({
                username: user,
                title: expenseCategoryName,
            });

            res.status(201).json({ expenseCategory });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
];

export const getExpenseCategories = [
    body('user').notEmpty().withMessage('User is required'),
    validateRequest,
    async (req, res) => {
        try {
            const { user } = req.body;

            const expenseCategories = await ExpenseCategoryModel.find({
                username: user,
            });

            res.status(200).json({ expenseCategories });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
];

export const addIncomeCategory = [
    ...categoryValidationRules,
    validateRequest,
    async (req, res) => {
        try {
            const { user, incomeCategoryName } = req.body;

            console.log('req.body', req.body);

            const incomeCategory = await IncomeCategoryModel.create({
                username: user,
                title: incomeCategoryName,
            });

            res.status(201).json({ incomeCategory });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
];

export const getIncomeCategories = [
    body('user').notEmpty().withMessage('User is required'),
    validateRequest,
    async (req, res) => {
        try {
            const { user } = req.body;

            const incomeCategories = await IncomeCategoryModel.find({
                username: user,
            });

            res.status(200).json({ incomeCategories });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
];

export const addIncome = [
    ...incomeValidationRules,
    validateRequest,
    async (req, res) => {
        try {
            const { user, incomeName, incomeCategory, amount, incomeDate } =
                req.body;

            const income = await IncomeModel.create({
                username: user,
                title: incomeName,
                category: incomeCategory,
                amount,
                date: incomeDate,
            });

            const addEntryToCashbook = await CashbookModel.create({
                username: user,
                title: incomeName,
                category: incomeCategory,
                heading: 'Income',
                amount,
                date: incomeDate,
            });

            console.log('addEntryToCashbook', addEntryToCashbook);

            res.status(201).json({ income });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
];

export const addExpense = [
    ...expenseValidationRules,
    validateRequest,
    async (req, res) => {
        try {
            const { user, expenseName, expenseCategory, amount, expenseDate } =
                req.body;

            const expense = await ExpenseModel.create({
                username: user,
                title: expenseName,
                category: expenseCategory,
                amount,
                date: expenseDate,
            });

            const addEntryToCashbook = await CashbookModel.create({
                username: user,
                title: expenseName,
                category: expenseCategory,
                heading: 'Expense',
                amount,
                date: expenseDate,
            });

            console.log('addEntryToCashbook', addEntryToCashbook);

            res.status(201).json({ expense });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
];

export const getAllIncome = [
    body('user').notEmpty().withMessage('User is required'),
    validateRequest,
    async (req, res) => {
        try {
            const { user } = req.body;

            const incomes = await IncomeModel.find({ username: user });

            const getIncome = incomes.map(async (income) => {
                const findCategoryName = await IncomeCategoryModel.find({
                    _id: income.category,
                });

                return {
                    id: income._id,
                    title: income.title,
                    category: findCategoryName[0].title,
                    amount: income.amount,
                    date: income.date,
                };
            });

            res.status(200).json({ getIncome: await Promise.all(getIncome) });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
];

export const getAllExpense = [
    body('user').notEmpty().withMessage('User is required'),
    validateRequest,
    async (req, res) => {
        try {
            const { user } = req.body;

            const expenses = await ExpenseModel.find({ username: user });

            const getExpense = expenses.map(async (expense) => {
                const findCategoryName = await ExpenseCategoryModel.find({
                    _id: expense.category,
                });

                return {
                    id: expense._id,
                    title: expense.title,
                    category: findCategoryName[0].title,
                    amount: expense.amount,
                    date: expense.date,
                };
            });

            res.status(200).json({ getExpense: await Promise.all(getExpense) });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
];

export const getCashbookEntries = [
    body('user').notEmpty().withMessage('User is required'),
    validateRequest,
    async (req, res) => {
        try {
            const { user } = req.body;

            const cashbookEntries = await CashbookModel.find({
                username: user,
            });

            res.status(200).json({ cashbookEntries });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
];

export const getTotalIncome = [
    body('user').notEmpty().withMessage('User is required'),
    validateRequest,
    async (req, res) => {
        try {
            const { user } = req.body;

            const totalIncome = await CashbookModel.aggregate([
                { $match: { username: user, heading: 'Income' } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]);

            res.status(200).json({ totalIncome });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
];

export const getTotalExpenses = [
    body('user').notEmpty().withMessage('User is required'),
    validateRequest,
    async (req, res) => {
        try {
            const { user } = req.body;

            const totalExpenses = await CashbookModel.aggregate([
                { $match: { username: user, heading: 'Expense' } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]);

            res.status(200).json({ totalExpenses });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
];

export const getIncomeData = [
    body('user').notEmpty().withMessage('User is required'),
    validateRequest,
    async (req, res) => {
        try {
            const { user } = req.body;

            const incomeData = await IncomeModel.aggregate([
                { $match: { username: user } },
                {
                    $group: {
                        _id: '$date',
                        totalAmount: { $sum: '$amount' },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        date: '$_id',
                        amount: '$totalAmount',
                    },
                },
                { $sort: { date: 1 } },
            ]);

            res.status(200).json({ incomeData });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },
];

export const getExpenseData = [
    body('user').notEmpty().withMessage('User is required'),
    validateRequest,
    async (req, res) => {
        try {
            const { user } = req.body;

            const expenseData = await ExpenseModel.aggregate([
                { $match: { username: user } },
                {
                    $group: {
                        _id: '$date',
                        totalAmount: { $sum: '$amount' },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        date: '$_id',
                        amount: '$totalAmount',
                    },
                },
                { $sort: { date: 1 } },
            ]);

            res.status(200).json({ expenseData });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },
];
