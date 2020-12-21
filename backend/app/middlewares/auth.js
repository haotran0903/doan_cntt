const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwtToken || ''
    try {
        if (!token) {
            return res.status(401).send("Vui long dang nhap!")
        }
        const decode = jwt.verify(token, "SPKT")
        req.user = {
            username: decode.username,
            role: decode.role
        }
        next()
    }
    catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = verifyToken