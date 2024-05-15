import * as user from '../controller/user.js';
import * as usermiddle from '../middleware/user.js'
import express from 'express';

const server=express();

const user_router=express.Router();

user_router.post('/adduser',usermiddle.userregauth,user.user_registrastion)


export {user_router as user_router}