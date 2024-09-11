import express from 'express';
const router = express.Router();
import multer from 'multer'
import { requireSignin } from '../middleware/middleware.js';
import { addNewServiceController, deleteServiceController, fetchSingleServiceController, fetchServiceController, updateServiceController } from '../controller/serviceController.js';



// fetch all Service
router.get('/fetch-all',/*requireSignin,*/fetchServiceController)
// fetch single Service
router.get('/fetch/:id',/*requireSignin,*/fetchSingleServiceController)
// add-new-Service
router.post('/add',/*requireSignin,*/addNewServiceController)
// update Service by id
router.put('/update/:id',/*requireSignin,*/updateServiceController)
// delete Service by id
router.delete('/delete/:id',/*requireSignin,*/deleteServiceController)




export default router;