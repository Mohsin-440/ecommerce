
import { products } from "../../models/ProductsSchemae/products.js";
import { productSubVariations } from "../../models/ProductsSchemae/subVariations.js";
import { productVariations } from "../../models/ProductsSchemae/variations.js";
 
export const createProduct = async (req, res) => {
  try {
    const checkName = await products.findOne({
      title: req.body.title,
    });
    if (checkName)
      return res.status(403).json({ error: { title: "Title already taken." } });

    const { variations } = req.body;


    delete req.body.variations;
    const createdProduct = await products.create(req.body);
    if (createdProduct._id) {
      for (let i = 0; i < variations.length; i++) {
        const { subVariations } = variations[i]
        delete req.body.variations;

        const variatonCreated = await productVariations.create(variations[i]);
        if (subVariations?.length > 0) {
          for (let j = 0; j < subVariations?.length; j++) {

            productSubVariations.create({ variationId: variatonCreated._id, ...subVariations[j] })
          }
        }
      }
    }
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
      return res.status(404).json({ error: { message: "Page not found." } });

    const checkName = await products.findOne({
      title: req.body.title,
      _id: { $ne: req.params._id },
    });
    if (checkName)
      return res.status(403).json({ error: { title: "Name already taken." } });

    const updateProduct = await products.updateOne(
      {
        _id: req.params._id,
      },
      {
        $set: req.body,
      }
    );
    const getProduct = await products.findById(req.params._id);

    res.status(201).json(getProduct);
  } catch (error) {
    console.log(`error occurred while updating Product: ${error}`);
    res.status(500).json(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const delProduct = await products.findByIdAndDelete(req.params._id);
    res.status(202).json("Product is successfully deleted...");
  } catch (error) {
    console.log(`error occurred while deleting Product: ${error}`);
    res.status(500).json(error);
  }
};

