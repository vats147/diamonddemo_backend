import * as ordermodel from '../controller/order.js';

import express from 'express'

const server = express()

const order_router = express.Router();

order_router
.get('/getallorder',ordermodel.get_all_order)
.get('/getoneorder',ordermodel.get_one_order)
.delete('/deleteorder',ordermodel.delete_order)
.post('/addorder',ordermodel.addorder)
.put('/editorder',ordermodel.editorder)


export {order_router}
