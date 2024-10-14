import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import authTokenModel from '../models/authTokenModel.js';
import User from '../models/userModel.js';

async function createUniqueId() {
    let uniqueId = Math.random().toString(36).substr(2, 9);
    const existingUser = await User.findOne({ uniqueId });
    if (existingUser) {
        return createUniqueId();
    }
    return uniqueId;
}

async function createUserAuthToken(user) {
    const token = await generateAuthToken(user);
    return token;
}

function generateRandomString(length) {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

async function generateAuthToken(user) {
    const authToken = generateRandomString(30);

    const checkAuthToken = async () => {
        const existingToken = await authTokenModel.findOne({
            token: authToken,
        });
        if (existingToken) {
            return generateAuthToken();
        } else {
            const newAuthToken = new authTokenModel({
                token: authToken,
                user: user._id,
            });
            await newAuthToken.save();
            return authToken;
        }
    };

    return checkAuthToken();
}

function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const validateRegistration = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters'),
    body('email').trim().isEmail().withMessage('Invalid email address'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
];

export const validateLogin = [
    body('email').trim().isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
];

export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        console.log('Registration attempt - email:', email);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }

        const uniqueId = await createUniqueId();
        console.log('Generated uniqueId:', uniqueId);

        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            uniqueId,
            createdAt: getFormattedDate(),
        });

        await newUser.save();
        console.log('User registered successfully:', newUser.email);
        res.status(201).json({
            message: 'User registered successfully',
            userId: newUser._id,
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log('Login attempt - email:', email);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('User found:', user.email);
        console.log('Comparing passwords...');
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match result:', isMatch);

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = await createUserAuthToken(user);
        console.log('Login successful, token generated:', token);

        res.status(200).json({
            message: 'Login successful',
            userId: user._id,
            token,
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
