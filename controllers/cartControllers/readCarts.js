import { carts } from "../../models/Cart.js";
import { products } from "../../models/Product.js";

export const getFullCart = async (req, res) => {
  try {
    console.log("dsdsd");

    // const a = await carts.aggregate([
    //   {
    //     $lookup: {
    //       from: "products",
    //       localField: "productsAdded.productId",
    //       foreignField: "_id",
    //       as: "productsAdded.productId",
    //     },
    //   },
    //   {
    //     $unwind: "$productsAdded.productId",
    //   },
    //   {
    //     $lookup: {
    //       from: "variations",
    //       localField: "productsAdded.variationId",
    //       foreignField: "_id",
    //       as: "productsAdded.variationId",
    //     },
    //   },
    //   {
    //     $unwind: "$productsAdded.variationId",
    //   },
    //   {
    //     $lookup: {
    //       from: "subvariations",
    //       localField: "productsAdded.subVariationId",
    //       foreignField: "_id",
    //       as: "productsAdded.subVariationId",
    //     },
    //   },
    //   {
    //     $unwind: "$productsAdded.subVariationId",
    //   },
    //   {
    //     $project: {
    //       productsAdded: 1,
    //     },
    //   },
    // ]);
    const getCart = await carts.aggregate([
      {
        $lookup: {
          from: "products",
          as: "cartProducts",
          let: {
            variationId: "$variationId",
            subVariationId: "$subVariationId",
            productId: "$productId",
          },
          pipeline: [
            {
              $unwind: "$variations",
            },
            {
              $unwind: "$variations.subVariations",
            },
            // {
            //   $match: {
            //     $expr: {
            //       _id: "$$productId",

            //       "variations._id": "$$variationId",
            //     },
            //   },
            // },
          ],
        },
      },
    ]);
    console.log(getCart);
    res.status(200).json(getCart);
  } catch (error) {
    console.log(`error occurred while updating Cart: ${error}`);
    return res.status(500).json(error);
  }
};
