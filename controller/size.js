import * as sizemodel from '../model/size.js';
import mongoose from 'mongoose';

export const add_size = async (req,res)=>{
    const {size_name}=req.body;
    if(!size_name)
        {
            return res.status(400).json({error:"Size name is required"});

        }
    try{
        const sizedata= await sizemodel.Size.find({size_name:size_name});

        if(sizedata.length>0)
            {
                console.log("Shape Already Exists");
                res.status(400).json({error:"Shape Name Already Exists"});
            }
        else
        {
            const objectId =new mongoose.Types.objectId();
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
        console.error("Error while adding Shape", err);
        res.status(500).json({error:"Internal Server Error"});
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
        console.error("Error while adding Grade", err);
        res.status(500).json({error:"Internal Server Error"});
    
    }
}

export const delete_size = async (req, res) => {
    const { size_id } = req.body;
    if (!size_id) {
        return res.status(400).json({ error: "Size id is not provided" });
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
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const update_size = async (req, res) => {
    const { grade_id, grade_name } = req.body;
    if (!grade_id) {
        return res.status(400).json({ error: "Grade Id is not provided" });
    }
    if (!grade_name) {
        return res.status(400).json({ error: "Grade Name is not provided" });
    }
    try {
        const objectId = new mongoose.Types.ObjectId(grade_id);
        const updateGrade = await grademodel.Grade.findByIdAndUpdate(grade_id, { grade_name }, { new: true });
        if (updateGrade) {
            console.log("Grade updated successfully");
            res.status(200).json({ message: "Grade Updated", data: updateGrade });
        } else {
            console.log("Grade not found");
            res.status(404).json({ message: "Grade not found" });
        }
    } catch (error) {
        console.error("Error while updating grade", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
