import * as grade from '../controller/grade.js';
import express from 'express';

const server=express();

const grade_router=express.Router();

grade_router.get('/getallgrade',grade.get_all_grade)
.post('/addgrade',grade.add_grade)
.delete('/deletegrade',grade.delete_grade)
.put('/updategrade',grade.update_grade)

export {grade_router as grade_router}