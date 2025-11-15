const express = require('express');
const router = express.Router();

const authRoutes = require('./user');
const categoryRoutes = require('./category');
const productRoutes = require('./product');
const uploadRoutes = require('./upload');
const reportRoutes = require('./report');

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/upload', uploadRoutes);
router.use('/reports', reportRoutes);

module.exports = router;