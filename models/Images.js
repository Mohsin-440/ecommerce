import { Schema, model } from "mongoose";

const imageSchema = new Schema(
    {
        url: { type: String, required: true },
        priority: { type: Number }
    }
)


export const images = model("image", imageSchema)