from django.db import models

class Player(models.Model):

    class PlayerType(models.TextChoices):
        PATIENT = "Patient"
        VOLUNTEER = "Volunteer"

    playerID = models.CharField(max_length=8, primary_key=True)
    patientType = models.CharField(max_length=9, choices=PlayerType.choices, default=PlayerType.PATIENT)
    name = models.CharField(max_length=30)
    inSession = models.BooleanField(default=False)
    sessionID = models.CharField(max_length=8)
    alwaysOnline = models.BooleanField(default=False)

    def __str__(self):
        return self.playerID
    
class Game(models.Model):

    gameID = models.CharField(max_length=8, primary_key=True)
    title = models.CharField(max_length=30)
    playerID = models.CharField(max_length=8)

    def __str__(self):
        return self.gameID
    
class Freetime(models.Model):
    freetimeID = models.CharField(max_length=8, primary_key=True)
    start = models.DateTimeField()
    end = models.DateTimeField()
    playerID = models.CharField(max_length=8)

    def __str__(self):
        return self.freetimeID

class Session(models.Model):
    sessionID = models.CharField(max_length=8, primary_key=True)
    online = models.BooleanField()
    gameID = models.CharField(max_length=8)

    def __str__(self):
        return self.sessionID
