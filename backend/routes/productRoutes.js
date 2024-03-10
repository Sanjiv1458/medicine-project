// routes/productRoutes.js
import express from 'express';
import { upload } from "../middlewares/multer.middleware.js"
import productController from '../controllers/product.controller.js';
import IsLoggedIn from '../middlewares/auth.middleware.js';

const router = express.Router();

// Routes
router.use(IsLoggedIn.isAuthenticated);
router.post('/', upload.single('productImg'), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:productId', productController.getProductById);
router.put('/:productId', upload.single('productImg'), productController.updateProduct);
router.patch('/:productId/updateStockStatus', productController.updateStockStatus);
router.delete('/:productId', productController.deleteProduct);

export default router;
