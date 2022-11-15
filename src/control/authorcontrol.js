const authormodel = require('../Models/author')

/////////////////////~CreateAuthor ~/////////////////////////
const createAuthor = async function (req, res) {
    try {
        let data = req.body
        let { fname, lname, title, email, password } = data
        if (!fname) { return res.status(400).send({ status: false, msg: "fname is mandatory" }) }
        if (!lname) { return res.status(400).send({ status: false, msg: "lname is mandatory" }) }
        if (!title) { return res.status(400).send({ status: false, msg: "title is mandatory" }) }
        if (!email) { return res.status(400).send({ status: false, msg: "email is mandatory" }) }
        if (!password) { return res.status(400).send({ status: false, msg: "password is mandatory" }) }
        let emailcheck = await authormodel.findOne({email})
        if (emailcheck) return res.status(400).send({ status: false, msg: "pls provide a unique email" })
        else {
            let authordata = await authormodel.create(data)
            res.status(201).send({ status: true, data: authordata })
        }
    } catch (error) {
        console.log("This is the error :", error.message)
        res.status(500).send({ msg: "Error", error: error.message })
    }
}

//////////////////////~Exports Module~///////////////////////
module.exports.createAuthor = createAuthor