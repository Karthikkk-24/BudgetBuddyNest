
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/authRoutes.js';
import cashRouter from './routes/cashRoutes.js';
import emiRouter from './routes/emiRoutes.js';
import todoRouter from './routes/todoRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/budgetbuddy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('Error connecting to MongoDB:', err));

app.use('/api/users', authRouter);
app.use('/api/users', todoRouter);
app.use('/api/finance', cashRouter);
app.use('/api/emi', emiRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
