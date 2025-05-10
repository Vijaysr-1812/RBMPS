const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// ✅ Import Routers
const AuthRouter = require('./routes/AuthRouter');
const ProductRouter = require('./routes/ProductRouter');
const PredictionRouter = require('./routes/PredictionRouter'); // ✅ Added

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Middleware
app.use(cors({ origin: '*' })); // Allow all origins
app.use(bodyParser.json());
app.use(express.json());

// ✅ Health check
app.get('/ping', (req, res) => res.send('PONG'));

// ✅ API Routes
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/api/predictions', PredictionRouter); // ✅ Added

// ✅ Global Error Handler
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
