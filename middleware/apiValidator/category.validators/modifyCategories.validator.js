import { imageValidation } from "../../../helpers/joiCustomValidations.js";
import { validatationTemplate, } from "../../../helpers/validateHelper.js";
import joi from "joi";

export const addCategoryValidator = (req, res, next) => {

  const schema = joi
    .object()
    .keys({
      categoryName: joi.string().required().messages({
        "any.required": "Category Name is required",
        "string.empty": "Category Name is required",
        "string.base": "Category Name must be a string",
      }),
    })
    .unknown(false);

  validatationTemplate(req, res, next, schema);
};

export const updateCategoryValidator = (req, res, next) => {
  const schema = joi
    .object()
    .keys({
      categoryName: joi.string().messages({
        "string.base": "Category Name must be a string",
      }),
    })
    .unknown(false);

  validatationTemplate(req, res, next, schema);
};











export const addSubCategoryValidator = (req, res, next) => {
  const schema = joi
    .object()
    .keys({
      categoryId: joi.string().required().messages({
        "any.required": "categoryId is required",
        "string.empty": "categoryId is required",
        "string.base": "categoryId must be a string",
      }),
      subCategoryName: joi.string().required().messages({
        "any.required": "Sub Category Name is required",
        "string.empty": "Sub Category Name is required",
        "string.base": "Sub Category Name must be a string",
      }),
      ...imageValidation
    }
    )
    .unknown(false);

  validatationTemplate(req, res, next, schema);
};



export const updateSubCategoryValidator = (req, res, next) => {
  const schema = joi
    .object()
    .keys({
      CategoryId: joi.string().messages({
        "string.base": "CategoryId must be a string",
      }),
      subCategoryName: joi.string().messages({
        "string.base": "Sub Category Name must be a string",
      }),
      ...imageValidation
    })
    .unknown(false);

  validatationTemplate(req, res, next, schema);
};
