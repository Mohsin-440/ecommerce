import Joi from "joi";
import { validatationTemplate } from "../../helpers/validateHelper.js";

export const signUpValidator = (req, res, next) => {
  const schema = Joi.object()
    .keys({
      email: Joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.empty": "Email is required",
        "string.pattern.base": "Email is invalid",
        "string.email": "please enter a valid email",
      }),
      firstName: Joi.string().required().messages({
        "any.required": "FirstName is required",
        "string.empty": "FirstName is required",
      }),
      lastName: Joi.string().required().messages({
        "any.required": "LastName is required",
        "string.empty": "LastName is required",
      }),
      password: Joi.string().required().messages({
        "any.required": "Password is required",
        "string.empty": "Password is required",
      }),
      confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
          "any.required": "Confirm Password is required",
          "string.empty": "Confirm Password is required",
          "any.only": "Confirm Password must be same as Password",
        }),
      timezone: Joi.string().required().messages({
        "any.required": "Timezone is required",
        "string.empty": "Timezone is required",
      }),
      // description: Joi.string().required()
      //     .messages({
      //         "any.required": "Description is required",
      //         "string.empty": "Description is required",
      //     }),
    })
    .unknown(false);
  validatationTemplate(req, res, next, schema);
};

