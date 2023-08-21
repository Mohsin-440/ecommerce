import { addImageToSchema } from "../../helpers/mongooseValidator.js";

export const productData = {

    color: {
        name: {
            type: String, required: true
        },
        colorCode: {
            type: String, required: true
        },
    },

    price: { type: Number },

    quantity: { type: Number },

    ...addImageToSchema()
}
