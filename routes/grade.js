import * as grade from '../controller/grade.js';
import express from 'express';

const server=express();

const grade_router=express.Router();

grade_router.get('/getallgrade',grade.get_all_grade)
.post('/addgrade',grade.add_grade)

// .delete('/deletecolor',grade.delete_color)
// .put('/updatecolor',grade.update_color)

export {grade_router as grade_router}