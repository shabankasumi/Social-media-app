import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: Date
    },
}, {
    timestamps: true
});

export const UserModel = mongoose.model('User', userSchema);