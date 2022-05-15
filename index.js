const fs = require('node:fs');

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const hbs = require('hbs');

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./dtc2-7d395-fbd0fb847adf.json');
initializeApp({
    credential: cert(serviceAccount)
});
const db = getFirestore();



app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.set('view engine', 'hbs');

// express stuff

hbs.registerPartials(__dirname + "/views/partials");

app.get('/', async (req, res) => {
	res.render("index");
    /*const snapshot = await db.collection('events').get();
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });*/
});

app.get('/admin', (req, res) => {
    res.render("admin");
});

app.get('/players', (req, res) => {
    players = [{
        name: "ashleyyyyyy",
        team_name: "The Spanish Inquisition",
        team_number: 1,
        personal_score: 1000,
        team_contribution: 600,
        num_games_played: 2,
        games_played: [
            {
                date: "monday",
                name: "6 nimmt!",
                position: 1,
                points: 50,
                game_type: "wgf"
            },
            {
                date: "tuesday",
                game: "Secret Hitler",
                position: 1,
                points: 100,
                game_type: "sdm"
            },
        ]
    }, {
        name: "MontyJava",
        team_name: "The Spanish Inquisition",
        team_number: 1,
        personal_score: 69,
        team_contribution: "420",
        num_games_played: 100,
        games_played: [
            {
                date: "wednesday",
                game: "super auto pets",
                outcome: 2,
                points: 50,
                game_type: "wgf"
            },
            {
                date: "tuesday",
                game: "Secret Hitler",
                outcome: 1,
                points: 120,
                game_type: "sdm"
            },
        ]
    }]
    // name = "?"
    let html = "<table class=\"table table-sm table-hover\">\n"
    html += "<thead class=\"thead-light\">\n"
    html += "<tr><th scope=\"col\">Player</th>"
    html += "<th scope=\"col\">Team</th>"
    html += "<th scope=\"col\">Personal Score</th></tr></thead>"
    html += "<tbody>"
    for (let i = 0; i < players.length; i++) {
        let p = players[i];
        html += "<tr><th scope=\"row\"><a class=\"player_link\" href=\"/player?name=" + p.name + "\">" + p.name + "</a></th>"
        html += "<td><a class=\"team-" + p.team_number + "-icon team-icon\" href=\"/team?id=" + p.team_number + "\">" + p.team_name + "</a></td>"
        html += "<td>" + p.personal_score + "</td>"
        html += "</tr>"
    }
    html += "</tbody></table>"

    data = {
        content: html
    }

    res.render("players", data);
})

app.get('/schedule', (req, res) => {
    res.render("schedule");
});

app.get('/player', (req, res) => {
    data = [{
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
    }, {
        name: "MontyJava",
        about: "smile",
        team: "The Spanish Inquisition",
        personal_score: "69",
        team_contribution: "420",
        num_games_played: 100,
        games_played: [
            {
                date: "wednesday",
                game: "super auto pets",
                outcome: "2nd",
                points: "50",
            },
            {
                date: "tuesday",
                game: "Secret Hitler",
                outcome: "Win",
                points: "120",
            },
        ]
    }]
    // name = "?"
    let html = "<table class=\"table table-sm table-dark\">\n"
    html += "<thead>\n"
    html += "<tr><th scope=\"col\">Player</th></tr>"
    html += "<tr><th scope=\"col\">Team</th></tr>"
    html += "<tr><th scope=\"col\">Personal Score</th></tr></thead>"
    html += "<tbody>"
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