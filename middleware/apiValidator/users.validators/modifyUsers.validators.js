import Joi from "joi";
import { validatationTemplate } from "../../../helpers/validateHelper.js";

export const updateUsersValidator = (req, res, next) => {
  const schema = Joi.object()
    .keys({
      email: Joi.string().email().messages({
        "string.pattern.base": "Email is invalid",
        "string.email": "please enter a valid email",
      }),

      firstName: Joi.string().messages({
        "string.base": "First Name must be a string",
      }),

      lastName: Joi.string().messages({
        "string.base": "Last Name must be a string",
      }),
      password: Joi.string().messages({
        "string.base": "Password must be a string",
      }),

      confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .messages({
          "any.only": "Confirm Password must be same as Password",
          "string.base": "Confirm Password must be a string",
        }),
    })
    .unknown(false);
  validatationTemplate(req, res, next, schema);
};
