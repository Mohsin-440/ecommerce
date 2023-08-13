import { categories, subCategories } from "../../models/categories.js";

export const createCategory = async (req, res) => {
  try {
    const checkCategoryName = await categories.find({
      categoryName: req.body.categoryName,
    });

    if (checkCategoryName?.length && checkCategoryName?.length > 0)
      return res
        .status(403)
        .json({ error: { categoryName: "Category Name already exists..." } });

    const createdCategory = await categories.create(req.body);

    return res.status(200).json(createdCategory);
  } catch (error) {
    console.log(`error occurred while creating Category: ${error}`);
    return res.status(500).json(error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const checkCategoryName = await categories.find({
      categoryName: req.body.categoryName,
    });
    if (checkCategoryName?.length && checkCategoryName?.length > 0)
      return res
        .status(403)
        .json({ error: { categoryName: "Category Name already exists" } });

    const updateCategory = await categories.updateOne(
      {
        _id: req.params._id,
      },
      {
        $set: { ...req.body },
      }
    );
    const getCtagory = await categories.findById(req.params._id);
    return res.status(200).json(getCtagory);
  } catch (error) {
    console.log(`error occurred while updating category: ${error}`);
    return res.status(500).json(error);
  }
};

export const createSubCategory = async (req, res) => {
  try {
    const findCatgory = await categories.findById(req.body.categoryId);

    if (!findCatgory)
      return res.status(404).json({ message: "category not found" });

    const checkSubCategoryName = await subCategories.find({
      subCategoryName: req.body.subCategoryName,
    });

    if (checkSubCategoryName?.length && checkSubCategoryName?.length > 0)
      return res.status(403).json("Category Name already exists...");

    const createdSubCategory = await subCategories.create(req.body);

    return res.status(200).json(createdSubCategory);
  } catch (error) {
    console.log(`error occurred while creating subCategory: ${error}`);
    return res.status(500).json(error);
  }
};

export const updateSubCategory = async (req, res) => {
  try {
    const findCatgory = await subCategories.findById(req.params._id);

    if (!findCatgory)
      return res.status(404).json({ message: "sub Category not found" });

    const checkSubCategoryName = await subCategories.find({
      subCategoryName: req.body.subCategoryName,
    });
    if (checkSubCategoryName?.length && checkSubCategoryName?.length > 0)
      return res.status(403).json("Category Name already exists...");

    const updatesubCategory = await subCategories.updateOne(
      {
        _id: req.params._id,
      },
      {
        $set: req.body,
      }
    );
    const getSubCategory = await subCategories.findById(req.params._id);

    return res.status(200).json(getSubCategory);
  } catch (error) {
    console.log(`error occurred while updating subCategory: ${error}`);
    return res.status(500).json(error);
  }
};
