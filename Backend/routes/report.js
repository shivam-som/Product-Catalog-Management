const express = require('express');
const router = express.Router();
const controller = require('../controllers/reportController');
const auth = require('../middleware/auth');

router.get('/csv', auth, controller.downloadCSV);
router.get('/xlsx', auth, controller.downloadXLSX);

module.exports = router;