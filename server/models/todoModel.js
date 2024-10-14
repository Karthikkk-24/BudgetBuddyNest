import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
    },
    date: {
        type: String,
    },
}, { timestamps: true });

const TodoModel = mongoose.model('todos', todoSchema);

export default TodoModel;