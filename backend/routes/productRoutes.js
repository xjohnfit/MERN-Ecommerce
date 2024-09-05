import express from "express";
import formidable from "express-formidable";
const router = express.Router();

//import controllers
import { addProduct } from "../controllers/productController.js";


import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import checkId from "../middleware/CheckId.js";

router.route("/").post(authenticate, authorizeAdmin, formidable(), addProduct);




export default router;