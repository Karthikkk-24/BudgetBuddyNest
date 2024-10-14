import mongoose from 'mongoose';

const emiSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        reminder: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const EMI = mongoose.model('EMI', emiSchema);

export default EMI;
