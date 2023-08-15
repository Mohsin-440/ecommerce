export const productVariationsValidator = (req, res) => {
  let error = false;
  const objectKeys = ["imgUrl", "color", "price", "categoryId"];

  if (!req.body.variations) {
    let checkObjectKeysError = "";
    objectKeys.forEach((key) => {
      if (!req.body?.[key]) checkObjectKeysError = key;
    });
    if (checkObjectKeysError) {
      res.status(403).json({
        error: {
          [checkObjectKeysError]: `${checkObjectKeysError} is required.`,
        },
      });
      return (error = true);
    }
  }
  if (checkVariations(req, res, "price")) error = true;
  else if (checkVariations(req, res, "color")) error = true;
  else if (checkVariations(req, res, "stock")) error = true;
  return error;
};
function checkVariations(req, res, key) {
  let check = false;
  if (req.body?.[key] && req.body.variations && req.body.variations.length) {
    const { variations } = req.body;
    for (let i = 0; i < variations.length; i++) {
      for (let j = 0; j < variations.length; j++) {
        if (variations[i].subVariations[j]?.[key]) {
          res.status(403).json({
            error: {
              message: `when ${key} is given for whole product, each variation cannot have its own ${key}.`,
            },
          });
          return (check = true);
        }
      }
    }
  }
}
