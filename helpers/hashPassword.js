import crypto from "crypto";
export const hashPassword = (userEnteredPassword) => {

    const saltData = process.env.SALT_DATA_KEY + userEnteredPassword;
    const password = crypto.createHmac("sha256", process.env.SECRET_KEY).update(saltData).digest('hex');
    return password
}