var express = require("express");
var router = express.Router();
const options = require('../knexfile.js');
var knex = require("knex")(options);

/* # Retrieve Requesting Player Details:
# A SQL SELECT statement is executed to retrieve details of the player with the provided player ID.
# If the player details are not found in the database, the function returns the string "Player not found".

# Check Player's Session Preference:
# A modified SQL SELECT statement is executed to fetch the isOnline status of the session associated with the provided player ID.
# If the session details are not found, the function returns "Player session preferences not found".

# Find Local Players:
# If the player's session isOnline status is 0 (meaning they prefer a local session):
# Another SQL SELECT statement is executed to fetch all local players who are not in a session and exclude the requesting player.
# If local players are found, continue.

# Find Online Players:
# If no local players are found, or if the player's session isOnline status is not 0, the search switches to find online players.
# A SQL query is executed to fetch players who have free time that overlaps with the current time (CURTIME()), are not in a session, and excluding the requesting player.
# The results are ordered such that 'patient' type players are prioritized over 'volunteer' type players.

# Match Game Interests:
# For each potential online player match:
# If the matched player is of type 'volunteer' and there are no 'patient' players in the potential matches list:
# The games that the requesting player and the matched player have in common are identified.
# Only if they have common games, the match is appended to the final_matches list.
# Otherwise, the matched player is directly appended to the final_matches list.

# Return Results:
# If there are any final matches, they are returned.
# If there are no matches, the string "NO MATCHES" is returned. */
router.post("/", function (req, res, next) {
    const playerID = req.body.playerID;
    req.db.from('player').where('playerID', '=', playerID)
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
            res.json({ Error: true, Message: "Player not found." });

        }).then(() => {
            req.db.from('player').where()
        });
});



function findMatches (myPlayerId) {
    knex
        .select("*")
        .from('player')
        .where(`playerID" = ${myPlayerId}`).then(() => {
            knex
                .select("isOnline")
                .from("session")
                .join("player", "session.sessionID", "==", "player.sessionID")
                .where(`playerID" = ${myPlayerId}`)
                .then((sessionID) => {
                    knex
                        .select("gameID")
                        .from("game")
                        .where(`playerID" = ${myPlayerId}`)
                        .then(() => {
                            knex.select("*")
                                .from("player")
                                .where("inSession = 0")
                                .and(`playerID = ${myPlayerId}`).then(() => {
                                    knex
                                        .select("gameID")
                                        .from("game")
                                        .where(`playerID != ${myPlayerId}`).then((data) => {
                                            return data;
                                        })
                                })
                        })
                })

        })

}

module.exports = {router, findMatches}
/* let myPlayerId = 12345678;
findMatches(myPlayerId); */