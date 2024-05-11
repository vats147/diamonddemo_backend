import * as color from '../controller/color.js';
import express from 'express';

const server=express();

const color_router=express.Router();

color_router.post('/addcolor',color.add_color)
.get('/getallcolor',color.get_all_color)
.delete('/deletecolor',color.delete_color)
.put('/updatecolor',color.update_color)

export {color_router as color_router}