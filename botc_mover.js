const { Client, Collection, Intents, Message, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');

const { MessageMentions: { USERS_PATTERN } } = require('discord.js');

// Create a new client instance
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.once('ready', async () => {
	console.log('Ready!');
});

const botcplayer = "959270101411049482";
const townsquarevc = "959280528756977785";
const night_category = "959280522171924550";

client.on('messageCreate', async (message) => {
    if (message.author == client.user) { return; }
    try {
        let author_member = message.guild.members.cache.get(message.author.id);
        //console.log(message.content);
        if (author_member.roles.cache.some(role => role.name.includes("Storyteller"))) {
            let c = message.content;
            if (c.trim().startsWith("!sweetdreams")) {
                let townsquare = message.guild.channels.cache.get(townsquarevc);
                console.log(townsquare.name);
                
                const night_cat = message.guild.channels.cache.get(night_category);
                console.log(night_cat.children.size);
                
                //const nc_array = Object.keys(night_channels);
                //console.log("night channels:", nc_array.length);
                /*for (let i = 0; i < all_members.length; i++) {
                    //all_members[i].voice.setChannel(night_channels[i] % night_channels.length);
                    console.log("moving user", all_members[i].name, "to channel", (night_channels[i] % night_channels.length).name);
                }*/
                //let c = 0;
                let all_members = await townsquare.members.filter(m => m.roles.cache.some(r => r.name.includes("BOTC Game Villager"))).array.forEach(element => {
                /*    //all_members[i].voice.setChannel(night_channels[i] % night_channels.length);
                    console.log("moving user", element.name, "to channel", (night_channels[c] % night_channels.length).name);
                    c++;*/
                });
                console.log("all_members: ", all_members.length);
            } else if (c.trim().startsWith("!wakeywakey")) {
                
            }
        }
    } catch (error) {
        console.log(error);
    }
});

client.login(token);