import jwt from "jsonwebtoken"
import { users } from "../models/User.js";
import { setCookies } from "../helpers/cookieSetter.js";
import { Types } from "mongoose";
export const authenticateUser = async (req, res, next) => {
    try {

        const { token } = await req.cookies;

        if (!token)
            return res.status(401).json({ message: "Please Login Again." })


        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded)
            return res.status(401).json({ message: "Pleases login again" });
        

        const getUser = await users.findOne({
            _id: new Types.ObjectId(decoded)

        })
        if (!getUser)
            return res.status(401).json({ message: "Please login first" });

        req.user = { ...getUser._doc, _id: getUser._id.toString() }
        setCookies(getUser._doc, res)

        next()
    } catch (error) {
        res.status(500).json(error)
    }
}