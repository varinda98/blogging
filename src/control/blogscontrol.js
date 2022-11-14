const blogsModel=require('../Models/blogsModel')
const authormodel=require('../Models/author')

const CreateBlogs=async function(req, res){
    try{
        let {title,body,authorId,category,}=req.body
        if(!title||!body||!authorId||!category){
            return res.status().send('provide data')
        }
        let authordata= await authormodel.findById(authorId)
        if(!authorId){
            return res.status().send('author dose not exist')
        }
    }
    catch(error){

    }
}
