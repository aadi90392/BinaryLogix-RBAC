const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        let user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.phone = phone || user.phone;
        user.address = address || user.address;

        if (req.file) {
            user.profilePhoto = `/uploads/${req.file.filename}`;
        }

        await user.save();
        
        const updatedUser = await User.findById(req.user.id).select('-password');
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;
        const creatorRole = req.user.role;

        if (creatorRole === 'Manager' && (role === 'Admin' || role === 'Manager')) {
            return res.status(403).json({ message: 'Access Denied' });
        }

        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role: role || 'User'
        });

        await newUser.save();
        res.status(201).json({ message: 'User Created' });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.editUser = async (req, res) => {
    try {
        const { name, phone, role } = req.body;
        const targetUserId = req.params.id;
        const creatorRole = req.user.role;

        let userToEdit = await User.findById(targetUserId);
        if (!userToEdit) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (creatorRole === 'Manager' && (userToEdit.role === 'Admin' || userToEdit.role === 'Manager')) {
            return res.status(403).json({ message: 'Access Denied. You can only edit normal Users.' });
        }

        userToEdit.name = name || userToEdit.name;
        userToEdit.phone = phone || userToEdit.phone;
        
        if (role && creatorRole === 'Admin') {
            userToEdit.role = role;
        }

        await userToEdit.save();
        res.status(200).json({ message: 'User updated successfully' });
        
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};