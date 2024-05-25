import * as sizemodel from '../model/size.js';
import mongoose from 'mongoose';

export const add_size = async (req,res)=>{
    const {size_name}=req.body;
    if(!size_name)
        {
            return res.status(400).json({message:"Size name is required"});

        }
    try{
        const sizedata= await sizemodel.Size.find({size_name:size_name});

        if(sizedata.length>0)
            {
                console.log("Shape Already Exists");
                res.status(400).json({message:"Shape Name Already Exists"});
            }
        else
        {
            const objectId =new  mongoose.Types.ObjectId();
            const newSize= new sizemodel.Size({
                size_id:objectId,
                size_name:size_name,
            });
            const saveSize= await newSize.save();
            
            if(saveSize)
            {
                console.log("Size saved succesfully");
                res.status(200).json({message:"Size Added Successfully",data:saveSize})
            }
        }
    }
    catch(error)
    {
        console.error("Error while adding Shape", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const get_all_size= async(req,res)=>{
    try{
        const allsize=await sizemodel.Size.find();
        if(allsize.length===0)
            {
                return res.status(404).json({message:"No Shape Found"});

            }
        res.status(200).json({message:"Size Retrived Succesfully",data:allsize});
    }
    catch(error)
    {
        console.error("Error while adding Shape", error);
        res.status(500).json({message:"Internal Server Error"});
    
    }
}

export const delete_size = async (req, res) => {
    const { size_id } = req.body;
    if (!size_id) {
        return res.status(400).json({ message: "Size id is not provided" });
    }
    try {
        const objectId = new mongoose.Types.ObjectId(size_id);
        const deleteSize = await sizemodel.Size.findOneAndDelete({ size_id: objectId });
        if (deleteSize) {
            console.log("Size Deleted: ", deleteSize);
            res.status(200).json({ message: "Size Deleted", data: deleteSize });
        } else {
            console.log("Size not Found");
            res.status(404).json({ message: "Size Not found" });
        }
    } catch (error) {
        console.error(`Error while deleting size ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const update_size = async (req, res) => {
    const { size_id, size_name } = req.body;
    if (!size_id) {
        return res.status(400).json({ message: "Size Id is not provided" });
    }
    if (!size_name) {
        return res.status(400).json({ message: "Size Name is not provided" });
    }
    try {
        const objectId = new mongoose.Types.ObjectId(size_id);
        console.log(objectId)
        const updateSize = await sizemodel.Size.findOneAndUpdate({
            size_id:objectId
        },{size_name:size_name}, { new: true });
        if (updateSize) {
            console.log("Size updated successfully");
            res.status(200).json({ message: "Size Updated", data: updateSize });
        } else {
            console.log("Size not found");
            res.status(404).json({ message: "Size not found" });
        }
    } catch (error) {
        console.error("Error while updating Size", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const get_size_by_id = async (req, res) => {
    const { size_id } =  req.body;
    console.log("Get Size by ID",size_id);
    if (!size_id) {
        return res.status(400).json({ message: "Invalid Size ID" });
    }
    try {
        const objectId = new mongoose.Types.ObjectId(size_id);
        const size = await sizemodel.Size.find({size_id: objectId});
        if (!size) {
            return res.status(404).json({ message: "Size not found" });
        }
        res.status(200).json({ message: "Size Retrieved Successfully", data: size });
    } catch (error) {
        console.error("Error while fetching size by ID", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};