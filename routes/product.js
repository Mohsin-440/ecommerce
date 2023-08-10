const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send("HEllo this is product Routing");

});

module.exports = router;