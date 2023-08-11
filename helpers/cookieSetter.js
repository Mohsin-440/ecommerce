import jwt from "jsonwebtoken"
export const setCookies = (res) => {
    const token = jwt.sign(
        {
            id: getUser._id,
            role: getUser.role,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "3d" }
    );

    const _1day = 1 * 24 * 60 * 60 * 1000;
    const options = {
        expires: new Date(Date.now() + 1 * _1day),
        httpOnly: true,
        sameSite: true,
        // secure: true
    }

    res.cookie("token", token, options)
}