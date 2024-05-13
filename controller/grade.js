
import * as grademodel from "../model/grade.js";
import mongoose from "mongoose"; // Import mongoose to use mongoose.Types.ObjectId()

// export const add_grade
export const add_grade= async(req,res)=>{

    const {grade_name}=req.body;
    if(!grade_name)
    {
        return res.status(400).json({message:"Grade Name is required"})
    }
    try{
            const gradedata=await grademodel.Grade.find({grade_name:grade_name});
            if(gradedata.length>0)
            {
                console.log("Grade already exists: ");
                return res.status(400).json({message:"Grade Already Exists"});

            }
            else
            {
                // Genrate a new ObjectId
                const grade_id=new mongoose.Types.ObjectId();
                const newGrade=new grademodel.Grade({
                    grade_id:grade_id,
                    grade_name:grade_name,
                })

                const savedGrade =await newGrade.save();

                if(savedGrade)
                {
                    console.log("Grade Added Succesfully",savedGrade);
                    res.status(200).json({message:"Grade Added Successfully",data:savedGrade});
                }
            }
    }
    catch(error){
        console.error("Error while adding Grade", err);
        res.status(500).json({message:"Internal Server Error"});
    }
}
// getallGrade
export const get_all_grade = async (req, res) => {
  try{
    const allGrade= await grademodel.Grade.find();
    if(allGrade.length === 0)
        {
            return res.status(404).json({message:"No Grade found "});

        }
    res.status(200).json({message:"Grade retrived successfully",data:allGrade});
  }
  catch(error)
  {
    console.error("Error Fetching all grade : ",error);
    res.status(500).json({message:"Internal Server Error"});
  }
};

export const delete_grade = async(req,res)=>{
    const{grade_id} =req.body;
    if(!grade_id)
        {
            res.status(400).json({message:"Grade id is required"});
        }
    try{
        const objectId=new mongoose.Type.ObjectId(grade_id);
        
        const deletegrade=await grademodel.Grade.findOneAndDelete({grade_id:objectId});
        if(deletegrade)
            {
                console.log("Grade Deleted: ", deletegrade);
                res.status(200).json({message:"Grade Deleted",data:deletegrade })
            }
        else
        {
            console.log("Grade not Found");
            res.status(404).json({message:"Grade Not found"});
        }


    }
    catch(error)
    {
        console.error(`Error while deleting grade ${error}`);
        res.status(500).json({message:"Internal Server Error"});
    }
}
export const update_grade=async(req,res)=>{
    const {grade_id,grade_name}=req.body;
    if(!grade_id)
    {
        res.status(400).json({message:"Grade Id is not Provided"});
    }
    if(!grade_name)
    {
        res.status(400).json({message:"Grade Name is not provided"});
    }
    try{
        const objectId= new mongoose.Types.ObjectId(grade_id);

        const updategrade= await grademodel.Grade.findByIdAndUpdate({grade_id:objectId},{grade_name:grade_name},{new:true});

        if(updategrade)
        {
            console.log("Grade update succesfully");
            res.status(200).json({message:"Grade Updated",data:updategrade});

        }
        else
        {
            console.log("Grade not found");
            res.status(400).json({message:"Grade not found "});
        }
    }
    catch(error)
    {
        console.log("Error while updating grade",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}
