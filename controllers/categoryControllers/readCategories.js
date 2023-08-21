import { categories } from "../../models/categories.js";

import { __rootFolder } from "../../index.js";
import path from "path";
import fs from "fs";
import { images } from "../../models/Images.js";


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

 
export const getCategoryImage = async (req, res) => {

  try {

    const getCategory = await categories.findById(req.params.categoryId)

    let check = false
    if (getCategory) {

      for (const value of getCategory.images) {

        if (value.toString() === req.params.imageId) {
          check = true
        }
      }
    }

    if (!check)
      return res.status(404).json("check")

    const imageGot = await images.findById(req.params.imageId)

    if (!imageGot)
      return res.status(404).json("image")



    let filePath = path.join(__rootFolder, imageGot?.url);



    if (filePath)
      fs.readFile(filePath, (err, success) => {
        const parts = filePath.split(/\./);
        try {
          if (err) {
            console.log(`err occurred while reading file`, err)
            return res.status(404).json("file not found")
          }
          const imageType = `image/${parts[parts.length - 1]}`;

          res.set({ 'Content-Type': imageType });
          res.status(200).send(success)
        } catch (error) {
          // console.log(`error occurred while getting sending vehicle type fs image: ${error}`);
          return res.status(500).json({ error: error });
        }
      })
    else
      res.status(404).json("file not found")



  } catch (error) {
    // console.log(`error occurred while getting voice message`, error)
  }
}

