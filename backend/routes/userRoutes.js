const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/profile', verifyToken, userController.getProfile);
router.put('/profile', verifyToken, upload.single('profilePhoto'), userController.updateProfile);
router.post('/create', verifyToken, authorizeRoles('Admin', 'Manager'), userController.createUser);
router.get('/all', verifyToken, authorizeRoles('Admin', 'Manager'), userController.getAllUsers);
router.put('/edit/:id', verifyToken, authorizeRoles('Admin', 'Manager'), userController.editUser);
module.exports = router;