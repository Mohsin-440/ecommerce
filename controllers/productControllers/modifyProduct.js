import { products } from "../../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const checkName = await products.findOne({
      title: req.body.title,
    });
    if (checkName)
      return res.status(403).json({ error: { title: "Title already taken" } });

    const createdProduct = await products.create(req.body);

    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(`error occurred while careating Product: ${error}`);
    res.status(500).json(error);
  }
};
export const updateProduct = async (req, res) => {
  try {
    const findProduct = await products.findOne({
      _id: req.params._id,
    });

    if (!findProduct)
      return res.status(403).json({ error: { id: "Id is required" } });

    const checkName = await products.findOne({
      title: req.body.title,
    });
    if (checkName)
      return res.status(403).json({ error: { title: "Name already taken" } });

    const updateProduct = await products.findByIdAndUpdate(req.params._id, {
      $set: req.body,
    });

    res.status(201).json(updateProduct);
  } catch (error) {
    console.log(`error occurred while updating Product: ${error}`);
    res.status(500).json(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const delProduct = await products.findByIdAndDelete(req.params._id);
    res.status(202).json("Product is successfully deleted...")
  } catch (error) {
    console.log(`error occurred while deleting Product: ${error}`);
    res.status(500).json(error);
  }
};
