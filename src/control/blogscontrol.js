const blogsModel=require('../Models/blogsModel')
const authormodel=require('../Models/author')

const CreateBlogs=async function(req, res){
    try{
        let {title,body,authorId,category,}=req.body
        if(!title||!body||!authorId||!category){
            return res.status().send('provide data')
        }
        let author= await authormodel.findById(authorId)
        if(!author){
            return res.status().send('author dose not exist')
        }
        let authordata=await blogsModel.create(authordata)
        res.status().send(authordata)
    }
    catch(error){
        console.log("This is the error :", error.message)
        res.status(500).send({ msg: "Error", error: error.message })

    }
}
 module.exports.CreateBlogs=CreateBlogs