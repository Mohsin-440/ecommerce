import { orders } from "../../models/Order.js";

export const addOrder = async (req, res) => {};
export const updateOrder = async (req, res) => {};
export const deleteOrder = async (req, res) => {
  try {
    const findOrder = await orders.findById(req.params._id);

    if (!findOrder) res.status(404).json("order not found.");
    else {
      const deletedOrder = await orders.deleteOne({ _id: req.params._id });
      res.status(200).json(findOrder);
    }
  } catch (error) {
    console.log(`error occurred while deleting Order: ${error}`);
    res.status(500).json(error);
  }
};
