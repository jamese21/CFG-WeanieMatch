# Retrieve Requesting Player Details:
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
# If there are no matches, the string "NO MATCHES" is returned.


import mysql.connector

def find_matches(my_player_id):
    with mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="test"
    ) as conn:
        cursor = conn.cursor(dictionary=True)
    
        cursor.execute("SELECT * FROM Player WHERE playerID = %s", (my_player_id,))
        player = cursor.fetchone()
        if not player:
            return "Player not found"
    
        cursor.execute("SELECT isOnline FROM (Session, Player) WHERE session.sessionID = player.sessionID && player.sessionid = %s", (my_player_id,))
        session = cursor.fetchone()
        if not session:
            return "Player session preferences not found"

        cursor.execute("SELECT GameID FROM game WHERE PlayerID = %s", (my_player_id,))
        my_games = {row['GameID'] for row in cursor.fetchall()}

        final_matches = []

        if session['isOnline'] == 0:
            cursor.execute("SELECT * FROM Player WHERE insession = 0 AND playerID != %s", (my_player_id,))
            local_players = cursor.fetchall()
            
            for local_player in local_players:
                cursor.execute("SELECT GameID FROM game WHERE PlayerID = %s", (local_player['playerID'],))
                their_games = {row['GameID'] for row in cursor.fetchall()}

                if my_games & their_games:  # Check for game overlap
                    final_matches.append(local_player)

            if final_matches:
                return final_matches

        # For online players
        query = """
            SELECT p.* 
            FROM Player p
            JOIN Freetime ft ON p.playerID = ft.PlayerID
            WHERE ft.start <= CURTIME() AND ft.end >= CURTIME() 
            AND p.playerID != %s AND p.insession = 0
            ORDER BY CASE 
                WHEN p.type = 'patient' THEN 1
                ELSE 2 
            END
        """
        cursor.execute(query, (my_player_id,))
        potential_matches = cursor.fetchall()

        for match in potential_matches:
            if match['type'] == 'volunteer' and not any(p['type'] == 'patient' for p in potential_matches):
                cursor.execute("SELECT GameID FROM game WHERE PlayerID = %s", (match['playerID'],))
                their_games = {row['GameID'] for row in cursor.fetchall()}

                if my_games & their_games:
                    final_matches.append(match)
            else:
                final_matches.append(match)

        return final_matches if final_matches else "NO MATCHES"

my_player_id = 12345678
print(find_matches(my_player_id))



# we have some parameters: name, local, online, games, starttime, endtime, insession. write code so that it first checks whether the player selects local or online (where local means isOnline = 0 and online means isOnline = 1). If online, check 
# if the time overlaps between name and any other player at the current time, then check if the type of Player is patient or volunteer. If it is patient then continue. If its volunteer and there arent
# any other patients then check if the games between the name and the other player both appear in the same list of games, move onto the next 
# player in the list, if there arent any more valid players check if either player is insession. If either player is insession, move onto the next player in the list until both players arent in session, or there are no more players. If local, 
# then check if there are others who want local. If not, then change to online and go through the algorithm. If there are no matches return "NO MATCHES", otherwise return all the available matches.

# here are the SQL tables we are using (we are using mySQL):
# Player(playerID, type, name, insession)
# game(GameID, title, PlayerID)
# Freetime(start, end, PlayerID, FreetimeID)
# Session(sessionID, isOnline, GameID,) 
# Say I want to create a session with another player. I need to know who is available and I would prefer if the had the same games as me in their preferences. the players I am matched with should also not currently be in session.
