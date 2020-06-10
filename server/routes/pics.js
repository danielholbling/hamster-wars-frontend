// IMPORTS
const { Router } = require('express');
const { storage } = require('./../firebase');
const fileUpload = require('express-fileupload');
const fs = require('fs');



// Init new router
const router = new Router();



// MIDDLEWARE

// Use express-fileupload
router.use(fileUpload({
    createParentPath: true
}));



// GET

// Get file from cloud storage
router.get('/:filename', async (req,res) => {
    // Get buffer from storage bucket on firebase
    let pic = await storage.bucket().file(`hamster-pics/${req.params.filename}`).download();

    // Convert into sendable binary data
    pic = Buffer.concat(pic);

    // Send ok together with requested file
    res.status(200).contentType('jpeg').send(pic);
});




// POST

// Upload picture to hamster-pics on cloud storage
router.post('/', async (req,res) => {
    // set incoming file to pic
    let pic = req.files.pic;

    // Move the file to 
    pic.mv('./uploads/' + pic.name);

    console.log(`File upload: \nFilename: ${pic.name}\nMimetype: ${pic.mimetype}\nSize: ${pic.size}`);

    // Upload file to cloud storage
    await storage.bucket().upload(`./uploads/${pic.name}`, {destination: `hamster-pics/${pic.name}`});

    // Delete temp file
    fs.unlink(`./uploads/${pic.name}`, (err) => {
        if (err) throw err;
        console.log(`${pic.name} deleted from ./uploads`);
    });

    // Tell client that all is good
    res.status(200).send({msg: `File ${pic.name} uploaded.`});
})




// EXPORTS
module.exports = router;