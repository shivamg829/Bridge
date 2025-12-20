const router = require('express').Router();
const User = require('../models/user.model');
const authMiddleware = require('../middleware/auth.middleware');

// get Details
router.get('/get-logged-user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false,
            });
        }
        res.status(200).json({
            message: 'User fetched successfully',
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Get logged user error:', error);
        res.status(500).json({
            message: 'Server error',
            success: false,
        });
    }
});