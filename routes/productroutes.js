import express from 'express';
import crypto from 'crypto'
const router = express.Router();
import multer from 'multer'
import { addNewProductController, deleteProductController, fetchImageController, fetchProductController, fetchSingleProductController, getTestController, searchProductController, totalProductCountController, updateProductController } from '../controller/productController.js';
import { requireSignin } from '../middleware/middleware.js';



// test a product with db operation
// fetch all product
router.get('/fetch-all',requireSignin,fetchProductController)
// fetch total no. of product
router.get('/fetch-total-count',requireSignin,totalProductCountController)
// fetch single product
router.get('/fetch/:id',requireSignin,fetchSingleProductController)
// add-new-product
router.post('/add',requireSignin,addNewProductController)
// search product
router.post('/search-product/:keyword',requireSignin, searchProductController);
// fetch image by id
router.get('/fetch-image/:id',requireSignin,fetchImageController)
// update product by id
router.put('/update/:id',requireSignin,updateProductController)
// delete product by id
router.delete('/delete/:id',requireSignin,deleteProductController)




export default router;