var express = require("express");
var router = express.Router();

// Returns data of all players
router.get("/", function (req, res, next) {
    req.db
        .from("player")
        .select(
            "playerID",
            "playerType",
            "name",
            "inSession",
            "onlyOnline",
            "sessionID"
        )
        .then((rows) => {
            // Convert relevant strings to ints and floats
            rows = rows.map((item) => {
                return {
                    playerID: item.playerID,
                    playerType: item.playerType,
                    name: item.name,
                    inSession: item.inSession,
                    onlyOnline: item.onlyOnline,
                    sessionID: item.sessionID,
                };
            });
            res.status(200).json(rows);
        })
        .catch((err) => {
            console.log(err);
            res.json({ Error: true, Message: "Error executing MySQL query" });
        });
});

// Return specific player by ID
router.get("/:playerID", function (req, res, next) {
    const playerID = req.params.playerID;
    console.log(playerID)
    req.db
        .from("player")
        .select(
            "playerID",
            "playerType",
            "name",
            "inSession",
            "onlyOnline",
            "sessionID"
        )
        .where("playerID", '=', playerID)
        .first()
        .then((player) => {
            if (!player) {
                res
                    .status(404)
                    .json({
                        error: true,
                        message: "No record exists of a player with this ID",
                    });
                console.log(
                    "Error on request body: No record exists of a player with this ID"
                );
            } else {
                res.status(200).json({
                    playerID: player.playerID,
                    playerType: player.playerType,
                    name: player.name,
                    inSession: player.inSession,
                    onlyOnline: player.onlyOnline,
                    sessionID: player.sessionID,
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({ Error: true, Message: "Error executing MySQL query" });
        });
});
module.exports = router;
