const jwt = require('jsonwebtoken')
const {uriDecodeFileName} = require("express-fileupload/lib/utilities");

module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
                return res.status(401).json({message: 'not authorized'})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                return res.status(403).json({message: 'no permissions'})
            }
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json({message: 'not authorized'})
        }
    }
}




