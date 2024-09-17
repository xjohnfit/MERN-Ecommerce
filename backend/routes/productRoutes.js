import express from 'express';
import formidable from 'express-formidable';
const router = express.Router();

//import controllers
import {
    addProduct,
    updateProductDetails,
    removeProduct,
    fetchProducts,
    fetchProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
} from '../controllers/productController.js';

import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import checkId from '../middleware/CheckId.js';

router
    .route('/')
    .get(fetchProducts)
    .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route('/allproducts').get(fetchAllProducts);
router.route('/:id/reviews').post(authenticate, authorizeAdmin, checkId, addProductReview);

router.get('/top', fetchTopProducts);
router.get('/new', fetchNewProducts);

router
    .route('/:id')
    .get(fetchProductById)
    .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
    .delete(authenticate, authorizeAdmin, removeProduct);

export default router;
