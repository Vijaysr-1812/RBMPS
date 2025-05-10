const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
    bodyType: String,
    sex: String,
    diet: String,
    monthlyGroceryBill: Number,
    showerFrequency: String,
    heatingEnergy: String,
    recycling: [String],
    cooking: [String],
    vehicleType: String,
    vehicleMonthlyDistanceKm: Number,
    transport: String,
    socialActivity: String,
    travelFrequency: String,
    wasteBagSize: String,
    wasteBagWeeklyCount: Number,
    howLongTVPCDailyHour: Number,
    howManyNewClothesMonthly: Number,
    howLongInternetDailyHour: Number,
    energyEfficiency: String,
    footprint: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prediction', PredictionSchema);
