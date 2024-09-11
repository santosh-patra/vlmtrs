import express from 'express';
const router = express.Router();
import multer from 'multer'
import { requireSignin } from '../middleware/middleware.js';
import { addNewAccessoryController, deleteAccessoryController, fetchSingleAccessoryController, fetchAccessoryController, updateAccessoryController } from '../controller/accessoryController.js';



// fetch all Accessory
router.get('/fetch-all',/*requireSignin,*/fetchAccessoryController)
// fetch single Accessory
router.get('/fetch/:id',/*requireSignin,*/fetchSingleAccessoryController)
// add-new-Accessory
router.post('/add',/*requireSignin,*/addNewAccessoryController)
// update Accessory by id
router.put('/update/:id',/*requireSignin,*/updateAccessoryController)
// delete Accessory by id
router.delete('/delete/:id',/*requireSignin,*/deleteAccessoryController)




export default router;