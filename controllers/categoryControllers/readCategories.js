import { categories } from "../../models/categories.js";

export const getOneCategory = async (req, res) => {
  try {
    let queryObject = {};

    if (req?.query?.categoryName)
      queryObject = { categoryName: req.query.categoryName };
    else if (req?.query?.categoryId)
      queryObject = { _id: req.query.categoryId };
    else return res.status(404).json("page not found");

    const getProduct = await categories.find(queryObject);

    res.status(200).json(getProduct);
  } catch (error) {
    console.log(`error occurred while getting One category: ${error}`);

    res.status(500).json(error);
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const getAllCategory = await categories.find();
    res.status(200).json(getAllCategory);
  } catch (error) {
    console.log(`error occurred while getting all categories: ${error}`);
    res.status(500).json(error);
  }
};
export const getAllCategoriesWithSubCategory = async (req, res) => {
  try {
    const getAllCategory = await categories.aggregate([
      {
        $lookup: {
          from: "subcategories",
          as: "subcategories",
          let: { categoryId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$categoryId", "$$categoryId"],
                },
              },
            },
          ],
        },
      },
    ]);
    res.status(200).json(getAllCategory);
  } catch (error) {
    console.log(`error occurred while getting all categories with subcategories: ${error}`);

    res.status(500).json(error);
  }
};
