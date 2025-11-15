const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const controller = require('../controllers/uploadController');
const auth = require('../middleware/auth');

router.post('/csv', auth, upload.single('file'), controller.bulkUpload);

module.exports = router;