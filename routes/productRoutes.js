import express from "express";
import {createProduct, getAllProducts , getSingleProduct , deleteProduct, updateProduct} from "../controllers/productcontroller.js";

const router = express.Router();

router.post("/createproduct", createProduct);
router.get("/getallproducts", getAllProducts);
router.get("/getsingleproduct/:id", getSingleProduct);
router.put('/editproduct/:id', updateProduct)
router.delete("/deleteproduct/:id", deleteProduct);



export default router;
