import mongoose from "mongoose";

const { Schema } = mongoose;

const Color_Schema = new Schema({
    color_id: { type: Schema.Types.ObjectId, default:() => mongoose.Types.ObjectId(), required: [true, "color id is required"] },
    color_name:{type:Schema.Types.String, required: [true, "color name is required"]}
    
}, { strictPopulate: false });


export const Color = mongoose.model("Color", Color_Schema)