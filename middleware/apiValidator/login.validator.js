import { validatationTemplate } from "../../helpers/validateHelper.js";
import joi from "joi"
export const loginValidator = (req, res, next) => {
  const schema = joi.object()
    .keys({
      email: joi.string().email().messages({
        "any.required": "Email is required",
        "string.empty": "Email is required",
        "string.pattern.base": "Email is invalid",
        "string.email": "please enter a valid email",
      }),
      password: joi.string().required().messages({
        "any.required": "Password is required",
        "string.empty": "Password is required",
      }),
    })
    .unknown(false);
  validatationTemplate(req, res, next, schema);
};