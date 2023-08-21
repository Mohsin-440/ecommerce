import multer from 'multer'
import { nanoid } from 'nanoid'
import { deleteOneFile } from '../../helpers/deleteFiles.js'
import { renameFile } from '../../helpers/renameFile.js'

export const MulterMiddleware = async (req, res, next, multerVals) => {
    try {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, multerVals.filepath)
            },
            filename: function (req, file, cb) {

                cb(null, file.fieldname.split("-")[0] + '-' + Date.now() + file.originalname)
            }
        })



        const fileFilter = (req, file, cb) => {
            let checkFileType = false;

            multerVals.filetypes.forEach(fileType => {
                if (file.mimetype == fileType) {
                    checkFileType = true;
                    cb(null, true);
                }
            })

            if (!checkFileType)
                return cb(null, false)

        }

        const upload = multer({ fileFilter, storage, limits: { fieldSize: 1 * 1024 * 1024, } })

        const cpUpload = upload.any();
        cpUpload(req, res, (err) => {
            if (err) {
                console.log(`Error occurred while saving files via multer: ${err}`);
            }
            else {
                req.imageSchemae = []
                for (let i = 0; i < req.files.length; i++) {
                    const { fieldname, path: filePath, destination, filename, originalname } = req.files[i];
                    let check = false;


                    for (let j = 0; j < multerVals.uploadFields.length; j++) {
                        const { name } = multerVals.uploadFields[j];

                        if (name && name?.test(fieldname)) {
                            const schemaeName = fieldname.split("-")[0]
                            if (!req.imageSchemae.includes(schemaeName)) {
                                req.imageSchemae.push(schemaeName)
                            }

                            check = true;
                            break;

                        }
                    }

                    if (!check) {
                        deleteOneFile(filePath)
                        return res.status(403).json({ error: { image: `file rejected by server '${originalname}'` } })
                    }
                }

                next()
            }
        })


    } catch (error) {
        console.log(`Error occurred while uploading files via multer: ${error.message}`);
        res.status(500).json(error)
    }
}
