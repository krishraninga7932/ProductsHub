import express from "express"
const router = express.Router();
import {getProducts,addProduct,deleteProduct, getProduct, updateProduct} from "../controllers/productController.js"

router.get("/",getProducts)
router.get("/:id",getProduct)   
router.post("/",addProduct)
router.delete("/delete/:id",deleteProduct)
router.put("/update/:id",updateProduct)

export default router 