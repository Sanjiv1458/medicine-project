import Product from '../models/product.model.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Utility function to upload image to Cloudinary
const handleImageUpload = async (file) => {
  try {
    if (!file || (Array.isArray(file) && file.length === 0) || !file.path) {
      throw new ApiError(400, "File is required");
    }

    const localFilePath = Array.isArray(file) ? file[0].path : file.path;

    const response = await uploadOnCloudinary(localFilePath);

    if (response && response.url) {
      return response;
    } else {
      throw new ApiError(500, "Error uploading file to Cloudinary");
    }
  } catch (error) {
    console.error("Error handling image upload:", error);
    throw error;
  }
};

const getProductByIdOrFail = async (res, productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, 'Product not found');
    }
    return product;
  } catch (error) {
    throw new ApiResponse(error.status, null, error.message);
  }
};

class productController {
  static createProduct = asyncHandler(async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
      throw new ApiError(403, 'Permission denied. Admin access required.');
    }
    try {
      const { name, description, price, category, type, tags, manufacturer, inventory } = req.body;
      const productImg = await handleImageUpload(req.file);

      const product = await Product.create({
        name: name,
        description: description,
        price: price,
        category: category,
        type: type,
        tags: tags,
        manufacturer: manufacturer,
        inventory: inventory,
        productImg: productImg.url
      });

      await product.save({ validateBeforeSave: false });
      res.status(201).json(new ApiResponse(201, null, 'Product created successfully'));
    } catch (error) {
      res.status(error.status || 500).json(new ApiResponse(error.status, null, error.message || 'Error creating product'));
    }
  });

  static getProducts = asyncHandler(async (req, res) => {
    try {
      const products = await Product.find();
      res.json(new ApiResponse(200, products, 'Products fetched successfully'));
    } catch (error) {
      res.status(error.status || 500).json(new ApiResponse(error.status, null, error.message || 'Error fetching products'));
    }
  });

  static getProductById = asyncHandler(async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await getProductByIdOrFail(res, productId);

      if (product) {
        res.json(new ApiResponse(200, product, 'Product fetched successfully'));
      }
    } catch (error) {
      res.status(error.status).json(new ApiResponse(error.status, null, error.message));
    }
  });

  static updateProduct = asyncHandler(async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
      throw new ApiError(403, 'Permission denied. Admin access required.');
    }
    try {
      const { productId } = req.params;
      const { name, description, price, category, type, tags, manufacturer, inventory } = req.body;

      const product = await getProductByIdOrFail(res, productId);

      let productImg = product.productImg;
      if (req.file) {
        if (product.productImg) {
          const publicId = product.productImg.replace(/.*\//, '').replace(/\..*/, '');
          await deleteFromCloudinary(publicId);
        }

        productImg = (await handleImageUpload(req.file)).url;
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: { name, description, price, category, type, tags, manufacturer, inventory, productImg } },
        { new: true }
      );

      if (updatedProduct) {
        res.json(new ApiResponse(200, updatedProduct, 'Product updated successfully'));
      }
    } catch (error) {
      res.status(error.status || 500).json(new ApiResponse(error.status, null, error.message || 'Error updating product'));
    }
  });

  static updateStockStatus = asyncHandler(async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
      throw new ApiError(403, 'Permission denied. Admin access required.');
    }
    try {
      const { productId } = req.params;
      const { inStock } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: { 'inventory.inStock': inStock } },
        { new: true }
      );

      if (updatedProduct) {
        res.json(new ApiResponse(200, updatedProduct, 'Stock status updated successfully'));
      }
    } catch (error) {
      res.status(error.status || 500).json(new ApiResponse(error.status, null, error.message || 'Error updating stock status'));
    }
  });

  static deleteProduct = asyncHandler(async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
      throw new ApiError(403, 'Permission denied. Admin access required.');
    }
    try {
      const { productId } = req.params;

      const product = await getProductByIdOrFail(res, productId);

      if (product && product.productImg) {
        const publicId = product.productImg.replace(/.*\//, '').replace(/\..*/, '');
        await deleteFromCloudinary(publicId);
      }

      const deletedProduct = await Product.findByIdAndDelete(productId);

      if (deletedProduct) {
        res.json(new ApiResponse(200, null, 'Product deleted successfully'));
      }
    } catch (error) {
      res.status(error.status || 500).json(new ApiResponse(error.status, null, error.message || 'Error deleting product'));
    }
  });
}

export default productController;
