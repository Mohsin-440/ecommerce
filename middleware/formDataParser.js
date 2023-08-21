import mongoose from "mongoose";
import { Mongoose, Schema } from "mongoose";

export const FormDataParser = (req, res, next) => {

    try {

        req.images = {};

        if (req.files) {

            for (let i = 0; i < req.imageSchemae.length; i++) {


                const schemaName = req.imageSchemae[i];

                req.images[schemaName] = [];

                for (const [key, value] of Object.entries(req.files)) {

                    let checkUpdate = schemaName.indexOf("update") >= 0 && value.fieldname.indexOf("update") >= 0
                        ? "update"
                        : schemaName.indexOf("update") < 0 && value.fieldname.indexOf("update") < 0
                            ? "no-update"
                            : "null"
                    let bodykey = `priority-${value.fieldname.split("-")[1]}`;

                    const getFilePath = value.path.replaceAll(`\\`, '/');

                    const priority = Number(req.body[bodykey]) ? { priority: Number(req.body[bodykey]) } : {};

                    let pushObject = {}
          
                    if (checkUpdate === "update") {

                        pushObject = {
                            updateOne: {
                                filter: { _id: new mongoose.Types.ObjectId(value.fieldname.split("-")[1]) },
                                update: {
                                    $set: {
                                        url: getFilePath,
                                        ...priority,

                                    }
                                }
                            }
                        }
                        // console.log(pushObject, priority,"update....................")

                        req.images[schemaName].push(pushObject);

                        delete req.body[bodykey];
                    }
                    else if (checkUpdate === "no-update") {
                        pushObject = {
                            url: getFilePath,
                            ...priority,
                        }
      
                        req.images[schemaName].push(pushObject);

                        delete req.body[bodykey];
                    }
                }

            }


        }

        next()

    } catch (error) {
        console.log("Error Occurred while parsing data: " + error);
        res.status(200).json(error)
    }
}