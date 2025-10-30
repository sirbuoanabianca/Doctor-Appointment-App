import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    },
    email: {
    type: String,
    required: true,
    unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    DateOfBirth: {
        type: Date,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    CNP: {
        type: String,
        required: false,
    },
    StreetAddress: {
        type: String,
        required: false,
    },
    City: {
        type: String,
        required: false,
    },
    County: {
        type: String,
        required: false,
    },
    PostalCode: {
        type: String,
        required: false,
    },
    Country: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

}, {minimize: false});

const userModel = mongoose.models.user || mongoose.model('User', userSchema);
export default userModel;