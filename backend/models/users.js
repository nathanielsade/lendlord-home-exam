const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    dateStarted: { type: Date, required: true },
    role: { type: String, required: true },
    salary: { type: Number, required: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
    },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
