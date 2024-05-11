import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import bodyParser from 'body-parser';
import { color_router as colorrouter} from './routes/color.js';
import {grade_router as graderouter} from './routes/grade.js';

// load env file 


const port=8080;


// connection code try catch
main().catch((err)=>console.log(err))

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Polish_Estimate");
    console.log("database is connected");
}

// intialize the server
const server=express();

// using middleware
server.use(express.json()) // for json parser
server.use(cors());
// const upload = multer();
// server.use(bodyParser.urlencoded({ extended: true }));
server.use(multer().none());


server.use('/',colorrouter);
server.use('/',graderouter);

server.listen(port,()=>{
    console.log(`server is running on ${port}`)
})