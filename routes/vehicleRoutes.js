import express from 'express';
const router = express.Router();
import multer from 'multer'
import { requireSignin } from '../middleware/middleware.js';
import { addNewVehicleController, deleteVehicleController, fetchSingleVehicleController, fetchVehicleController, updateVehicleController } from '../controller/vehicleController.js';



// fetch all Vehicle
router.get('/fetch-all',/*requireSignin,*/fetchVehicleController)
// fetch single Vehicle
router.get('/fetch/:id',/*requireSignin,*/fetchSingleVehicleController)
// add-new-Vehicle
router.post('/add',/*requireSignin,*/addNewVehicleController)
// update Vehicle by id
router.put('/update/:id',/*requireSignin,*/updateVehicleController)
// delete Vehicle by id
router.delete('/delete/:id',/*requireSignin,*/deleteVehicleController)




export default router;