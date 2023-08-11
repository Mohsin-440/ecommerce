import express from 'express';

const orderRouter = express.Router();

orderRouter.get("/", (req, res) => {
  res.status(200).send("HEllo this is order Routing");

});

export default orderRouter;