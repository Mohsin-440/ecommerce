import { Types } from "mongoose";
import { validatationTemplate, } from "../../../helpers/validateHelper.js";
import joi from "joi";
import { greaterThanValidator, objectValidator } from "../../../helpers/joiCustomValidations.js";

const checkIfElseValidation = (req, res) => {
  let error = false
  const objectKeys = ["imgUrl", "color", "price", "categoryId"];

  if (!req.body.variations) {

    let checkObjectKeysError = ""
    objectKeys.forEach(key => {
      if (!req.body?.[key])
        checkObjectKeysError = key
    })

    if (checkObjectKeysError) {
      res.status(403).json({
        error: {
          [checkObjectKeysError]: `${checkObjectKeysError} is required.`,
        }
      })
      return error = true
    }

  }


  else if (req.body.price && req.body.variations && req.body.variations.length) {

    const { variations } = req.body;
    for (let i = 0; i < variations.length; i++) {
      if (variations[i].price) {
        res.status(403).json({
          error: {
            message: "when price is given for whole product, each variation cannot have its own price",
          }
        })
        return error = true
      }
    }
  }


  else if (req.body.color && req.body.variations && req.body.variations.length) {
    const { variations } = req.body
    for (let i = 0; i < variations.length; i++) {
      if (variations[i].color) {
        res.status(403).json({
          error: {
            message: "when color is given for whole product, each variation cannot have its own price",
          }
        })
        return error = true

      }
    }
  }


}
export const addProductValidator = (req, res, next) => {

  if (checkIfElseValidation(req, res))
    return

  const subVariationScehma = joi.object().keys({
    price: joi.number().integer().custom(greaterThanValidator(0)).messages({
      "any.required": "Price is required.",
      "number.min": "Price must be greater than 0.",
      "number.integer": "Price must be in whole number.",
      "number.base": "Price must be a number.",
    }),
    color: joi.object().keys({
      name: joi.string().required().messages({
        "string.base": "Color Name must be a string",
        "any.required": "Color Name is required",

      }),
      colorCode: joi.string().messages({
        "string.base": "Color Code must be a string",
        "string.empty": "Color Code must not be empty.",
      }),

    }).required().messages({
      "any.required": "Color is required"
    }),
    quantity: joi.number().required().messages({
      "number.base": "Quantity must be a Number",
      "any.required": "Quantity is required",
    }),
    imgUrl: joi.string().messages({
      "string.base": "Image url must be a string",
    }),
  })


  const variationScehma = joi.object().keys({
    size: joi.string().required().messages({
      "any.required": "Size is required",
      "string.base": "Size must be a string",
    }),
    subVariations: joi.array().items(subVariationScehma).required().messages({
      "any.required": "Sub Variations is required."
    })
  })
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
      imgUrl: joi.string().messages({
        "any.required": "Image is required",
        "string.empty": "Image is required",
        "string.base": "Image must be a string",
      }),
      color: joi.string().messages({
        "any.required": "Color is required",
        "string.empty": "Color is required",
        "string.base": "Color must be a string",
      }),
      price: joi.number().integer().custom(greaterThanValidator(0)).messages({
        "any.required": "Price is required.",
        "number.min": "Price must be greater than 0.",
        "number.integer": "Price must be in whole number.",
        "number.base": "Price must be a number.",
      }),
      // .when("variations", { not: joi.exist(), then: joi.required() }),
      categoryId: joi.string().required().custom(objectValidator)
        .messages({
          "any.invalid": "categoryId must be a BSON object Id.",
          "string.base": "categoryId must be a BSON object Id.",
          "any.required": "categoryId is required",
          "string.empty": "categoryId is required",
        }),
      variations: joi.when('color', { not: joi.exist(), then: joi.array().items(variationScehma).required() })
        .messages({
          "any.required": "Variations are required."
        })

    })
    .unknown(false);

  validatationTemplate(req, res, next, schema);

};

export const updateProductValidator = (req, res, next) => {
  if (checkIfElseValidation(req, res))
    return


  const subVariationScehma = joi.object().keys({
    price: joi.number().custom(greaterThanValidator(0)).messages({
      "number.base": "Price must be a Number.",
      "number.min": "Price must be greater than 0.",
    }),
    color: joi.object().keys({
      name: joi.string().required().messages({
        "string.base": "Color Name must be a string",
        "any.required": "Color Name is required",

      }),
      colorCode: joi.string().messages({
        "string.base": "Color Code must be a string",
        "string.empty": "Color Code must not be empty.",
      }),

    }).required().messages({
      "any.required": "Color is required"
    }),
    quantity: joi.number().required().messages({
      "number.base": "Quantity must be a Number",
      "any.required": "Quantity is required",
    }),
    imgUrl: joi.string().messages({
      "string.base": "Image url must be a string",
    }),
  })


  const variationScehma = joi.object().keys({
    size: joi.string().messages({
      "string.base": "Size must be a string",
    }),
    subVariations: joi.array().items(subVariationScehma)
  })

  const schema = joi
    .object()
    .keys({
      title: joi.string().required().messages({
        "string.empty": "Title must not be empty.",
        "string.base": "Title must be a string.",
      }),
      description: joi.string().required().messages({
        "string.empty": "Description must not be empty.",
        "string.base": "Description must be a string.",
      }),
      imgUrl: joi.string().messages({
        "string.empty": "Image is must not be empty.",
        "string.base": "Image must be a string.",
      }),
      color: joi.string().messages({
        "string.empty": "Color must not empty.",
        "string.base": "Color must be a string.",
      }),
      price: joi.number().custom(greaterThanValidator(0)).messages({
        "number.min": "Price must be minmum 1",
        "number.integer": "Price must be in whole number",
        "number.base": "Price must be a number",
      }),
      // .when("variations", { not: joi.exist(), then: joi.required() }),
      categoryId: joi.string().required().custom(objectValidator)
        .messages({
          "any.invalid": "categoryId must be a BSON object Id.",
          "string.base": "categoryId must be a BSON object Id.",
          "any.required": "categoryId is required",
          "string.empty": "categoryId is required",
        }),
      variations: joi.when('color', { not: joi.exist(), then: joi.array().items(variationScehma).required() })
        .messages({
          "any.required": "Variations are required."
        })

    })
    .unknown(false);

  validatationTemplate(req, res, next, schema);
};
