export const authorizeUser = (req, res, next, role) => {
    try {
        if (req.user.role === role)
            return next();
        return res.status(401).json({ message: "Invalid access" })
    } catch (error) {
        res.status(500).json(error)
    }
}