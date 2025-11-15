const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const saltRounds = 10;

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'email & password required' });
        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(400).json({ message: 'Email already registered' });
        const hash = await bcrypt.hash(password, saltRounds);
        const user = await User.create({ email, password: hash });
        return res.json({ id: user.id, email: user.email });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '8h' });
        return res.json({ token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.list = async (req, res) => {
    const users = await User.findAll({ attributes: ['id', 'email', 'createdAt'] });
    res.json(users);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Not found' });
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, saltRounds);
    await user.save();
    res.json({ id: user.id, email: user.email });
};