import Product from "../models/Product.js";

// CREATE PRODUCT 
export const createProduct = async (req, res) => {
  try {
    const { name, sku, description, price, category } = req.body;

    if (!name || !sku || !price || !category) {
      return res.status(400).json({ message: "Name, SKU, price and category are required" });
    }

    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(409).json({ message: "Product with this SKU already exists" });
    }

    const newProduct = await Product.create({ name, sku, description, price, category });

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET ALL PRODUCTS (with pagination)
export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .select("name sku price category")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      message: "Products fetched successfully",
      page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET PRODUCT BY ID
// route -> /getSingleProduct/:id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// UPDATE PRODUCT 
// route -> /updateSingleProduct/:id
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sku, description, price, category } = req.body;

    if (!name && !sku && !description && !price && !category) {
      return res.status(400).json({ message: "At least one field is required to update" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, sku, description, price, category },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//DELETE PRODUCT 
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};