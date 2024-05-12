import * as ordermodel from '../model/order.js';
import mongoose, { mongo } from 'mongoose';

export const delete_order= async(req,res)=>{
    const {orderId} = req.body;
    if(!orderId)
    {
        return res.status(400).json({error:"OrderID is required"});
    }
    try{
        const objectId= new mongoose.Types.objectId(orderId);
        const deletOrder= await ordermodel.Order.findOneAndDelete({orderId:objectId});

        if(deletOrder)
            {
                console.log("Order Deleted: ",deletOrder);
                res.status(200).json({message:"Order Deleted Succesfully",data:deletOrder});
            }
        else
        {
            console.log("Order Not found");
            res.status(404).json({message:"Order Not Found"});
        }
    }
    catch(error)
    {
        console.log("Error while deleting order",error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const get_all_order= async(req,res)=>{
    try{
        const allorder=await ordermodel.Order.find();
        if(allorder.length===0)
            {
                return res.status(404).json({message:"No Order Found"});

            }
            res.status(200).json({message:"Order Retrived Succesfully",data:allorder});
    }
    catch(error)
    {
        console.log("Error while fetching all order");
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const get_one_order=async (req,res)=>{
    const {orderId} = req.body;
    if(!orderId)
        {
            return res.status(404).json({message:"Order Id is not Provided"});

        }

    try{
        const objectId= new mongoose.Types.ObjectId(orderId);
        const getoneorder= await ordermodel.Order.find({orderId:objectId});

        if(getoneorder.length===0)
        {
            
            res.status(404).json({error:"No record found"});
        }
        else
        {
            res.status(200).json({message:"Order retrived succesfully",data:getoneorder});
        }

    }
    catch(error)
    {
        console.log("Error while fetching one order ",error);
        res.send(500).json({error:"Internal Server Error"});
    }

}

// update
// insert

export const addorder= async(req,res)=>{

    try {
        const order = await ordermodel.Order.create(req.body); // Create a new order with data from request body
        res.status(201).json({ success: true, data: order }); // Send success response with created order data
    } catch (error) {
        res.status(400).json({ success: false, error: error.message }); // Send error response if unable to create order
    }
};

export const editorder=async(req,res)=>{
    
}