const blogsModel=require('../Models/blogsModel')
const authormodel=require('../Models/author')
const {isValidObjectId}= require("mongoose")

const CreateBlogs=async function(req, res){
    try{
        let bodydata = req.body
        let {title,body,authorId,category,}=req.body
        if(!title||!body||!authorId||!category){
            return res.status(400).send('provide data')
        }
        if(!isValidObjectId(authorId)){
            return res.status(400).send('invalid authorId')
        }
        let author= await authormodel.findById(authorId)
        if(!author){
            return res.status(404).send('author dose not exist')
        }
        let authordata=await blogsModel.create(bodydata)
        res.status(201).send(authordata)
    }
    catch(error){
        console.log("This is the error :", error.message)
        res.status(500).send({ msg: "Error", error: error.message })
    }
}

const getBlogs=async function(req, res){
    try{
        let body=req.query
        let data=await blogsModel.find(body)
        if(!data){
            return res.status(404).send('documents are not found')
        }
        else{
            res.status(200).send({msg:data})
        }
    }catch(error){
        console.log("This is the error :", error.message)
        res.status(500).send({ msg: "Error", error: error.message })
    }
}
 module.exports.CreateBlogs=CreateBlogs
 module.exports.getBlogs=getBlogs