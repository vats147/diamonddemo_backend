import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import bodyParser from 'body-parser';
import { color_router as colorrouter} from './routes/color.js';
import {grade_router as graderouter} from './routes/grade.js';
import { size_router as sizerouter } from './routes/size.js';
import {user_router as userrouter} from './routes/user.js';
import { shape_route } from './routes/shape.js';
import { order_router } from './routes/order.js';
import {login_router as loginrouter} from './routes/login.js'
import {otp_router as otprouter} from './routes/sendotp.js'
import {passforgot_router as passforgotroute} from './routes/forgot_password.js'
import {hallo_router as hallorouter} from './routes/hello.js'
// load env file 


const port=8080;


// connection code try catch
main().catch((err)=>console.log(err))

async function main(){
    try {
        // Check if already connected
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect("mongodb+srv://yashdesai281:yashdesai99748@narayanmunidev.atasrxl.mongodb.net/client_try?retryWrites=true&w=majority&appName=narayanmunideve", {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log("Database is connected");
        }
    } catch (err) {
        console.error(err);
    }
}

 
// intialize the server
const server=express();

// using middleware
server.use(express.json()) // for json parser
server.use(cors());
// const upload = multer();
// server.use(bodyParser.urlencoded({ extended: true }));
server.use(multer().none());

// manage by admin only
server.use('/',colorrouter);
server.use('/',graderouter);
server.use('/',sizerouter);
server.use('/',shape_route);
server.use('/',userrouter);
server.use('/',loginrouter);
server.use('/',otprouter);
server.use('/',passforgotroute);
server.use('/',hallorouter);

// manage by user
server.use('/',order_router); // addorder,editorder, user can add order


server.listen(port,()=>{
    console.log(`server is running on ${port}`)
})