const authormodel=require('../Models/author')

/////////////////////~CreateAuthor ~/////////////////////////
const createAuthor = async function (req, res) {
    try {
        let data=req.body
        if(Object.keys(data).length!=0){
            let authordata=await authormodel.create(data)
            res.status(201).send({status:true,data:authordata})
        }
        else res.status(400).send({status:false,data:'Please insert data'})
    } catch (error) {
        console.log("This is the error :", error.message)
        res.status(500).send({ msg: "Error", error: error.message })
    }
}

//////////////////////~Exports Module~///////////////////////
module.exports.createAuthor=createAuthor