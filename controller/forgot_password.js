import * as regmodel from '../model/user.js';
import { ObjectId } from 'mongodb';
import bcrpyt from 'bcrypt'


export const forgot_password = async (req, res) => {

    let flag = 0;
    let objid;
    let otp;

    

    await regmodel.Users.find({
        user_email: req.body.email }).then((userdata) => {
        if (userdata.length > 0) {
            console.log("User already exists");
            objid = userdata;
            flag = 0;

        } else {
            console.log("User not found");
            flag = 1; 
        }
    })

    console.log(flag);
    console.log(objid[0]._id);

    const objectId = new ObjectId(objid[0]._id);
    if (flag === 0) {
        const saltRounds = 10
        const hashedPassword = await bcrpyt.hashSync(req.body.password, saltRounds);
console.log(hashedPassword);
        const up = await regmodel.Users.updateOne(
            { _id: objectId  },
            { $set: { password: hashedPassword } }
        ) 
        res.status(200).json({up})

    } 
    else {
        res.status(404).json({})
    }


}                 