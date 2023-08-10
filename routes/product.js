import express from "express";

const productRouter = express.Router();
productRouter.get("/", (req, res) => {
  res.status(200).send("HEllo this is product Routing");
});


export default productRouter;
