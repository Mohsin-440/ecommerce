import { categories } from "../../models/categories.js";


export const getOneCategory = async (req, res) => {
  try {
    let queryObject = {};

    if (req?.query?.categoryName)
      queryObject = { categoryName: req.query.categoryName };

    else if (req?.query?.category_id)
      queryObject = { _id: req.query.category_id };

    else return res.status(404).json("page not found");


    const getProduct = await categories.findById(queryObject);

    res.status(200).json(getProduct);
  } catch (error) {
    res.status(404).json("NO category found");
  }
};

export const getAllCategories = async (req,res)=>{
    try {
        const getAllCategory = await categories.find();
        res.status(200).json(getAllCategory);
    } catch (error) {
        res.status(404).json("NO category found");
    }
}