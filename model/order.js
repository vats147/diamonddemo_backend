import  mongoose  from "mongoose";

const {Schema} = mongoose;

const order_schema =new Schema({
    orderId:{type:Schema.Types.ObjectId, required:true},
    partyName:{type:String},
    brokerName:{type:String,required:true},
    packageWeight:{type:Number,required:true},
    sellLimit:{type:Number,required:true},
    sampleWeight:{type:Number,required:true},
    colorName:{type:String,required:true},
    sizeName:{type:String,required:true},
    shapeName:{type:String,required:true},
    costPrice:{type:String,required:true},
    discount:{type:String, required:true},
    finalPrice:{type:String, required:true},
    section:{type:Schema.Types.Array,required:true},
    remarks:{ type: String },
    datetime:{type:Date, default:Date.now},
    createdBy:{type:String, required: true},
    modifiedBy:{type:String},
    createdDateTime:{type:Date,default:Date.now},
    lastModifiedDateTime:{type:Date}

});

export const Order = mongoose.model("Order",order_schema)