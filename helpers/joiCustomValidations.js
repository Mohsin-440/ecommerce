import joi from "joi";
import { Types } from "mongoose";

export const objectValidator = (value, helper) => {

    if (!Types.ObjectId.isValid(value))
        return helper.error("any.invalid");

    return true;
}
export const greaterThanValidator = (number) => (value, helper) => {
    console.log(value <= number)
    if (value <= number)
        return helper.error("number.min");

    return true;
}

export const imageValidation = {
    images: joi.array().required().items(joi.object({
        url: joi.string().required().messages({
            "any.required": "Image url is required",
            "string.empty": "Image url is required",
            "string.base": "Image url must be a string",
        }),
        priority: joi.number().required().messages({
            "any.required": "Image priority is required.",
            "number.base": "Image priority must be a number.",
        })
    }))
}