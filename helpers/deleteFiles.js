import fs from 'fs';
import path from 'path';
import { __rootFolder } from '../index.js';
import { images } from '../models/Images.js';
import mongoose from 'mongoose';

export function deleteOneFile(filePath) {
    let getpath = filePath
    if (typeof filePath === "string")
        getpath = path.join(__rootFolder, filePath)



    if (fs.existsSync(getpath))
        fs.unlink(getpath, (err) => {
            if (err) {
                console.error('Error occur while deleting file:', err);
                return;
            }
            console.log('File deleted:', filePath);
        });

}

export async function deleteById(_id) {
    const getOnlyId = mongoose.Types.ObjectId.isValid(_id) ? _id.toString() : _id

    const getImage = await images.findById(getOnlyId)

    let getpath = path.join(__rootFolder, getImage?.url ? getImage?.url : "")

    if (fs.existsSync(getpath))
        fs.unlink(getpath, (err) => {
            if (err) {
                console.error('Error occur while deleting file:', err);
                return;
            }
            console.log('File deleted:', getpath);
        });

}
export function deleteAllFilesInThisReq(req) {

    for (let i = 0; i < req.files.length; i++) {

        const { path: pathOfFile } = req.files[i]

        const updatedPathOfFile = path.join(__rootFolder, pathOfFile)


        if (fs.existsSync(updatedPathOfFile))
            fs.unlink(updatedPathOfFile, (err) => {
                if (err) {
                    console.error('Error occur while deleting file:', err);
                    return;
                }
                console.log('File deleted:', updatedPathOfFile);
            });


    }
}

