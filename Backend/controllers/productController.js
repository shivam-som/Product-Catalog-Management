const { Product, Category } = require('../models');

exports.list = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page || 1), 1);
        const limit = Math.min(parseInt(req.query.limit || 10), 100);
        const offset = (page - 1) * limit;
        const sort = req.query.sort === 'desc' ? 'DESC' : 'ASC';
        const search = req.query.search || '';
        const category = req.query.category || '';

        const where = {};
        if (search) where.name = { [Op.iLike]: `%${search}%` };

        // if (category) {}

        const include = [{ model: Category, attributes: ['id', 'name'], where: category ? { name: { [Op.iLike]: `%${category}%` } } : undefined }];

        const { rows, count } = await Product.findAndCountAll({
            where,
            include,
            limit,
            offset,
            order: [['price', sort]]
        });

        res.json({ data: rows, total: count, page, limit });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.remove = async (req, res) => {
    const p = await Product.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    await p.destroy();
    res.json({ message: 'deleted' });
};