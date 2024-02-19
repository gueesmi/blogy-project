const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
    if (req.cookies.authToken) {
        const { authToken } = req.cookies
        try {
            const decoded = jwt.verify(authToken, process.env.SECRET_KEY, { httpOnly: true })
            req.user = {
                id: decoded._id,
                name: decoded.name
            }
            next()
        } catch (error) {
            console.log(error.message)
            res.send("Not Authorized")

        }
    } else
        if (!req.cookies.authToken) {
            res.status(403).json("Not Authorized")
        }
}


module.exports = verifyToken