const object = require('../models/objectmodel')


// to get object
async function getobject(req, res) {

    const data = await object.find({})

    if (data.length == 0) {
        res.json({ message: 'no product found' })
        return;
    }

    res.json(data);

}

// to uploads data
 
async function uploaddata(req, res) {
    const data = req.body;
    const imagUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    if (!data.name || !data.description || !data.location) {
        res.json({ message: 'ALL FEILDS ARE REUIRED' })
        return;
    }
    const uploaded=  await object.create({
        name:data.name,
        description:data.description,
        location:data.location,
        imageUrl:imagUrl
    })
    if(!uploaded){
        res.json({message:'some error occured ',uploads:false})
        return;
    }
   
   
    res.json({ message: 'data uploaded sucessfually..',uploads:true })


}

module.exports = { getobject, uploaddata };