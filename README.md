# LIRI-Bot
LIRI stands for Language Interpretation and Recognition Interface. This bot application is a command line app that returns concert information for a chosen music artist, Spotify information for a chosen song, or movie data for a chosen movie based on the user command. 

## Purpose
This is a project for UC Berkeley Extention bootcamp where we learn to implement node.js.

## How it works

### Bands in Town
Uses the command:
```bash
node liri.js concert-this <artist/band name here>
```
This command should return in the terminal the following information about an artist/band:
    * Artist(s)

    * The song's name

    * A preview link of the song from Spotify

    * The album that the song is from

    * If no song is provided then your program will default to "The Sign" by Ace of Base.

### Spotify
Uses the command: 
```bash
node liri.js spotify-this-song <song title>
```   