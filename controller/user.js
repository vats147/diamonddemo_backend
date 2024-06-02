import * as regmodel from '../model/user.js';
import bcrpyt from 'bcrypt'

export const user_registrastion = async (req, res) => {


    let flag = 0;

    await regmodel.Users
        .find({
            $or: [
                { user_email: req.body.email },
                { user_contact_number: req.body.contact_number }
            ]
        })

        .then(users => {
            if (users.length > 0) {
                console.log('Data is available.')
                flag = 1
            } else {
                flag = 0
                console.log('Data is not available.')
            }
        })
    console.log(flag);

    //student table  reg
    if (flag == 0) {

        //user table  reg 
        const saltRounds = 10
        const hashedPassword = await bcrpyt.hashSync(req.body.password, saltRounds);

        const user = regmodel.Users();
        user.user_full_name = req.body.name
        user.user_contact_number = req.body.number
        user.user_email = req.body.email;
        user.user_Address = req.body.Address;
        user.password = hashedPassword
        user.role = "emp"
        user.user_status = "A00" 
        user.save();


        res.status(200).json(res.body)

    } else {
        console.log("user found in table so not use this email because it already use  done");
        res.status(401).json(res.body)

    }

}