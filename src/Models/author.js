const mongoose=require('mongoose')

/////////////////////////~Author Module Schema~/////////////////////////
const author = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    title: {
        type:String, 
        enum:['Mr', 'Mrs', 'Miss'],
        required:true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

//////////////////////////~Exports Module~////////////////////////
module.exports=mongoose.model('Author',author)