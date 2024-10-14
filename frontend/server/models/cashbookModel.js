import mongoose from 'mongoose';

const cashbookSchema = new mongoose.Schema({
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
    heading: {
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

const CashbookModel = mongoose.model('cashbook', cashbookSchema);

export default CashbookModel;