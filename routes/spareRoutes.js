import express from 'express';
const router = express.Router();
import multer from 'multer'
import { requireSignin } from '../middleware/middleware.js';
import { addNewSpareController, deleteSpareController, fetchSingleSpareController, fetchSpareController, updateSpareController } from '../controller/spareController.js';



// fetch all Spare
router.get('/fetch-all',/*requireSignin,*/fetchSpareController)
// fetch single Spare
router.get('/fetch/:id',/*requireSignin,*/fetchSingleSpareController)
// add-new-Spare
router.post('/add',/*requireSignin,*/addNewSpareController)
// update Spare by id
router.put('/update/:id',/*requireSignin,*/updateSpareController)
// delete Spare by id
router.delete('/delete/:id',/*requireSignin,*/deleteSpareController)




export default router;