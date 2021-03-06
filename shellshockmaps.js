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
    if (message.content != "!randommap") { return; }
    if (message.channelId != "967481910005735494") { return; }
    l = {
        "Bastion": "https://static.wikia.nocookie.net/shellshockers/images/b/bf/Bastion.png/revision/latest/scale-to-width-down/1000?cb=20210314175712",
        "Biohazard": "https://static.wikia.nocookie.net/shellshockers/images/b/b3/Biohazard.png/revision/latest/scale-to-width-down/700?cb=20210314175740",
        "Blender": "https://static.wikia.nocookie.net/shellshockers/images/3/39/Blender.png/revision/latest/scale-to-width-down/700?cb=20210314175810",
        "Blue": "https://static.wikia.nocookie.net/shellshockers/images/1/16/Blue.png/revision/latest/scale-to-width-down/700?cb=20210314175905",
        "Bridge": "https://static.wikia.nocookie.net/shellshockers/images/0/0d/BridgeTopdown.png/revision/latest/scale-to-width-down/700?cb=20220303052820",
        "Castle": "https://static.wikia.nocookie.net/shellshockers/images/1/1f/Castle.png/revision/latest/scale-to-width-down/700?cb=20210314175945",
        "Castle Arena": "https://static.wikia.nocookie.net/shellshockers/images/4/4b/Castle_Arena.png/revision/latest/scale-to-width-down/700?cb=20210314180032",
        "Catacombs": "https://static.wikia.nocookie.net/shellshockers/images/5/59/Catacombs.png/revision/latest/scale-to-width-down/700?cb=20210314180113",
        "Cluckgrounds": "https://static.wikia.nocookie.net/shellshockers/images/5/59/Catacombs.png/revision/latest/scale-to-width-down/700?cb=20210314180113",
        "Death Pit": "https://static.wikia.nocookie.net/shellshockers/images/c/c3/Death_Pit.png/revision/latest/scale-to-width-down/700?cb=20210314180207",
        "Dirt": "https://static.wikia.nocookie.net/shellshockers/images/2/2f/Dirt.png/revision/latest/scale-to-width-down/700?cb=20210314180241",
        "Dirt 2": "https://static.wikia.nocookie.net/shellshockers/images/4/43/DirtTooTopView.png/revision/latest/scale-to-width-down/700?cb=20211114002258",
        "Dirt Base": "https://static.wikia.nocookie.net/shellshockers/images/4/4b/Dirt_Base.png/revision/latest/scale-to-width-down/600?cb=20210314180302",
        "Downfall": "https://static.wikia.nocookie.net/shellshockers/images/f/f6/Downfall.png/revision/latest/scale-to-width-down/400?cb=20210314180401",
        "Duel Pyramid": "https://static.wikia.nocookie.net/shellshockers/images/d/d5/Duel_Pyramid.png/revision/latest/scale-to-width-down/700?cb=20210314180419",
        "Eggcrates": "https://static.wikia.nocookie.net/shellshockers/images/a/ac/EggcratesTopdown.png/revision/latest/scale-to-width-down/700?cb=20220303053850",
        "Enchanted": "https://static.wikia.nocookie.net/shellshockers/images/a/a1/Enchanted.png/revision/latest/scale-to-width-down/500?cb=20220201231132",
        "Feedlot": "https://static.wikia.nocookie.net/shellshockers/images/5/5e/Feedlot.png/revision/latest/scale-to-width-down/700?cb=20210314180448",
        "Field": "https://static.wikia.nocookie.net/shellshockers/images/f/f1/Field.png/revision/latest/scale-to-width-down/700?cb=20210314180513",
        "Fort Flip": "https://static.wikia.nocookie.net/shellshockers/images/2/2e/Fort_Flip.png/revision/latest/scale-to-width-down/700?cb=20210314180540",
        "Four Quarters": "https://static.wikia.nocookie.net/shellshockers/images/b/b8/Four_Quarters.png/revision/latest/scale-to-width-down/600?cb=20210314180600",
        "Haunted": "https://static.wikia.nocookie.net/shellshockers/images/a/a9/Haunted.png/revision/latest/scale-to-width-down/700?cb=20210314180621",
        "Helix": "https://static.wikia.nocookie.net/shellshockers/images/c/c1/Helix.png/revision/latest/scale-to-width-down/700?cb=20210802002545",
        "Jailbreak": "https://static.wikia.nocookie.net/shellshockers/images/3/36/Jail_Break.png/revision/latest/scale-to-width-down/600?cb=20210314180705",
        "Jinx": "https://static.wikia.nocookie.net/shellshockers/images/d/d8/Jinx.png/revision/latest/scale-to-width-down/700?cb=20220404004312",
        "Junction": "https://static.wikia.nocookie.net/shellshockers/images/e/ee/Junction_-_RJIS.png/revision/latest/scale-to-width-down/700?cb=20210609025002",
        "King's Court": "https://static.wikia.nocookie.net/shellshockers/images/d/d1/King%27s_Court.png/revision/latest/scale-to-width-down/500?cb=20211202035600",
        "Moonbase": "https://static.wikia.nocookie.net/shellshockers/images/1/1c/Moonbase.png/revision/latest/scale-to-width-down/700?cb=20210314180725",
        "Mud Gulch": "https://static.wikia.nocookie.net/shellshockers/images/6/67/Mud_Gulch.png/revision/latest/scale-to-width-down/700?cb=20210314180743",
        "Overcooked": "https://static.wikia.nocookie.net/shellshockers/images/7/70/Overcooked.png/revision/latest/scale-to-width-down/700?cb=20210314180807",
        "Palace Siege": "https://static.wikia.nocookie.net/shellshockers/images/d/df/Palace_Siege.png/revision/latest/scale-to-width-down/600?cb=20210314180827",
        "Rameses": "https://static.wikia.nocookie.net/shellshockers/images/b/b6/Rameses.png/revision/latest/scale-to-width-down/700?cb=20210314180847",
        "Rivals": "https://static.wikia.nocookie.net/shellshockers/images/5/57/Rivals.png/revision/latest/scale-to-width-down/700?cb=20210701011539",
        "Road": "https://static.wikia.nocookie.net/shellshockers/images/d/d7/Road.png/revision/latest/scale-to-width-down/700?cb=20210314180910",
        "Ruins": "https://static.wikia.nocookie.net/shellshockers/images/6/6c/Ruins.png/revision/latest/scale-to-width-down/700?cb=20210314180932",
        "Scales": "https://static.wikia.nocookie.net/shellshockers/images/1/17/ScalesAerial.png/revision/latest/scale-to-width-down/700?cb=20220206024551",
        "Shellville": "https://static.wikia.nocookie.net/shellshockers/images/e/e8/Shellville.png/revision/latest/scale-to-width-down/700?cb=20210314180954",
        "Shipyard": "https://static.wikia.nocookie.net/shellshockers/images/0/0f/Shipyard.png/revision/latest/scale-to-width-down/600?cb=20210314181015",
        "Sky Scratcher": "https://static.wikia.nocookie.net/shellshockers/images/6/6b/Sky_Scratcher.png/revision/latest/scale-to-width-down/300?cb=20210314181037",
        "Space Arena": "https://static.wikia.nocookie.net/shellshockers/images/0/05/Space_Arena.png/revision/latest/scale-to-width-down/600?cb=20210314181057",
        "Space Factory": "https://static.wikia.nocookie.net/shellshockers/images/f/f0/Space_Factory.png/revision/latest/scale-to-width-down/700?cb=20210314181117",
        "Sparta": "https://static.wikia.nocookie.net/shellshockers/images/d/d3/Sparta.png/revision/latest/scale-to-width-down/500?cb=20210314181138",
        "Stage": "https://static.wikia.nocookie.net/shellshockers/images/6/6a/Stage.png/revision/latest/scale-to-width-down/700?cb=20210314181202",
        "Stax Arena": "https://static.wikia.nocookie.net/shellshockers/images/5/59/Stax_Arena.png/revision/latest/scale-to-width-down/700?cb=20210701005653",
        "Temple": "https://static.wikia.nocookie.net/shellshockers/images/4/49/Temple.png/revision/latest/scale-to-width-down/700?cb=20210314181222",
        "Timetwist": "https://static.wikia.nocookie.net/shellshockers/images/5/53/Timetwist.png/revision/latest/scale-to-width-down/700?cb=20220404001909",
        "Trainyard": "https://static.wikia.nocookie.net/shellshockers/images/5/5c/Trainyard_-_RJIS.png/revision/latest/scale-to-width-down/700?cb=20210507161613",
        "Two Towers": "https://static.wikia.nocookie.net/shellshockers/images/e/e1/Two_Towers.png/revision/latest/scale-to-width-down/700?cb=20210314181244",
        "Wreckage": "https://static.wikia.nocookie.net/shellshockers/images/1/10/Wreckage_-_RJIS.png/revision/latest/scale-to-width-down/600?cb=20210507161128",
    }
    num = Object.keys(l).length;
    map = Math.floor(Math.random() * num);
    //const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

    keys = Object.keys(l);
    map_name = keys[map]

    const embed = new MessageEmbed()
        .setTitle(map_name)
        .setImage(l[map_name]);

    await message.channel.send({embeds: [embed]});
});

client.login(token);