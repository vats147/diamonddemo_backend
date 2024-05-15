import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    user_full_name: { type: String, require: [true, "user name is required"] },
    user_contact_number: { type: Number, require: [true, "contact number is Required"] },
    user_email: { type: String, require: [true, "user email is required"] },
    user_Address: { type: String, require: [true, "user address is required"] },
    password: { type: String, required: true },
    role: { type: String, required: true },
    user_status: { type: String, require: [true, "user status is Required"] },

});

export const Users = mongoose.model("User", userSchema);
