const blogsModel = require('../Models/blogsModel')
const authormodel = require('../Models/author')
const { isValidObjectId } = require("mongoose")

///////////////////////////////////////~CreateBlogs~////////////////////////////
const CreateBlogs = async function (req, res) {
    try {
        let bodydata = req.body
        let { title, body, authorId, category, } = req.body
        if (!title) return res.status(400).send('title is mandatory');
        if (!body) return res.status(400).send('body is mandatory');
        if (!authorId) return res.status(400).send('authorId is mandatory');
        if (!category) return res.status(400).send('category is mandatory');
        if (!isValidObjectId(authorId)) {
            return res.status(400).send('invalid authorId')
        }
        let author = await authormodel.findById(authorId)
        if (!author) {
            return res.status(404).send({status: false, msg:'author dose not exist'})
        }else{
        let authordata = await blogsModel.create(bodydata)
        res.status(201).send({ status: true, data: authordata })
        }
    }
    catch (error) {
        console.log("This is the error :", error.message)
        res.status(500).send({ status: false, data: error.message })
    }
}

////////////////////////////////////////////~GetBlogs~/////////////////////////
const getBlogs = async function (req, res) {
    try {
        let body = req.query
        body.isDeleted=true
        body.isPublished=true
        let data = await blogsModel.find(body)
        if (data.length<=0) {
            return res.status(404).send({ status: false, msg:'documents are not found'})
        }
        else {
            res.status(200).send({ status: true, data: data })
        }
    } catch (error) {
        console.log("This is the error :", error.message)
        res.status(500).send({ status: false, data: error.message })
    }
}

//////////////////////////////////~UpdateBlogs~/////////////////////////////////
const updateBlogs = async function (req, res) {
    try {
        let blogId = req.params.blogId
        let { title, body, tags, subcategory } = req.body
        if (!isValidObjectId(blogId)) { return res.status(400).send({ status: false, msg: "pls provide a valid BlogId" }) }
        let blogdata = await blogsModel.findById(blogId)
        if (blogdata.isDeleted == true) { return res.status(404).send({ status: false, msg: "Page not found , already deleted" }) }
        if (!blogdata) { return res.status(404).send({ status: false, msg: "Blog does not exists" }) }
        else{
        let updatedata = await blogsModel.findByIdAndUpdate(
            blogId, { $set: { title, body, isPublished: true, publishedAt: moment().format() }, $push: { tags, subcategory } }
            ,{ new: true }
        )
        return res.status(200).send({ status: true, data: updatedata })
        }
    } catch (error) {
        return res.status(500).send({ status: false, data: error.message })
    }
}

////////////////////////////////////~DeleteBlogs~////////////////////////////////////
const deleteBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId
        if (!isValidObjectId(blogId)) { return res.status(400).send({ status: false, msg: "Pls provide a valid blogId" }) }
        let blogdata = await blogsModel.findById(blogId)
        if (!blogdata) { return res.status(404).send({ status: false, msg: "No blog exists with this Id" }) }
        if (blogdata.isDeleted == true) { return res.status(400).send({ status: false, msg: "blog not found , already deleted" }) }
        else{
        let deletedblog = await blogsModel.findByIdAndUpdate(
            blogId, { $set: { isDeleted: true }, deletedAt: moment().format() }
        )
        return res.status(200).send({ status: true })
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
///////////////////////////////////~DeleteBlogs~//////////////////////////////
const deleteBlogs = async function (req, res) {
    try {
        let data = req.query
        let authorId = data.authorId
        if(!isValidObjectId(authorId)){return res.status(400).send({status:false,msg:"Pls provide a valid autorId"})}
        let check = await blogsModel.find(data)
        if(check.length<=0){return res.status(404).send({status:false,msg:"Blog not found"})}
        let deleteblogs = await blogsModel.updateMany(
            data, { $set: { isDeleted: true }, deletedAt: moment().format() }
        )
        return res.status(200).send({ status: true })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
//////////////////////////////////~Modules~///////////////////////////////
module.exports.CreateBlogs = CreateBlogs
module.exports.getBlogs = getBlogs
module.exports.updateBlogs = updateBlogs
module.exports.deleteBlog=deleteBlog
module.exports.deleteBlogs=deleteBlogs
