import mongoose from "mongoose";

const { Schema } = mongoose;

const Shape_schema = new Schema({
    shape_id: { type: Schema.Types.ObjectId,  required: [true, "Shape id is required"] },
    shape_name:{type:Schema.Types.String, required: [true, "Shape name is required"]}
    
}, { strictPopulate: false });


export const Shape = mongoose.model("Shape", Shape_schema)