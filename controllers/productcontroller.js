import {ProductModel} from "../models/Product.js";

// create product 
const createProduct = async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);

    res.status(201).json({
      success : true, 
      product
    });

  } catch (error) {
    res.status(400).json({
      success : false,
      message : "product not created"
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();

    res.status(200).json(
    
      products
    );
  } catch (error) {
    res.status(400).json({
      success : false,
      message : "products not found"
    });
  }
}

const getSingleProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id); 

    res.status(200).json({
      success : true,
      product
    });
  } catch (error) {
    res.status(400).json({
      success : false,
      message : "product not found"
    });
  }
}

const updateProduct = async (req, res) => {
  try {

    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      product
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: "Product not updated"
    });

  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);  

    res.status(200).json({
      success : true,
      product
    });
  } catch (error) {
    res.status(400).json({
      success : false,
      message : "product not found"
    });
  }
}



export { createProduct , getAllProducts , getSingleProduct , deleteProduct , updateProduct };