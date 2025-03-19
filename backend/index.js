const express= require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cors=require('cors');
const {router}=require('./routes/Rindex');
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use('/uploads', express.static('uploads'));

async function connection(){
    try {

        await mongoose.connect(process.env.mongo_url)
        console.log("connection established");
        
    } catch (error) {
        console.log("error occured at connection",error);
        
    }
}
connection();

app.listen(3000,()=>{
    console.log("app running at port 3000");
    
})
