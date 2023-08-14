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