const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists, please login", success: false });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword , currentFootprint: 0 });

        await newUser.save();  // ✅ Save user to MongoDB
        console.log("✅ User saved:", newUser);  // Debug log

        res.status(201).json({ success: true, message: "Signup successful", user: newUser });
    } catch (err) {
        console.error("❌ Signup Error:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const errorMsg = "Auth failed: email or password is wrong";

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({ success: true, message: "Login Success", jwtToken, email, name: user.name });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { signup, login };
