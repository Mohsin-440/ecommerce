import { categories, subCategories } from "../../models/categories.js";

export const createCategory = async (req, res) => {
  try {
    const createdCategory = await categories.create(req.body);

    return res.status(200).json(createdCategory);
  } catch (error) {
    return res.status(500).json("Category already exist...");
  }
};

export const updateCategory = async (req, res) => {
  try {
    const createdCategory = await categories.updateOne(
      { _id: req.body._id },
      {
        $set: { ...req.body },
      }
    );

    return res.staus(200).json(createdCategory);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createSubCategory = async (req, res) => {
  try {
    const findCatgory = await categories.findById(req.body._id);
    if (!findCatgory)
      return res.status(404).json({ message: "category not found" });

    const createdCategory = await subCategories.create();

    return res.staus(200).json(createdCategory);
  } catch (error) {
    return res.status(500).json(error);
  }
};
