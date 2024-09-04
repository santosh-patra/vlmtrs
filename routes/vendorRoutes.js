import express from 'express';
const router = express.Router();
import multer from 'multer'
import { requireSignin } from '../middleware/middleware.js';
import { addNewVendorController, deleteVendorController, fetchSingleVendorController, fetchVendorController, totalVendorCountController, updateVendorController } from '../controller/vendorController.js';



// fetch all Vendor
router.get('/fetch-all',/*requireSignin,*/fetchVendorController)
// fetch total no. of Vendor
router.get('/fetch-total-count',/*requireSignin,*/totalVendorCountController)
// fetch single Vendor
router.get('/fetch/:id',/*requireSignin,*/fetchSingleVendorController)
// add-new-Vendor
router.post('/add',/*requireSignin,*/addNewVendorController)
// update Vendor by id
router.put('/update/:id',/*requireSignin,*/updateVendorController)
// delete Vendor by id
router.delete('/delete/:id',/*requireSignin,*/deleteVendorController)




export default router;