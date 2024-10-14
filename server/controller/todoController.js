import { body, validationResult } from 'express-validator';
import TodoModel from '../models/todoModel.js';

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validation rules
const todoValidationRules = [
    body('todoTitle').trim().notEmpty().withMessage('Todo title is required'),
    body('user').notEmpty().withMessage('User is required'),
    body('date')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid date format'),
];

const userValidationRule = [
    body('user').notEmpty().withMessage('User is required'),
];

const updateTodoValidationRules = [
    body('id').isMongoId().withMessage('Invalid todo ID'),
    body('status').isIn(['pending', 'completed']).withMessage('Invalid status'),
];

export const insertTodo = [
    ...todoValidationRules,
    validateRequest,
    async (req, res) => {
        try {
            const { todoTitle, user, date } = req.body;

            const insertTodo = await TodoModel.create({
                title: todoTitle,
                username: user,
                date: date,
            });

            res.status(201).json(insertTodo);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
];

export const getPendingTodos = [
    ...userValidationRule,
    validateRequest,
    async (req, res) => {
        try {
            const { user } = req.body;

            const getTodos = await TodoModel.find({
                username: user,
                status: 'pending',
            });

            res.status(200).json({ getTodos });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
];

export const getCompletedTodos = [
    ...userValidationRule,
    validateRequest,
    async (req, res) => {
        try {
            const { user } = req.body;

            const getTodos = await TodoModel.find({
                username: user,
                status: 'completed',
            });

            res.status(200).json({ getTodos });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
];

export const updateTodo = [
    ...updateTodoValidationRules,
    validateRequest,
    async (req, res) => {
        try {
            const { id, status } = req.body;
            console.log('id', id, 'status', status);
            const updateTodo = await TodoModel.findByIdAndUpdate(id, {
                status,
            });
            res.status(200).json({ updateTodo });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
];

export const getTodayTasks = [
    ...userValidationRule,
    validateRequest,
    async (req, res) => {
        try {
            const { user } = req.body;

            const getTodo = await TodoModel.find({
                username: user,
                status: 'pending',
            });

            const count = getTodo.length;

            res.status(200).json({ count });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
];

export const getTodayCompletedTasks = [
    ...userValidationRule,
    validateRequest,
    async (req, res) => {
        try {
            const { user } = req.body;

            const getTodo = await TodoModel.find({
                username: user,
                status: 'completed',
            });

            const count = getTodo.length;

            res.status(200).json({ count });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
];
