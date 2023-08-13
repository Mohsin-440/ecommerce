import { carts } from "../../models/Cart.js";
import { products } from "../../models/Product.js";

export const addCart = async (req, res) => {
  try {
    const { products } = req.body;

    for (let i = 0; i < products.length; i++) {
      if (products[i].prodcutId) {
        const getProduct = await products.findOne({
          _id: products[i].prodcutId,
          quantity: { $lt: products[i].quantity }
        });

        if (getProduct) {
          res.status(404).json({
            error: {
              qunatity: "Product is out of stock.",
              prodcutId: products[i].prodcutId,
            },
          });
          break;
        }
      }
    }

    const createCart = carts.create(req.body);
    return res.status(201).json(createCart);
  } catch (error) {
    console.log(`error occurred while updating Cart: ${error}`);
    return res.status(500).json(error);
  }
};

export const updateCart = async (req, res) => {
  try {
    const { products } = req.body;

    for (let i = 0; i < products.length; i++) {
      if (products[i].prodcutId) {
        const getProduct = await products.findOne({
          _id: products[i].prodcutId,
          quantity: { $lt: products[i].quantity },
        });

        if (getProduct) {
          res.status(404).json({
            error: {
              qunatity: "Product is out of stock.",
              prodcutId: products[i].prodcutId,
            },
          });
          break;
        }
      }
    }

    const createCart = carts.create(req.body);
    return res.status(201).json(createCart);
  } catch (error) {
    console.log(`error occurred while updating Cart: ${error}`);
    return res.status(500).json(error);
  }
};
