import mongoose, { Schema } from "mongoose";

export const arrayMongooseValidator = (key, message) => {
  let validatorObj = {}

  if (key)
    validatorObj = {
      validate: {
        validator: function (array) {
          return array.length > 0;
        },
        message: message ? message : `At least one ${key} is required in the array.`
      }
    }



  return validatorObj
}

export const addImageToSchema = (key, message) => {

  const images = {
    images: {
      type: [{ type: Schema.Types.ObjectId, ref: "image" }],
      ...arrayMongooseValidator(key, message)
    }
  }
  
  return images
}