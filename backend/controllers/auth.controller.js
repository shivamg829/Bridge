const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

router.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'User already exists',
                success: false 
            });
        }
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            profilePicture: req.body.profilePicture || '',
        });
        
        await newUser.save();
        
        res.status(201).json({ 
            message: 'User registered successfully',
            success: true,
            userId: newUser._id
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        
        res.status(500).json({ 
            message: 'Server error',
            success: false,
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ 
                message: 'Invalid email or password',
                success: false 
            });
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ 
                message: 'Invalid email or password',
                success: false 
            });
        }
        res.status(200).json({
            message: 'Login successful',
            success: true,
            userId: user._id
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            success: false,
        });
    }
});

module.exports = router;