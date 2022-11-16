const jwt = require("jsonwebtoken")

////////////////////////~Authentication~/////////////////////////
const Authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) return res.status(400).send({ status: false, msg: "token must be present in the request header" })
        let decodedToken = jwt.verify(token, "project1")
        if (!decodedToken) return res.status(400).send({ status: false, msg: "token is not valid" })
        req.authorId = decodedToken.userId
        next()
    }
    catch (error) {
        res.status(500).send({ msg: error })
    }
}

////////////////////////////////////~Module~/////////////////////////////////////////
module.exports.Authentication = Authentication
