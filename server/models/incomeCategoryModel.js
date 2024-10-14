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
}, { timestamps: true });

const IncomeCategoryModel = mongoose.model('incomeCategory', incomeSchema);

export default IncomeCategoryModel;