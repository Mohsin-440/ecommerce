import { deleteAllFilesInThisReq } from "./deleteFiles.js";

export const validatationTemplate = (req, res, next, schema, log) => {
  try {
    let { error } = schema.validate(req.body, { abortEarly: false });

    if (error?.details) {
      deleteAllFilesInThisReq(req)
      let Errs = {};

      error?.details.forEach((err) => {
        if (log) console.log(err);

        if (err?.context) Errs[err.context.key] = err.message;
      });
      console.log(error)
      return res.status(400).json({ error: Errs });
    }

    next();
  } catch (error) {
    res.status(500).json(error);
    console.log(`error occurred while validating schema: ${error}`);
  }
};
