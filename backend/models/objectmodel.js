const mongoose=require('mongoose');

const objectSchema=mongoose.Schema({
    name:String,
    imageUrl:String,
    description:String,
    location:String
})

const object=mongoose.model("objects",objectSchema);

module.exports=object;