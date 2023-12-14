var express = require('express');
var router = express.Router();

// Returns all data from games
router.get('/', function (req, res, next) {
  req.db.from('game')
    .select('title', 'gameID', 'playerID')
    .then((rows) => {
      // Convert relevant strings to ints and floats
      rows = rows.map((item) => {
        return {
          title: item.title,
          gameID: item.gameID,
          playerID: item.playerID
        }
      })
      res.status(200).json(rows)
    })
    .catch((err) => {
      console.log(err);
      res.json({ "Error": true, "Message": "Error executing MySQL query" })
    })
});

// Return specific player by ID
router.get("/:gameID", function (req, res, next) {
  const gameID = req.params.gameID;
  console.log(gameID)
  req.db
      .from("game")
      .select(
          "gameID",
          "title",
          "playerID",
      )
      .where("gameID", '=', gameID)
      .first()
      .then((game) => {
          if (!game) {
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
                title: game.title,
                gameID: game.gameID,
                playerID: game.playerID
              })
          }
      })
      .catch((err) => {
          console.log(err);
          res.json({ Error: true, Message: "Error executing MySQL query" });
      });
});


// Return specific player by ID
router.get("/:gameID", function (req, res, next) {
  const gameID = req.params.gameID;
  console.log(gameID)
  req.db
    .from("game")
    .select(
      "gameID",
      "title",
      "playerID",
    )
    .where("gameID", '=', gameID)
    .first()
    .then((game) => {
      if (!game) {
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
          title: game.title,
          gameID: game.gameID,
          playerID: game.playerID
        })
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ Error: true, Message: "Error executing MySQL query" });
    });
});

router.get("/sessions/:sessionID", function (req, res, next) {
  const sessionID = req.params.sessionID;
  console.log(sessionID)
  req.db
    .select(
      "gameID"
    )
    .from("game")

    .where("session.gameID", "game.gameID")
    .then((game) => {
      if (!game) {
        res
          .status(404)
          .json({
            error: true,
            message: "No game is linked to this session.",
          });
        console.log(
          "Error on request body: No game is linked to this session."
        );
      } else {
        res.status(200).json({
          gameID: game.gameID,
        })
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ Error: true, Message: "Error executing MySQL query" });
    });
});

module.exports = router;