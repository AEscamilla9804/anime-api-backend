import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import generateId from "../helpers/generateId.js";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        required: true,
        trim: true
    },
    website: {
        type: String,
        default: null,
        trim: true
    },
    phone: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: generateId()
    },
    confirmed: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.checkPassword = async function(formPassword) {
    return await bcrypt.compare(formPassword, this.password);
}

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.verifyPassword = async function(formPassword) {
    return await bcrypt.compare(formPassword, this.password);
} 

const User = mongoose.model('User', userSchema);
export default User;