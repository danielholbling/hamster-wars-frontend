// IMPORTS
const { Router } = require('express');
const { db } = require('./../firebase');




// Init new router
const router = new Router();




// GET

// Top 5 winning hamsters
router.get('/top', async (req, res) => {
    // Hamster array to fill with the winners
    let hamsterArr = [];
    
    // Get top 5 winning hamsters in descending order from firestore
    let hamsters = await db
    .collection('hamsters')
    .orderBy('wins', 'desc')
    .limit(5)
    .get()

    // Push the FB-obj for each hamster as a JS-obj to hamsterArr
    hamsters.forEach(hamster => hamsterArr.push(hamster.data()));

    // Respond with hamsterArr
    res.send(hamsterArr);
})

// Top 5 losing hamsters
router.get('/bottom', async (req,res) => {
    // Hamster array to fill with the losers
    let hamsterArr = [];
    
    // Get top 5 losing hamsters in descending order from firestore
    let hamsters = await db
    .collection('hamsters')
    .orderBy('defeats', 'desc')
    .limit(5)
    .get()

    // Push the FB-obj for each hamster as a JS-obj to hamsterArr
    hamsters.forEach(hamster => hamsterArr.push(hamster.data()));

    // Respond with hamsterArr
    res.send(hamsterArr);
})




// EXPORTS
module.exports = router;