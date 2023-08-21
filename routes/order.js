import express from "express";
import {
  addOrder,
  deleteOrder,
  updateOrder,
} from "../controllers/orderControllers/modifyOrders.js";
import {
  getOneOrder,
  getAllOrders,
} from "../controllers/orderControllers/readOrders.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeUser } from "../middleware/authorizeUser.js";

const orderRouter = express.Router();

orderRouter
  .post("/add", authenticateUser, authorizeUser(["customer"]), addOrder)
  
  .put("/update/:_id", authenticateUser, authorizeUser(["admin"]), updateOrder)
  
  .delete("/:_id", authenticateUser, authorizeUser(["admin"]), deleteOrder)


  .get("/:_id", authenticateUser, authorizeUser(["customer"]), getOneOrder)
  .get(
    "/",
    authenticateUser,
    authorizeUser(["customer", "admin"]),
    getAllOrders
  );

export default orderRouter;
