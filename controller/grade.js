
import * as grademodel from "../model/grade.js";
import mongoose from "mongoose"; // Import mongoose to use mongoose.Types.ObjectId()

// export const add_grade
export const add_grade= async(req,res)=>{

    const {grade_name}=req.body;
    if(!grade_name)
    {
        return res.status(400).json({error:"Grade Name is required"})
    }
    try{
            const gradedata=await grademodel.Grade.find({grade_name:grade_name});
            if(gradedata.length>0)
            {
                console.log("Grade already exists: ");
                return res.status(400).json({error:"Color Already Exists"});

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
        res.status(500).json({error:"Internal Server Error"});
    }
}
// getallcolor
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
    res.status(500).json({error:"Internal Server Error"});
  }
};

export const delete_grade = async(req,res)=>{
    
}
// export const delete_color = async (req, res) => {
//   try {
    
//     const { color_id } = req.body;
//     if (!color_id) {
//       return res.status(400).json({ error: "Color id is required" });
//     }

//     const objectId = new mongoose.Types.ObjectId(color_id);
//     console.log(objectId)

//     const deletecolor = await colormodel.Color.findOneAndDelete({color_id:objectId});
//     console.log(deletecolor);
//     if(deletecolor)
//         {
//             console.log("color deleted:",deletecolor);
//             res.status(200).json({message:"color deleted",data:deletecolor});

//         }
//     else
//     {
//         console.log("Color not found ");
//         res.status(404).json({message:"Color not found"});

//     }
//   } catch (err) {
//     console.error("Error deleting color : ", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


// // update_color
// export const update_color = async (req, res) => {
//     try {
//       const { color_id, color_name } = req.body;
//       if (!color_id) {
//         return res.status(400).json({ error: "Color id is required" });
//       }
//       if (!color_name) {
//         return res.status(400).json({ error: "Color name is required" });
//       }
//       console.log(color_id);
//       // Convert color_id to ObjectId
//       const objectId = new mongoose.Types.ObjectId(color_id);
//       console.log(objectId);
//         console.log(objectId);

//       const updatecolor = await colormodel.Color.findOneAndUpdate(
//         { color_id: objectId }, // Filter criteria
//         { color_name: color_name }, // Update data
//         { new: true } // Return the updated document
//       );
  
//       console.log(updatecolor);
//       if (updatecolor) {
//         console.log("color updated:", updatecolor);
//         res.status(200).json({ message: "color updated", data: updatecolor });
//       } else {
//         console.log("Color not found ");
//         res.status(404).json({ message: "Color not found" });
//       }
//     } catch (err) {
//       console.error("Error updating color : ", err);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   };
  