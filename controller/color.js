import * as colormodel from "../model/color.js";
import mongoose from "mongoose"; // Import mongoose to use mongoose.Types.ObjectId()

export const add_color = async (req, res) => {
  console.log(req.body);
  console.log("add color request received");
  const { color_name } = req.body;
  if (!color_name) {
    return res.status(400).json({ message: "Color name is required" });
  }

  try {
    const colordata = await colormodel.Color.find({ color_name: color_name });
    if (colordata.length > 0) {
      console.log("Color Already Exists");
      return res.status(400).json({ message: "Color Already Exists" });
    } else {
      // Generate a new ObjectId
      const color_id = new mongoose.Types.ObjectId();

      const newColor = new colormodel.Color({
        color_id: color_id,
        color_name: color_name,
      });

      const savedColor = await newColor.save();
      console.log("Color Added Successfully", savedColor);
      res
        .status(200)
        .json({ message: "Color added successfully", data: savedColor });
      
    }
  } catch (err) {
    console.error("Error adding color: ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// getallcolor
export const get_all_color = async (req, res) => {
  try {
    const allColors = await colormodel.Color.find();

    if (allColors.length === 0) {
      return res.status(404).json({ message: "No colors found" });
    }

    res
      .status(200)
      .json({ message: "Colors retrived succesfully", data: allColors });
  } catch (err) {
    console.error("Error Fetching color : ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// updatecolor
// getallcolor

export const delete_color = async (req, res) => {
  try {
    
    const { color_id } = req.body;
    if (!color_id) {
      return res.status(400).json({ message: "Color id is required" });
    }

    const objectId = new mongoose.Types.ObjectId(color_id);
    console.log(objectId)

    const deletecolor = await colormodel.Color.findOneAndDelete({color_id:objectId});
    console.log(deletecolor);
    if(deletecolor)
        {
            console.log("color deleted:",deletecolor);
            res.status(200).json({message:"color deleted",data:deletecolor});

        }
    else
    {
        console.log("Color not found ");
        res.status(404).json({message:"Color not found"});

    }
  } catch (err) {
    console.error("Error deleting color : ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// update_color
export const update_color = async (req, res) => {
    try {
      const { color_id, color_name } = req.body;
      if (!color_id) {
        return res.status(400).json({ message: "Color id is required" });
      }
      if (!color_name) {
        return res.status(400).json({ message: "Color name is required" });
      }
      console.log(color_id);
      // Convert color_id to ObjectId
      const objectId = new mongoose.Types.ObjectId(color_id);
      console.log(objectId);
        console.log(objectId);

      const updatecolor = await colormodel.Color.findOneAndUpdate(
        { color_id: objectId }, // Filter criteria
        { color_name: color_name }, // Update data
        { new: true } // Return the updated document
      );
  
      console.log(updatecolor);
      if (updatecolor) {
        console.log("color updated:", updatecolor);
        res.status(200).json({ message: "color updated", data: updatecolor });
      } else {
        console.log("Color not found ");
        res.status(404).json({ message: "Color not found" });
      }
    } catch (err) {
      console.error("Error updating color : ", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  