const express = require('express');
const router = express.Router();
const { savePrediction, getPredictions } = require('../controllers/PredictionController');

router.post('/store', savePrediction);
router.get('/', getPredictions);

module.exports = router;
