import { carts } from "../../models/Cart.js";
import { products } from "../../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const { products } = req.body;

    // for (let i = 0; i < products.length; i++) {
    //   if (products[i].prodcutId) {
    //     const getProduct = await products.findOne({
    //       _id: products[i].prodcutId,
    //       quantity: { $lt: products[i].quantity },
    //     });

    //     if (getProduct) {
    //       res.status(404).json({
    //         error: {
    //           qunatity: "Product is out of stock.",
    //           prodcutId: products[i].prodcutId,
    //         },
    //       });
    //       break;
    //     }
    //   }
    // }

    // const getProduct = await products.aggregate([
    //   {
    //     $unwind: "$variations",
    //   },
    //   {
    //     $unwind: "$variations.subVariations",
    //   },
    //   {
    //     $match: {
    //       "variations.subVariations._id": new Types.ObjectId(
    //         query.subVariationId
    //       ),
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 1,
    //       title: 1,
    //       variations: {
    //         _id: 1,
    //         size: 1,
    //         subVariations: {
    //           _id: 1,
    //         },
    //       },
    //       // "variations.subVariations._id": 1,
    //     },
    //   },
    // ]);
    // const getcart = await carts.aggregate;
    // [
    //   {
    //     $lookup: {
    //       from: "products",
    //       as: "cartProducts",
    //       let: {
    //         variationId: "$variationId",
    //         subVariationId: "$subVariationId",
    //         prodcutId: "$prodcutId",
    //       },
    //       pipeline: [
    //         {
    //           $unwind: "$variations",
    //         },
    //         {
    //           $unwind: "$variations.subVariations",
    //         },
    //         {
    //           $match: {
    //             $expr: {
    //               _id: "$$productId",

    //               "variations._id": "$$variationId",
    //             },
    //           },
    //         },
    //       ],
    //     },
    //   },
    // ];
    const createCart =await carts.create(req.body);
    console.log(req.body?.products?.[0]?.subVariationId,createCart)
    return res.status(201).json(createCart);
  } catch (error) {
    console.log(`error occurred while updating Cart: ${error}`);
    return res.status(500).json(error);
  }
};

export const updateCart = async (req, res) => {
  try {
    const { products } = req.body;

    for (let i = 0; i < products.length; i++) {
      if (products[i].prodcutId) {
        const getProduct = await products.findOne({
          _id: products[i].prodcutId,
          quantity: { $lt: products[i].quantity },
        });

        if (getProduct) {
          res.status(404).json({
            error: {
              qunatity: "Product is out of stock.",
              prodcutId: products[i].prodcutId,
            },
          });
          break;
        }
      }
    }

    const createCart = carts.create(req.body);
    return res.status(201).json(createCart);
  } catch (error) {
    console.log(`error occurred while updating Cart: ${error}`);
    return res.status(500).json(error);
  }
};
