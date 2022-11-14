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
        ref : ""
    },
    tags : {
        type : Array,
        default : []
    },
    category : {
        type : String,
        required : true
    },
    subcategory : {
        type : Array,
        default : []
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
    isPublished : {
        type : Boolean,
        default : false
    }
},{timettamps : true})

module.exports = mongoose.model("BlogsModel",blogsSchema)
