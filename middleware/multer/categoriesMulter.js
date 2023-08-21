import { MulterMiddleware } from "./multerFunction.js";
function dynamicRegexPattern(value) {
    let regexPattern

    if (value.includes("update"))
        regexPattern = `^${value}-[0-9a-fA-F]{24}$`;

    else
        regexPattern = `^${value}-[a-zA-Z0-9_-]{21}$`;

    return new RegExp(regexPattern);
}
export const categoryAddMulter = (req, res, next) => {

    const multerVals = {
        filepath: './public/categories',
        uploadFields: [{ name: dynamicRegexPattern("categoryImage") }],
        filetypes: ["image/png", "image/jpg", "image/jpeg", "image/svg+xml", "image/webp", "image/jp2"]
    };

    MulterMiddleware(req, res, next, multerVals)
}
export const categoryUpdateMulter = (req, res, next) => {

    const multerVals = {
        filepath: './public/categories',
        uploadFields: [{ name: dynamicRegexPattern("categoryImage") }, { name: dynamicRegexPattern("updateCategoryImage") }],
        filetypes: ["image/png", "image/jpg", "image/jpeg", "image/svg+xml", "image/webp", "image/jp2"]
    };

    MulterMiddleware(req, res, next, multerVals)
}
export const subCategoriesMulter = (req, res, next) => {

    const multerVals = {
        filepath: './public/subCategories',
        uploadFields: [{ name: dynamicRegexPattern("subCategoryImage") }],
        filetypes: ["image/png", "image/jpg", "image/jpeg", "image/svg+xml", "image/webp", "image/jp2"]
    };

    MulterMiddleware(req, res, next, multerVals)
}