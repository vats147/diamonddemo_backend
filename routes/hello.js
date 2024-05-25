import * as halloword from '../controller/hallo.js';
import express from 'express';

const server=express();

const hallo_router=express.Router();

hallo_router.get('/',halloword.hallo)

export {hallo_router as hallo_router}