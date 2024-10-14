import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
    },
}, { timestamps: true });

const IncomeModel = mongoose.model('income', incomeSchema);

export default IncomeModel;