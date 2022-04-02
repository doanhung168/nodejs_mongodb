const jwt = require('jsonwebtoken')
const authenticate = (req, res, next) => {
    try {
        console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'secretValue')

        req.user = decode
        next()
    } catch (e) {
        if (e.name === 'TokenExpiredError') {
            res.status(401).json({message: 'Token Expired!'})
        } else {
            return res.json({ message: e.message })
        }
    }
}

module.exports = authenticate