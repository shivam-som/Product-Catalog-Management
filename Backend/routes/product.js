const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

router.post('/', auth, upload.single('image'), controller.create);
router.put('/:id', auth, upload.single('image'), controller.update);
router.get('/:id', controller.get);
router.get('/', controller.list);
router.delete('/:id', auth, controller.remove);

module.exports = router;