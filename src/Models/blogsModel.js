const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const blogsSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    authorId : {
        type : ObjectId,
        required : true,
        ref : "Author"
    },
    tags : {
        type : [{type:String}]
    },
    category : {
        type : String,
        required : true
    },
    subcategory : {
        type : [{type:String}]
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
    deleteAt:String,

    isPublished : {
        type : Boolean,
        default : false
    },
    publishedAt:String,
    
},{timestamps : true})

module.exports = mongoose.model("BlogsModel",blogsSchema)
