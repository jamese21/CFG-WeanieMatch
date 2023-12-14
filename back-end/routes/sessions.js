var express = require("express");
var router = express.Router();
var {_, findMatches} = require('./scheduling.js');

router.use(express.json());

router.get("/", (req, res) => {
    req.db.from('session')
    .select('sessionID', 'isOnline', 'gameID')
    .then((rows) => {
        // Convert relevant strings to ints and floats
        rows = rows.map((item) => {
            return {
            sessionID: item.sessionID,
            isOnline: item.isOnline,
            gameID: item.gameID
            }
        })
        res.header()
        res.status(200).json(rows)
    })
    .catch((err) => {
        console.log(err);
        res.json({ "Error": true, "Message": "Error executing MySQL query" })
    })
});

router.post("/", (req, res) => {
    // Update player entities
    min = Math.ceil(10);
    max = Math.floor(1000000);
    const sessionID = `S${Math.floor(Math.random() * (max - min + 1) + min)}`;
    const player1 = req.body.player1ID
    const player2 = req.body.player2ID
    const gameID = req.body.gameID
    const isOnline = req.body.isOnline
    req.db.from('player').where('playerID', '=', player1).update({sessionID: sessionID})
    req.db.from('player').where('playerID', '=', player2).update({sessionID: sessionID})
    return req.db.from("session").insert({sessionID, isOnline, gameID})
    .then(() => {
      // Convert relevant strings to ints and floats
        req.db.from('player').where('playerID', '=', player1).update({sessionID: sessionID})
        .then(() => {
            req.db.from('player').where('playerID', '=', player2).update({sessionID: sessionID})
            .then(() => {
                res.status(201).json({message: "Session created"});
            })
        })
    })
    .catch((err) => {
        console.log(err);
        res.json({ Error: true, Message: "Error executing MySQL query" });
    });
});

router.post("/matches", (req, res)=> {
    playerID = req.body.playerID;
    console.log(playerID);
    return res.send(findMatches(playerID));
})


module.exports = router;
