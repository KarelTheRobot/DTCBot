const { Client, Collection, Intents, Message, MessageEmbed } = require('discord.js');
const { token } = require('../config.json');

const { MessageMentions: { USERS_PATTERN } } = require('discord.js');

// Create a new client instance
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

const all_roles = [
    "The Pesky Parrots",
    "The Crazy Camels",
    "The Tardy Turtles",
    "The Rompin' 'Roos",
    "The Slithery Lil' Sneaky-Snakes",
    "The Hungry Hungry Hippos",
]

const food_emojis = "🍏🍎🍐🍊🍋🍌🍉🍇🫐🍓🍈🍒🍑🥭🍍🥥🥝🍅🍆🥑🫒🥦🥬🫑🥒🌶️🌽🥕🧄🧅🥔🍠🥐🥯🍞🥖🫓🥨🧀🥚🍳🧈🥞🧇🥓🥩🍗🍖🌭🍔🍟🍕🥪🥙🧆🌮🌯🫔🥗🥘🫕🥫🍝🍜🍲🍛🍣🍱🥟🦪🍤🍙🍚🍘🥠🍥🥮🍢🍡🍧🍨🍫🍬🍭🍮🎂🍰🥧🧁🍦🍿🍩🍪🌰🥜🍯🥛🍼☕🍻🍺🍶🥤🧃🧋🧉🫖🍵🥂🍷🥃🍸🍹🍾🧊🥄🍴🧂🥢🥣🍽️🥡";
const emotes = (str) => str.match(/<a?:.+?:\d{18}>|\p{Extended_Pictographic}/gu);

function is_allowed(message, team_num) {
    message = message.trim();
    console.log("in is_allowed?", team_num, message)
    switch (team_num) {
        case 0:
            lines = message.split("\n");
            console.log(lines);
            if (lines.length != 2) {
                return false;
            }
            return lines[0].trim() == lines[1].trim();
        case 1:
            tokens = message.split(" ");
            if (tokens.length % 2 == 0) {
                mid = tokens.length / 2;
                for (let i = 0; i < tokens.length; i++) {
                    if (i == (mid - 1) || i == mid) {
                        if (tokens[i] != tokens[i].toUpperCase()) {
                            return false;
                        }
                    } else {
                        if (tokens[i] != tokens[i].toLowerCase()) {
                            return false;
                        }
                    }
                }
                return true;
            } else {
                mid = Math.floor(tokens.length / 2);
                for (let i = 0; i < tokens.length; i++) {
                    if (i == mid) {
                        if (tokens[i] != tokens[i].toUpperCase()) {
                            return false;
                        }
                    } else {
                        if (tokens[i] != tokens[i].toLowerCase()) {
                            return false;
                        }
                    }
                }
                return true;
            }
        case 2:
            tokens = message.split(" ");
            for (let i = 0; i < tokens.length; i++) {
                if (!tokens[i].endsWith("...")) {
                    return false;
                }
            }
            return true;
        case 3:
            return message.startsWith("||") && message.endsWith("||");
        case 4:
            /*message += "f";
            let on_s = false;
            let num_s = 0;
            for (let i = 0; i < message.length; i++) {
                if (on_s) {
                    if (message[i].toLowerCase() == "s") {
                        num_s ++;
                    } else {
                        if (num_s >= 9) {
                            on_s = false;
                            num_s = 0;
                        } else {
                            return false;
                        }
                    }
                } else {
                    if (message[i].toLowerCase() == "s") {
                        on_s = true;
                        num_s = 0;
                    } else {
                        continue;
                    }
                }
            }
            return true;*/
            b = ["h", "i", "s", " ", "\n"]

            tokens = message.split("");
            for (i = 0; i < tokens.length; i++) {
                a = tokens[i].toLowerCase();
                console.log(a, b.indexOf(a));
                if (b.indexOf(a) < 0) {
                    console.log("returning false!");
                    return false;
                }
            }
            return true;
        case 5:
            //const food_arr = foods.split(" ");
            food_count = 0;
            /*for (let i = 0; i < food_arr.length; i++) {
                console.log(food_arr[i]);
                if (message.indexOf(food_arr[i]) > 0) { 
                    food_count += 1;
                    message = message.replaceAll(food_arr[i], " ");
                }
            }*/
            let em = emotes(message);
            let unique_em = [...new Set(em)];
            let unique_foods = unique_em.filter(a => food_emojis.indexOf(a) >= 0);
            return unique_foods.length >= 5;
    }
}

client.once('ready', async () => {
	console.log('Ready!');
});

client.on('messageCreate', async (message) => {
    if (message.author == client.user) { return; }
    try {
        let author_member = message.guild.members.cache.get(message.author.id);
        for (let i = 0; i < all_roles.length; i++) {
            if (author_member.roles.cache.some(role => role.name.includes(all_roles[i]))) {
                let res = is_allowed(message.content, i);
                console.log("allowed on role", all_roles[i], "?", res);
                if (!res) {
                    //await message.reply("bad!");
                    await message.delete();
                }
            } else {
                console.log("Does not have role", all_roles[i]);
            }
        }
    } catch (error) {
        console.log(error);
    }
});

client.login(token);