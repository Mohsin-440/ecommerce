import { validatationTemplate } from "../../../helpers/validateHelper.js";
import joi from "joi";

export const addProductValidator = (req, res, next) => {
  const schema = joi
    .object()
    .keys({
      title: joi.string().required().messages({
        "any.required": "Title is required",
        "string.empty": "Title is required",
        "string.base": "Title must be a string",
      }),
      description: joi.string().required().messages({
        "any.required": "Description is required",
        "string.empty": "Description is required",
        "string.base": "Description must be a string",
      }),
      imgUrl: joi.string().required().messages({
        "any.required": "Image is required",
        "string.empty": "Image is required",
        "string.base": "Image must be a string",
      }),
      size: joi.string().required().messages({
        "any.required": "Size is required",
        "string.empty": "Size is required",
        "string.base": "Size must be a string",
      }),
      color: joi.string().required().messages({
        "any.required": "Color is required",
        "string.empty": "Color is required",
        "string.base": "Color must be a string",
      }),
      price: joi.number().min(1).integer().required().messages({
        "any.required": "Price is required",
        "number.min": "Price must be minmum 1",
        "number.integer": "Price must be in whole number",
        "number.base": "Price must be a number",
      }),
      categoryId: joi.string().required().messages({
        "any.required": "Category is required",
        "string.empty": "Category is required",
        "string.base": "Category must be a string",
      }),
    })
    .unknown(false);

  validatationTemplate(req, res, next, schema);
};

export const updateProductValidator = (req, res, next) => {
  const schema = joi
    .object()
    .keys({
      title: joi.string().messages({
        "string.base": "Title must be a string",
      }),
      description: joi.string().messages({
        "string.base": "Description must be a string",
      }),
      imgUrl: joi.string().messages({
        "string.base": "Image must be a string",
      }),
      size: joi.string().messages({
        "string.base": "Size must be a string",
      }),
      color: joi.string().messages({
        "string.base": "Color must be a string",
      }),
      price: joi.number().min(1).integer().messages({
        "number.min": "Price must be minmum 1",
        "number.integer": "Price must be in whole number",
        "number.base": "Price must be a number",
      }),
      categoryId: joi.string().messages({
        "string.base": "Category must be a string",
      }),
    })
    .unknown(false);

  validatationTemplate(req, res, next, schema);
};
