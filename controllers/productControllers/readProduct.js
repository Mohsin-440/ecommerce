import { Types } from "mongoose";
import { products } from "../../models/Product.js";

const getOneProduct = async (req, res) => {
  try {
    let searchQuery;
    const { query } = req;
    if (query.subVariationId) {
      searchQuery = {
        _id: req.params._id,
        variations: {
          _id: query.variationId,
        },
      };
    }
    const getProduct = await products.findById(req.params._id);
    
    if (!getProduct) return res.status(404).json("Product not found!");
    res.status(200).json(getProduct);
  } catch (error) {
    console.log(`error occurred while getting One Product: ${error}`);

    res.status(500).json(error);
  }
};

const searchProducts = async (req, res) => {
  let query = req.query;

  try {
    const getAllProduct =
      Object.entries(query).length > 0
        ? await products.find({ ...query })
        : await products.find();
    res.status(200).json(getAllProduct);
  } catch (error) {
    console.log(`error occurred while searching Product: ${error}`);
    res.status(500).json(error);
  }
};

export { getOneProduct, searchProducts };
