import fs from "fs";
import { __rootFolder } from "../index.js";
import path from "path";
export function renameFile(oldPath, newPath) {
    try {
        let updatedOldPath = oldPath
        if (typeof oldPath === "string")
            updatedOldPath = path.join(__rootFolder, oldPath)


        let updatedNewPath = path.join(__rootFolder, newPath)
        if (typeof oldPath === "string")
            updatedNewPath = path.join(__rootFolder, newPath)


        const permissions = 0o644;
        if (fs.existsSync(updatedOldPath))
            fs.chmod(updatedOldPath, permissions, (err) => {
                if (err) {
                    console.error('Error setting permissions:', err);
                    return;
                }
                fs.rename(updatedOldPath, updatedNewPath, (err) => {
                    if (err) {
                        console.error('Error occurred while renaming file inside function:',);
                        console.log(err)
                        return;
                    }

                })
            });



    } catch (err) {
        console.error('Error renaming file:', err);
    }
}