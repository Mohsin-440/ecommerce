import { orders } from "../../models/Order.js";

const getOneOrder = async (req, res) => {
  try {
    const searchOrder = await orders.find(req.params._id);

    if (!searchOrder) {
      res.status(404).json("order not found");
    } else {
      res.status(200).json(searchOrder);
    }
  } catch (error) {
    console.log(
      `error occurred while searching ${req.params._id} Order: ${error}`
    );
    res.status(500).json(error);
  }
};

const getAllOrders = async (req, res) => {
  const { query } = req;

  try {
    if (req.user.role === "admin") {
    }
    const getOrders =
      Object.entries(query).length > 0 && req.user.role === "admin"
        ? await orders.find({ ...query })
        : await orders.find({
          user
        });
    res.status(200).json(getOrders);
  } catch (error) {
    console.log(`error occurred while searching Orders: ${error}`);
    res.status(500).json(error);
  }
};

export { getOneOrder, getAllOrders };
