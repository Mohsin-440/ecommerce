import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("HEllo this is cart Routing");
});

export default router;
