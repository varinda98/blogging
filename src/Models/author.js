const mongoose=require('mongoose')

//////////////////////////~Email Validation Function~//////////////////
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

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
        // required:true
    },
    email: {
        type: String,
        trim: true,
        // lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

//////////////////////////~Exports Module~////////////////////////
module.exports=mongoose.model('Author',author)