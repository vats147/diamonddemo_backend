import mongoose from "mongoose";

const { Schema } = mongoose;

const Grade_Schema = new Schema({
    grade_id: { type: Schema.Types.ObjectId,  required: [true, "Grade id is required"] },
    grade_name:{type:Schema.Types.String, required: [true, "Grade name is required"]}
    
}, { strictPopulate: false });


export const Grade = mongoose.model("Grade", Grade_Schema)