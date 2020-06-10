// IMPORTS
const { Router } = require('express');
const { db } = require('./../firebase');




// Init new router
const router = new Router();




// GET

// Random hamster
router.get('/random', async (req,res) => {
        // Array to perform random on
        let hamsterArr = [];
    
        // Get all hamsters from firebase
        let hamsters = await db
        .collection('hamsters')
        .get();
    
        // Push each hamster into array
        hamsters.forEach(hamster => hamsterArr.push(hamster.data()));
    
        // Return a random hamster
        res.status(200).send(hamsterArr[Math.floor(Math.random()*hamsterArr.length)]);
    
});

// Array of all hamsters
router.get('/', async (req,res) => {
    // Empty array for response
    let hamsterArr = [];

    // Get all hamsters from firebase
    let hamsters = await db
    .collection('hamsters')
    .get();

    // Push each hamster into array
    hamsters.forEach(hamster => hamsterArr.push(hamster.data()));

    // Respond with array of all hamsters
    res.status(200).send(hamsterArr);
});

// Specific hamster
router.get('/:id', async (req,res) => {
    // Get hamster from firebase
    let hamsters = await db
    .collection('hamsters')
    .where("id","==",req.params.id*1)
    .get()
    .catch(err => console.error(err));

    // Loop over the array, since it's only one index we can respond right away
    hamsters.forEach(hamster => {
        // Respond with chosen hamster
        res.status(200).send(hamster.data());
    })
});




// POST

// New hamster
router.post('/', async (req,res) => {
    if(!!req.headers['multiple']){
        // Array of hamster objects, set request header {"Multiple":true}
        req.body.forEach(async (hamster) => {
            console.log(`New hamster "${hamster.name}" created.`)
            await db
            .collection('hamsters')
            .doc()
            .set(hamster)
            .catch(err => console.error(err));
        });

        res.status(201).send({
            msg: "New hamsters created."
        })

    }else{
        // Single hamster
        console.log(`New hamster ${req.body.name} created.`)
        await db
        .collection('hamsters')
        .doc()
        .set(req.body)
        .catch(err => console.error(err));
    
        // Respond with OK and msg
        res.status(201).send({
            msg: "New hamster created."
        });
    }
});




// PUT

// Update a hamsters wins, defeats and number of games
router.put('/:id/result', async (req,res) => {
    try {
        // Declare hamster variable that will be filled with obj from firestore
        let hamster;

        // Gief hamster with :id
        let hamsters = await db
        .collection('hamsters')
        .where("id","==",req.params.id*1)
        .get();

        // Loop over the array returned from firestore
        hamsters.forEach(doc => {
            // Fill the hamster variable with the retrieved object
            hamster = doc.data();
            // Add firebase document id to the hamster-obj
            hamster.fbId = doc.id;
        });

        // Generate updateData
        let updateData = {
            "wins": (hamster.wins + req.body.wins*1),
            "defeats": (hamster.defeats + req.body.defeats*1),
            "games": (hamster.games + 1)
        }

        // PUT the data
        await db
        .collection('hamsters')
        .doc(hamster.fbId)
        .update(updateData);

        // Send "all is ok" to client
        res.status(200).send({msg:"Hamster updated."});

    }
    catch(err){
        console.error(err);
    }
})



// EXPORTS
module.exports = router;