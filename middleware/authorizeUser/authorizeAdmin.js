import { authorizeUser } from "../../helpers/authorizeUser.js"

export const authorizeAdmin = (req, res, next) => {
    authorizeUser(req, res, next, "admin")
}