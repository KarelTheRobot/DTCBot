const fs = require('node:fs');

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const hbs = require('hbs');

app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.set('view engine', 'hbs');

// express stuff

hbs.registerPartials(__dirname + "/views/partials");

app.get('/', (req, res) => {
	res.render("index");
});

app.get('/schedule', (req, res) => {
    res.render("schedule");
});

app.get('/player', (req, res) => {
    // name = "?"

    data = {
        name: "ashleyyyyyy",
        about: "goat drip",
        team: "The Spanish Inquisition",
        personal_score: "1000",
        team_contribution: "600",
        num_games_played: 2,
        games_played: [
            {
                date: "monday",
                game: "6 nimmt!",
                outcome: "1st",
                points: "50",
            },
            {
                date: "tuesday",
                game: "Secret Hitler",
                outcome: "Win",
                points: "100",
            },
        ]
    }

    res.render("player", data);
    // TODO get player name

    // TODO retrieve from db statistics about player
    
    // TODO render player hbs with their statistics
});

app.get('event', (req, res) => {
    // TODO get event id

    // TODO retrive from db stats about event

    // TODO render event hbs with these statistics
});

app.listen(port, () => {
	console.log(`Server running at ${port}`);
});