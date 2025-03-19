const express=require('express');
const { getobject, uploaddata } = require('../controller/objectcontoller');
const uploads = require('../controller/multer');

const router=express.Router();

router.get('/',getobject)

router.post('/uploads',(req,res,next)=>{
    uploads.single('file')(req,res,function(err){
        if(err){
            res.json({message:err.message,uploads:false})
            return                                                                           
        }
        else{
            if(!req.file){
                res.json({message:'file not uploaded',uploads:false})
                return;
            }
            next();
        }
    })
},uploaddata)

module.exports={router}