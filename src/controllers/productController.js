
const Product = require("../models/productModel");

//Create new product
exports.createProduct = async (req, res) => {
  const { name, description, weight, price, category, imageUrl, stock } = req.body;
  try {
    if (!name || !price || !description || !category) {
      return res
        .status(400)
        .json({ message: "Name, price, weight, description, category are required!" });
    }
    const product = new Product({
      name,
      description,
      weight,
      price,
      category,
      imageUrl,
      stock,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error });
  }
};

// Get active products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ deleted: false });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all products
exports.getProductsIncludingDeleted = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
//Soft delete product
exports.softDeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: { deleted: true } },
      { new: true }
    );
    if (!product) {
        return res.status(400).json({message: "Product could not be found"})
    }
    console.log("Soft-deleted product:", product);
    return res.status(200).json({ message: "Product marked as deleted", product });
  } catch (error) {
    console.error("Error during delete request", error)
    return res.status(500).json({message: "Internal server error"})
  }
};

//Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (
      updates.category &&
      ![
        "mic-dejun",
        "pranz",
        "cina",
        "desert",
        "bauturi-alcoolice",
        "bauturi-nealcoolice",
      ].includes(updates.category)
    ) {
      return res.status(400).json({
        message:
          "Invalid category, make sure you select one of these: mic-dejun, pranz,cina, desert, bauturi-alcoolice, bauturi-nealcoolice",
      });
    }
    if (typeof updates.stock !== 'undefined') {
      updates.available = updates.stock > 0;
    }  
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true, // This runs mongoose validators once more before the object is saved.
    });
    if (!updatedProduct) {
      return res.status(400).json({ message: "Product could not be found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Search a product by name, description and/or category
exports.searchProduct = async (req, res) => {

  const query = req.query.q;
  const category = req.query.category;
  if (!query) {
    return res.status(400).json({message: "Search query is required"})
  }
  try {
     const filter = {
        deleted: false,
        $or: [
            {name: {$regex: query, $options: "i"} },
            {description: {$regex: query, $options: "i"}}
        ]
     }   
     if (category) {
        filter.category = category;
     }
     const products = await Product.find(filter);
     
     res.json(products);
     //Request example: GET /products/search?q=pizza&category=pranz
    } catch (error) {
    console.error('Error searching for products:', error);
    res.status(500).json({ message: 'Internal server error' });
    }
}