const Prediction = require('../models/Prediction');

const savePrediction = async (req, res) => {
    try {
        const { footprint, ...inputs } = req.body;

        if (typeof footprint !== 'number' || !inputs) {
            return res.status(400).json({ success: false, message: 'Invalid prediction data' });
        }

        const prediction = new Prediction({ footprint, inputs });
        await prediction.save();

        res.status(201).json({ success: true, message: 'Prediction saved', prediction });
    } catch (err) {
        console.error('❌ Error saving prediction:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getPredictions = async (req, res) => {
    try {
        const predictions = await Prediction.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, predictions });
    } catch (err) {
        console.error('❌ Error fetching predictions:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = { savePrediction, getPredictions };
