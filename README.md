# LIRI-Bot
LIRI stands for Language Interpretation and Recognition Interface. This bot application is a command line app that returns concert information for a chosen music artist, Spotify information for a chosen song, or movie data for a chosen movie based on the user command. 

## Purpose
This is a project for UC Berkeley Extention bootcamp where we learn to implement node.js.

## How it works

### Bands in Town
Uses the command:
```bash
node liri.js concert-this <artist/band name>
```
This command should add to the log.txt file and return in the bash terminal the following concert information for an artist/band:
    
    * Name of the venue

    * Venue location

    * Date of the Event (use moment to format this as "MM/DD/YYYY")

![image](../images/concert-this.png)    

### Spotify
Uses the command: 
```bash
node liri.js spotify-this-song <song title>
```   
This command should add to the log.txt file and return in the bash terminal the following information about a song:

    * Artist(s)

    * The song's name

    * A preview link of the song from Spotify

    * The album that the song is from

    * If no song is provided then the program will default to "The Sign" by Ace of Base.

![image](../images/spotify-this-song.png)

### Movies
Uses the command: 
```bash
node liri.js movie-this <movie title>
``` 
This command should add to the log.txt file and return in the bash terminal the following information about a movie:

    * Title of the movie

    * Year the movie came out

    * IMDB Rating of the movie

    * Rotten Tomatoes Rating of the movie

    * Country where the movie was produced

    * Language of the movie

    * Plot of the movie

    * Actors in the movie

![image](../images/movie-this.png)

### Do what it says
Uses the command: 
```bash
node liri.js do-what-it-says
```
Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

## Authors
Lauren Bullen
