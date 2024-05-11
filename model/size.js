import mongoose from "mongoose";

const { Schema } = mongoose;

const Size_schema = new Schema({
    size_id: { type: Schema.Types.ObjectId,  required: [true, "Size is required"] },
    size_name:{type:Schema.Types.String, required: [true, "Size name is required"]}
    
}, { strictPopulate: false });


export const Size = mongoose.model("Size", Size_schema)