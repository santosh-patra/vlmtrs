import express from 'express';
const router = express.Router();
import multer from 'multer'
import { requireSignin } from '../middleware/middleware.js';
import { addNewDealerController, deleteDealerController, fetchSingleDealerController, fetchDealerController, updateDealerController } from '../controller/dealerController.js';



// fetch all Dealer
router.get('/fetch-all',/*requireSignin,*/fetchDealerController)
// fetch single Dealer
router.get('/fetch/:id',/*requireSignin,*/fetchSingleDealerController)
// add-new-Dealer
router.post('/add',/*requireSignin,*/addNewDealerController)
// update Dealer by id
router.put('/update/:id',/*requireSignin,*/updateDealerController)
// delete Dealer by id
router.delete('/delete/:id',/*requireSignin,*/deleteDealerController)




export default router;