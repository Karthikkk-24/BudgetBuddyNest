import mongoose from 'mongoose';

const AuthTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: String
    },
}, { timestamps: true });

export default mongoose.model('AuthTokenCollection', AuthTokenSchema);
