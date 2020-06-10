// IMPORTS
const { Router } = require('express');
const { db } = require('./../firebase');




// Init new router
const router = new Router();




// GET

// Get all games as array
router.get('/', async (req,res) => {
    // Empty array for response
    let gamesArr = [];

    // Get all games from firebase
    let games = await db
    .collection('games')
    .get();

    // Push each game into array
    games.forEach(game => gamesArr.push(game.data()));

    // Respond with array of all games
    res.status(200).send(gamesArr);
});



// POST

// Add new game to games collection
router.post('/', async (req,res) => {
    // Get new timestamp
    let today = new Date();

    // Add new game to firestore collection 'games' with timestamp and contestants
    await db
    .collection('games')
    .doc()
    .set({
        timeStamp: today,
        contestants: req.body.contestants,
        winner: req.body.winner
    })

    // Respond with "Game added." to client
    res.status(201).send({msg: "Game added."})
})




// EXPORTS
module.exports = router;