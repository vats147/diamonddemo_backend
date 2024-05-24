import  mongoose  from "mongoose";

const {Schema} = mongoose;

const order_schema =new Schema({
    orderId:{type:Schema.Types.ObjectId,default: () => new mongoose.Types.ObjectId(), required:true},
    partyName: {
        type: String,
        required: true,
      },
      brokerName: {
        type: String,
        required: true,
      },
      packageWeight: {
        type: Number,
        required: true,
      },
      sellLimit: {
        type: Number,
        required: true,
      },
      sampleWeight: {
        type: Number,
        required: true,
      },
      colorName: {
        type: String,
        required: true,
      },
     
      shapeName: {
        type: String,
        required: true,
      },
      costPrice: {
        type: Number,
        required: true,
      },
           finalPrice: {
        type: Number,
        required: true,
      },
      section: [
        {
          size: String,
          row: [
            {
              grade: String,
              ct: Number,
              rs: Number,
              amount: Number,
              av: Number,
            },
          ],
        },
      ],
      remarks: {
        type: String,
        required: true,
      },
      datetime: {
        type: Date,
        default: Date.now,
      },
      createdBy: {
        type: String,
        required: true,
      },
      modifiedBy: {
        type: String,
        required: true,
      },
      createdDateTime: {
        type: Date,
        default: Date.now,
      },
      lastModifiedDateTime: {
        type: Date,
        default: Date.now,
      },
      fullPackate: [
        {
          size: String || Number,
          weight: Number,
          percentage: Number,
        },
      ],
      seal: [Number],
      discount1Amount: {
        type: Number,
        required: true,
      },
      discount1percentage: {
        type: String,
        required: true,
      },
      discount2Amount: {
        type: Number,
        required: true,
      },
      discount2percentage: {
        type: String,
        required: true,
      },
      outPercentage: {
        type: Number,
        required: true,
      },
      outWeight: {
        type: Number,
        required: true,
      },
      outRemarks: {
        type: String,
        required: true,
      },
      finalPurchaseWeight: {
        type: Number,
        required: true,
      },
      averageTotal:{
        type:Number,
        required:true,
      }
});

export const Order = mongoose.model("Order",order_schema)