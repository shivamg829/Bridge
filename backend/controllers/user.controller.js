const router = require('express').Router();
const User = require('../models/user.model');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/get-logged-user', authMiddleware, async (req, res) => {
    try {
        const userId = req.user?._id || req.body.userId;
        
        if (!userId) {
            return res.status(401).json({
                message: 'User not authenticated',
                success: false,
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false,
            });
        }
        
        const userObject = user.toObject();
        delete userObject.password;
        
        res.status(200).json({
            message: 'User fetched successfully',
            success: true,
            data: userObject
        });
    } catch (error) {
        console.error('Get logged user error:', error);
        res.status(500).json({
            message: 'Server error',
            success: false,
        });
    }
});

router.get('/get-all-users', authMiddleware, async (req, res) => {
    try {
        const currentUserId = req.user?._id || req.body.userId;
        
        if (!currentUserId) {
            return res.status(401).json({
                message: 'User not authenticated',
                success: false,
            });
        }

        const users = await User.find({ _id: { $ne: currentUserId } })
                               .select('-password');
        
        res.status(200).json({
            message: 'All users fetched successfully',
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({
            message: 'Server error',
            success: false,
        });
    }
});

module.exports = router;