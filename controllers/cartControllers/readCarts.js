import { carts } from "../../models/Cart.js";
import { products } from "../../models/Product.js";

export const getFullCart = async (req, res) => {
  try {
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
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          as: "cartProducts",
          let: {
            cartProductId: "$products.productId",
            cartVariationId: "$products.variationId",
            cartSubVariationId: "$products.subVariationId",
          },
          pipeline: [
            {
              $unwind: "$variations",
            },
            {
              $unwind: "$variations.subVariations",
            },
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$cartProductId"],
                  $eq: ["$variations._id", "$$cartVariationId"],
                  $eq: [
                    "$variations.subVariations._id",
                    "$$cartSubVariationId",
                  ],
                },
              },
            },

            {
              $project: {
                variations: {
                  size: 1,
                  subVariations: {
                    price: 1,
                    color: 1,
                    stock: 1,
                    imgUrl: 1,
                  },
                },
                title: 1,
                imgUrl: 1,
                price: 1,
                color: 1,
              },
            },
          ],
        },
      },
      
      {
        $addFields: {
          "products": {
            $mergeObjects: [
              { $arrayElemAt: ["$cartProducts", 0] },
              { "quantity": "$products.quantity" }
            ]
          }
        }
      },
      {
        $project: {
          _id: 1,
          userId: 1,
         
          products: 1,
 
        },
      },
    ]);

    res.status(200).json(getCart);
  } catch (error) {
    console.log(`error occurred while updating Cart: ${error}`);
    return res.status(500).json(error);
  }
};

[
  {
    _id: "64daa6030ea153cca2c66326",
    userId: "64d804b63661a35e145e17b9",
    createdAt: "2023-08-14T22:09:07.865Z",
    updatedAt: "2023-08-14T22:09:07.865Z",
    products: [
      {
        productId: "64da93bd25197095b6df936d",
        variationId: "64da96dd6781f7e69da05992",
        subVariationId: "64da96dd6781f7e69da05993",
        quantity: 2,
        _id: "64daa6030ea153cca2c66327",
        cartProducts: {
          _id: "64da93bd25197095b6df936d",
          title: "Polo Tshirts",
          imgUrl: ["url"],
          variations: {
            size: "lg",
            subVariations: {
              color: {
                name: "black",
                colorCode: "#000000",
              },
              quantity: 10,
              imgUrl: [],
            },
          },
        },
      },
    ],
  },
];
