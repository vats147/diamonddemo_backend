import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    datetime: { type: Date, default: Date.now },
    role: { type: String, required: true },
    access: { type: mongoose.Types.Array, required: true } // Assuming access is a string, adjust if it's meant to be another type
});

export const User = mongoose.model("User", userSchema);
