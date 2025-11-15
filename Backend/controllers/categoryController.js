const { Category } = require('../models');

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'Name required' });
        const cat = await Category.create({ name });
        res.json(cat);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.list = async (req, res) => {
    const cats = await Category.findAll({ order: [['name', 'ASC']] });
    res.json(cats);
};

exports.get = async (req, res) => {
    const c = await Category.findByPk(req.params.id);
    if (!c) return res.status(404).json({ message: 'Not found' });
    res.json(c);
};

exports.update = async (req, res) => {
    const c = await Category.findByPk(req.params.id);
    if (!c) return res.status(404).json({ message: 'Not found' });
    c.name = req.body.name || c.name;
    await c.save();
    res.json(c);
};

exports.remove = async (req, res) => {
    const c = await Category.findByPk(req.params.id);
    if (!c) return res.status(404).json({ message: 'Not found' });
    await c.destroy();
    res.json({ message: 'deleted' });
};