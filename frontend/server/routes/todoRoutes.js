import express from 'express';
import {
    getCompletedTodos,
    getPendingTodos,
    getTodayCompletedTasks,
    getTodayTasks,
    insertTodo,
    updateTodo,
} from '../controllers/todoController.js';

const todoRouter = express.Router();

todoRouter.post('/insertTodo', insertTodo);
todoRouter.post('/getPendingTodos', getPendingTodos);
todoRouter.post('/getCompletedTodos', getCompletedTodos);
todoRouter.post('/updateTodo', updateTodo);
todoRouter.post('/getTodayTasks', getTodayTasks);
todoRouter.post('/getTodayCompletedTasks', getTodayCompletedTasks);

export default todoRouter;
