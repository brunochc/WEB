const express = require('express');
const { getAllServices, createService, getServiceById } = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAllServices);
router.post('/', protect, authorize('provider'), createService);
router.get('/:id', getServiceById);

module.exports = router;
