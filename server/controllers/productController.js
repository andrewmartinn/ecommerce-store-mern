import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (img) => img !== undefined
    );

    // upload images to cloudinary and returns cloudinary image url
    const imagesUrl = await Promise.all(
      images.map(async (img) => {
        let result = await cloudinary.uploader.upload(img.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const newProduct = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestSeller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    const createdProduct = await Product.create(newProduct);

    res.status(200).json({
      success: true,
      message: "Product successfully created",
      createdProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: false, message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.body;

    const foundProduct = await Product.findById(productId);

    if (!foundProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, foundProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.body.id);

    if (!deletedProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to delete product" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product removed", deletedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: false, message: error.message });
  }
};

export { addProduct, getAllProducts, getProductById, deleteProduct };
