import { products } from "../../models/Product.js";

const getOneProduct = async (req, res) => {
  try {
    const getProduct = await products.findById(req.params._id);
    res.status(200).json(getProduct);
  } catch (error) {
    res.status(404).json("Product not found!");
  }
};

const searchProducts = async (req, res) => {
  let query = req.query;
  query = {};
  try {
    const getAllProduct =
      Object.entries(query).length > 0
        ? await products.find({ ...query })
        : await products.find();
    res.status(200).json(getAllProduct);
  } catch (error) {
    res.status(500).json("No product");
  }
};

export { getOneProduct, searchProducts };
