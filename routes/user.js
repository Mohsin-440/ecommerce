const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send("HEllo this is user Routing");

});

module.exports = router;