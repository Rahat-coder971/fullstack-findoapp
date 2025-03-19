const multer=require('multer');

const uploads=multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'./uploads');
        },
        filename:(req,file,cb)=>{
            cb(null,file.originalname);
        }
    }),
    fileFilter:(req,file,cb)=>{
        if(file.mimetype.startsWith('image/')){
            cb(null,true)
        }else{
            cb(new Error('file should be of type image only'))
            return
        }
    }
})

module.exports=uploads