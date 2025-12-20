const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, profilePicture } = req.body;
        
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ 
                message: 'All required fields must be provided',
                success: false 
            });
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'User already exists',
                success: false 
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            profilePicture: profilePicture || '',
        });
        
        await newUser.save();
        
        res.status(201).json({ 
            message: 'User registered successfully',
            success: true,
            userId: newUser._id
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: 'Invalid input data',
                success: false,
            });
        }
        
        res.status(500).json({ 
            message: 'Server error',
            success: false,
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email and password are required',
                success: false 
            });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ 
                message: 'Invalid email or password',
                success: false 
            });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ 
                message: 'Invalid email or password',
                success: false 
            });
        }
        
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT secret is not configured');
        }
        
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '90d' }
        );
        
        res.status(200).json({
            message: 'Login successful',
            success: true,
            token,
            user: { 
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profilePicture: user.profilePicture
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        
        if (error.message === 'JWT secret is not configured') {
            return res.status(500).json({
                message: 'Server configuration error',
                success: false,
            });
        }
        
        res.status(500).json({
            message: 'Server error',
            success: false,
        });
    }
});

module.exports = router;