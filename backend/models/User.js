const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    currentFootprint: { type: Number, default: 0 },
});

const UserModel = mongoose.model('User', UserSchema); // ✅ Use 'User'
module.exports = UserModel;
