const express = require('express');
const router = express.Router();
const quotesController = require('../controllers/quotesController');

router.post('/calculate', quotesController.calculateQuote);
router.post('/save', quotesController.saveQuote);

module.exports = router;