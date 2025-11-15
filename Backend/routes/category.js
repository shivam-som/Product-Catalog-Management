const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryController');
const auth = require('../middleware/auth');

router.post('/', auth, controller.create);
router.get('/', controller.list);
router.get('/:id', controller.get);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);

module.exports = router;