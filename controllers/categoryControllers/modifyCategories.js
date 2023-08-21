import mongoose, { Schema } from "mongoose";
import { deleteAllFilesInThisReq, deleteById, deleteOneFile } from "../../helpers/deleteFiles.js";
import { categories, subCategories } from "../../models/categories.js";
import { images } from "../../models/Images.js";

export const createCategory = async (req, res) => {
  try {
    const checkCategoryName = await categories.find({
      categoryName: req.body.categoryName,
    });

    const addImages = await images.insertMany(req.images.categoryImage);

    const addedImageIds = addImages.map(imageObj => imageObj._id);

    if (checkCategoryName?.length && checkCategoryName?.length > 0) {

      deleteAllFilesInThisReq(req)

      return res
        .status(403)
        .json({ error: { categoryName: "Category Name already exists." } });

    }


    const createdCategory = await categories.create({ ...req.body, images: addedImageIds });

    return res.status(200).json(createdCategory);
  } catch (error) {
    console.log(`error occurred while creating Category: ${error}`);
    return res.status(500).json(error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const checkCategory = await categories.findById(req.params._id);

    if (!checkCategory) {
      deleteAllFilesInThisReq(req)
      return res
        .status(404)
        .json({ error: { categoryName: "Category not found." } });
    }

    const checkCategoryName = await categories.findOne({
      categoryName: req.body.categoryName,
      _id: {
        $ne: req.params._id
      }
    });


    if (checkCategoryName) {
      deleteAllFilesInThisReq(req)
      return res
        .status(403)
        .json({ error: { categoryName: "Category Name already exists" } });
    }

    if (req?.images?.updateCategoryImage?.length > 0) {
      await images.bulkWrite(req?.images?.updateCategoryImage)
      req?.images?.updateCategoryImage.forEach(image => {
        deleteById(image.updateOne.filter._id)
      })
    }

    let categtoryImagesIds = []
    if (req?.images?.categoryImage?.length > 0) {

      categtoryImagesIds = await images.insertMany(req.images.categoryImage)
      categtoryImagesIds = categtoryImagesIds.map(imageObj => imageObj._id)
    }


    categtoryImagesIds.forEach(categoryId => {

      if (!checkCategory.images.includes(categoryId))
        checkCategory.images.push(categoryId)

    })

    checkCategory.save();


    const getCategory = await categories.findById(req.params._id);

    return res.status(200).json(getCategory);
  } catch (error) {
    console.log(`error occurred while updating category: ${error}`);
    return res.status(500).json(error);
  }
};

export const createSubCategory = async (req, res) => {
  try {
    const findCatgory = await categories.findById(req.body.categoryId);

    const addImages = await images

    if (!findCatgory) {
      deleteAllFilesInThisReq(req)
      return res.status(404).json({ message: "category not found" });
    }


    const checkSubCategoryName = await subCategories.find({
      subCategoryName: req.body.subCategoryName,
    });


    if (checkSubCategoryName?.length && checkSubCategoryName?.length > 0) {
      deleteAllFilesInThisReq(req)
      return res.status(403).json({ error: { subCategoryName: "Subcategory name already exists..." } });
    }

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

    if (!findCatgory) {
      deleteAllFilesInThisReq(req)
      return res.status(404).json({ message: "sub Category not found" });
    }



    const checkSubCategoryName = await subCategories.find({
      subCategoryName: req.body.subCategoryName,
    });



    if (checkSubCategoryName?.length && checkSubCategoryName?.length > 0) {
      deleteAllFilesInThisReq(req)
      return res.status(403).json("Category Name already exists...");
    }

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
