import * as shape from '../controller/shape.js';
import express from 'express';

const server=express();

const shape_route=server.router();

shape_route.get('/getallshape',shape.get_all_shape)
.post('/addshape',shape.add_shape)
.put('/updateshape',shape.update_shape)
.delete('/deleteshape',shape.delete_shape)

export {shape_route as shape_route};