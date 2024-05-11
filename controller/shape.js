import * as shapemodel from "../model/shape.js";
import mongoose from "mongoose";

export const add_shape = async (req, res) => {
  const { shape_name } = req.body;
  if (!shape_name) {
    return res.status(400).json({ error: "Shape name is required" });
  }

  try {
    const shapedata = await shapemodel.Shape.find({
      shape_name: shape_name,
    });

    if (shapedata.length > 0) {
      console.log("Shape already exists");
      return res.status(400).json({ error: "Shape already exists" });
    }

    const objectId = new mongoose.Types.ObjectId();
    const newShape = new shapemodel.Shape({
      shape_id: objectId,
      shape_name: shape_name,
    });
    const savedShape = await newShape.save();

    if (savedShape) {
      console.log("Shape Added Succesfullt", savedShape);
      res
        .status(200)
        .json({ message: "Shape Added Succesfully", data: savedShape });
    }
  } catch (error) {
    console.log(`Error while adding shpe name ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const get_all_shape = async (req, res) => {
  try {
    const allshape = await shapemodel.Shape.find();
    if (allshape.length === 0) {
      return res.status(404).json({ message: "No Shape Found" });
    }
    res
      .status(200)
      .json({ message: "Shape retrived Succesfully", data: allshape });
  } catch (error) {
    console.log("Error while retriving all shape ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const delete_shape = async (req, res) => {
  const { shape_id } = req.body;
  if (!shape_id) {
    res.status(400).json({ error: "Shape id required" });
  }
  try {
    const objectId = mongoose.Types.ObjectId(shape_id);

    const deleteshape = await shapemodel.Shape.findOneAndDelete({
      shape_id: objectId
    });
    if(deleteshape)
        {
            console.log("Shape Deleted: ",deleteshape);
            res.status(200).json({message:"Shape Deleted",data:deleteshape});
        }
    else
        {
            console.log("Shape id not found");
            res.status(404).json({message:"Shape Not found"});
        }
  } catch (error) {
    console.log("Error while deleting shape ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const update_shape=async(req,res)=>{
    const {shape_id,shape_name}=req.body;

    if(!shape_id)
        {
            res.status(400).json({error:"Shape ID is not provided"});

        }
    if(!shape_name)
        {
            res.status(400).json({error:"Shape Name is not provided"});
        }
    try{
        const objectId=new mongoose.Types.ObjectId(shape_id);
        const updateshape=await shapemodel.Shape.findOneAndUpdate({
            shape_id:objectId
        },{shape_name:shape_name});

        if(updateshape)
        {
            console.log("Shape update succesfully");
            res.status(200).json({message:"Shape Updated",data:updateshape});
        }
        else
        {
            console.log("Shape not found");
            res.status(400).json({message:"Shape not found"});
        }

    }
    catch(error)
    {
        console.log("Error While updating shape",error);
        res.status(500).json({error:"Internal Server Error"});
    }
}