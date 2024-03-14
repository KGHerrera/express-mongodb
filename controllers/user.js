const User = require('../models/user');

exports.createUser = async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        });
        const newItem = await user.save();
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        user.name = req.body.name;
        user.email = req.body.email;
        user.age = req.body.age;
        const updatedItem = await user.save();
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        await user.deleteOne();
        res.status(200).json({ message: 'Deleted item' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};