// Require the necessary discord.js classes
const { Client, Collection, Intents, Message, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const { text } = require('express');
const readline = require('readline');
const { google } = require('googleapis');
const gal = require('google-auth-library');
const auth = new gal.GoogleAuth({
	keyFile: "sheets_credentials.json",
	scopes: "https://www.googleapis.com/auth/spreadsheets"
})
const privateKey = require('./dtc2-7d395-fbd0fb847adf.json');
const spreadsheetId = '1BrCj-zLZ5XrHGQuz4YRHXqeE6xRdlsiuf0gU62GdzGU';
const sheetName = 'Achievements';
const { MessageMentions: { USERS_PATTERN } } = require('discord.js');

//const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

var authClientObject;
var googleSheetsInstance;
var start_row;
var end_row;
var range_of_players;

// Create a new client instance
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

/*client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}*/

// When the client is ready, run this code (only once)
client.once('ready', async () => {
	console.log('Ready!');
	authClientObject = await auth.getClient();
	googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
	const readData = await googleSheetsInstance.spreadsheets.values.get({
		auth,
		spreadsheetId,
		range: "Achievements!C10:C"
	}, (err, result) => {
		if (err) {
		  // Handle error
		  	console.log(err);
		} else {
		  	console.log("success!")
			//console.log(result);
		  	const read_data_values = result.data.values;
			start_row = 10;
			end_row = 10;
			for (i = 0; i < read_data_values.length; i++) {
				//console.log(read_data_values[i][0]);
				if (read_data_values[i][0] == "Doofenshmirtz Evil Inc.") {
					start_row += i;
					break;
				}
			}
			for (i = start_row; i < read_data_values.length; i++) {
				if (read_data_values[i][0] == "" || typeof(read_data_values) === "undefined") {
					end_row = i-1;
				}
			}
			if (start_row == 10) {
				console.log("unable to find starting point in sheet");
				return;
			}
			if (end_row == 10) {
				console.log("unable to find ending point in sheet, proceeding with end of range");
				end_row = start_row + read_data_values.length - 1;
			}
			//console.log("Achievements!C" + start_row + ":C" + end_row);
			const rd2 = googleSheetsInstance.spreadsheets.values.get({
				auth,
				spreadsheetId,
				range: "Achievements!C" + start_row + ":C" + end_row
			}, (err, result) => {
				if (err) {
				  // Handle error
					console.log(err);
				} else {
					console.log("success!");
					range_of_players = result.data.values;
					//console.log(range_of_players);
				}
			});
			
		}
	  });
	/**/
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

achievements = {
	1: ["Practice a team game together [atleast 6 people must be present]", 300, 0],
	2: ["", 0, 0],
	3: ["Make and submit a team discord emote", 500, 0],
	4: ["Successfully make a “deez nuts” joke on another captain", 75, 75],
	5: ["Win a [practice or official] game of BOTC as Evil", 0, 90],
	6: ["Win a [practice or official] game of Mafia as Wolf [mafia]", 0, 90],
	7: ["Win a [practice or official] game of Untrusted as an Operation Leader", 0, 90],
	8: ["Win a [practice or official] game of Avalon as Merlin", 0, 90],
	9: ["Win a [practice or official] game of Secret Hitler as Hitler", 0, 90],
	10: ["Play 1 practice game of Untrusted with people on your team", 200, 100],
	11: ["Play 1 practice game of TOL with people on your team", 200, 100],
	12: ["Play 1 practice game of BOTC with people on your team", 200, 100],
	13: ["Play 1 practice game of Secret Hitler with people on your team", 200, 100],
	14: ["Play 1 practice game of Avalon with people on your team", 200, 100],
	15: ["Play 1 practice game of Mafia: Forum with people on your team", 200, 100],
	16: ["Beat 1 person on a different team at one [practice or official] game", 0, 150],
	17: ["Play 1 practice game of Avalon with people NOT on your team", 0, 85],
	18: ["Play 1 practice game of Secret Hitler with people NOT on your team", 0, 85],
	19: ["Play 1 practice game of BOTC with people NOT on your team", 0, 85],
	20: ["Play 1 practice game of Mafia: Forum with people NOT on your team", 0, 85],
	21: ["Play 1 practice game of Untrusted with people NOT on your team", 0, 85],
	22: ["Play 1 practice game of TOL with people NOT on your team", 0, 85],
	23: ["Beat a Coord. or Org. at a game", 0, 100],
	24: ["Share your favorite recipe with someone on your team", 0, 45],
	25: ["Win 3 official games", 0, 120],
	26: ["Win 7 official games", 0, 280],
	27: ["Win 11 official games", 0, 440],
	28: ["Beat your captain at a game [if you are a captain, beat another captain]", 150, 100],
	29: ["Send 2000 messages in your team chat [or server] [spamming does not count]", 0, 75],
	30: ["Send 5000 messages in your team chat [or server] [spamming does not count]", 0, 150],
	31: ["Send 10000 messages in your team chat [or server] [spamming does not count]", 0, 225],
	32: ["As a team, send over 10k messages in team chat or server [spamming does not count]", 200, 0],
	33: ["As a team, send over 15k messages in team chat or server [spamming does not count]", 250, 0],
	34: ["As a team, send over 20k messages in team chat or server [spamming does not count]", 300, 0],
	35: ["Learn a new fact about everyone on your team", 100, 100],
	36: ["Learn a new fact about 15 different people on different teams", 0, 175],
	37: ["Create a piece of art related to DTC [art is ANYTHING CREATIVE like songs, digital/print art, emoji creation, poetry, EVERYTHING!]", 0, 80],
	38: ["Complete the level HARD sudoku", 0, 135],
	39: ["Complete the level MEDIUM sudoku", 0, 90],
	40: ["Complete the level EASY sudoku", 0, 45],
	41: ["Practice 1 deduction game with people NOT on your team", 0, 100],
	42: ["Practice 1 long game game with people NOT on your team", 0, 100],
	43: ["Practice 1 quick game with people NOT on your team", 0, 100],
	44: ["Practice 1 special game with people NOT on your team", 0, 100],
	45: ["Practice 1 long game game with people on your team", 100, 125],
	46: ["Practice 1 quick game with people on your team", 100, 125],
	47: ["Practice 1 special game with people on your team", 100, 125],
	48: ["Participate in 1 team game", 0, 200],
	49: ["Find a hidden easter egg [may or may not be a legit egg] in the server somewhere [this must be DMed to a coord or org]", 0, 45],
	50: ["Win a [practice or official] duo game with someone on your team", 150, 100],
	51: ["Win a practice duo game with someone NOT on your team", 0, 70],
	52: ["Sacrifice your first born. To us.", 0, 10000],
	53: ["Complete a Wordle", 0, 45],
	54: ["Win a [practice or official] emotes only Secret Hitler game", 0, 100],
	55: ["Practice 1 team game with people on your team", 0, 75],
	56: ["Complete the rubix cube [hit scramble 5 times before beginning] https://rubikscu.be/", 0, 60],
	57: ["Win a [practice or official] game of AmongUs as Imposter", 0, 90],
	58: ["Finish all of your tasks in a [practice or official] AmongUs game", 0, 80],
	59: ["Correctly vote out the imposter on your first try", 0, 78],
	60: ["Shoot Hitler in Secret Hitler in a [practice or official] game", 0, 75],
	61: ["Dodge being shot as Merlin in Avalon in a [practice or official] game", 0, 75],
	62: ["Correctly guess the lines of a Secret Hitler game as a watcher", 0, 78],
	63: ["Score the first point in an official Rocket League game", 0, 90],
	64: ["Succesfully aid in completing a module in the official KTANE run", 0, 110],
	65: ["Help re-alive a team member in Evades", 0, 110],
	66: ["Get the first kill in an official Valorant game", 0, 90],
	67: ["Submit the highest scoring word in an official game of Combo Fighter", 0, 75],
	68: ["Win a whole continent in an official Risk game", 0, 85],
	69: ["Get a wiki in 5 or less clicks in an official Wikigame", 0, 150],
	70: ["Poison someone in Trivia Murder Party with a chalice", 0, 45],
	71: ["Have the longest road in Catan", 0, 65],
	72: ["Ping Bremen and say \"bitch\"", 0, 100],
	73:	["Get a pentakill in a [practice or official] game of League of Legends", 0, 100],
	74:	["Score an ace in a [practice or official] game of Valorant", 0, 100],
	75:	["Have everyone complete achievement #24", 100, 0],
	76:	["Have everyone complete achievement #72", 100, 0],
	77:	["Get a straight in Farkle", 0, 100],
	78:	["Be in the lead during a game by 4,000 points in Farkle", 0, 222],
	79:	["Get 2 hot dice in a row in Farkle", 0, 150],
	80: ["L + ratio", 0, -999999],
	81: ["Defuse \"MontyJava\'s Special Challenge\" in KTaNE (EFM/Team Solve)", 0, 200],
	82: ["(Bonus) Additional points for defusing \"MontyJava\'s Special Challenge\" as a member of a team (no EFMing). A reasonable contribution must be made to the team solve.", 0, 400],
	83: ["(Bonus) As a team, defuse \"MontyJava\'s Special Challenge\" without any strikes.", 0, 150],
	84: ["Complete an evades region with at least one person on another team.", 0, 400],
	85: ["Complete a 1014-piece jigsaw puzzle region with at least one person on another team.", 0, 400],
	86: ["Win a game of 9-ball without your opponent taking a turn.", 0, 100],
	87: ["Any of your stats have “69”, “6/9” “6.9” etc.", 0, 69],
	88: ["Create some form of art in a hex game (practice or official), and describe how it makes you feel.", 0, 50]
}

teams = {
    "952354945900900392": "Doofenshmirtz Evil Inc.",
    "952355246884159568": "16 Deadly Sins",
    "952355579244982273": "The Electoral College",
    "952355585179926578": "Eggheads",
    "952355587709108247": "Sax & Violins",
    "952355591760773140": "Down Fat"
}

competitors = {
	"280471970406072320": "MontyJava",
	"430841850996457482": "AnthemBell",
	"248946965633564673": "rav",
	"587738079360712717": "CarrotyReaper",
	"269813011353436171": "Darky",
	"193201281832189952": "EliTheTurkey",
	"343056555576655874": "enokii",
	"898724759280422972": "Fext",
	"699160173293469706": "hoboloser",
	"566110603635195905": "Illwei",
	"326142333387276289": "Jackal",
	"165224824187125760": "Jarek",
	"124007060793851904": "Kanye",
	"384544506604683274": "KendallFire",
	"512021899149180931": "Locke",
	"197168269742964736": "Tom Riddle",
	"245693765740789761": "YoubutWorse",
	"304960859661139968": "danixe",
	"457563309021986816": "Gellert",
	"299605026941173760": "Grunkle",
	"157920840250294283": "Heuchs",
	"269209127530528769": "jules",
	"328585126487261185": "Domenico",
	"354747254034399232": "knightsjob37",
	"315115231896403968": "Kvon",
	"229117826672230400": "kwiden",
	"236937366705537025": "Kylodor",
	"446032084444905492": "mufasa",
	"445795478169452544": "NancyRose",
	"722188747080204298": "Tail Recursion",
	"341357042134417440": "Lemarcus",
	"163292643005038602": "Starkrush",
	"816979197342777365": "傻瓜龐克",
	"633816453522522122": "adn249",
	"180820295563608064": "Basic Nerd",
	"319191001510182913": "Bruno",
	"305410443059396608": "Agra",
	"625797913783697408": "Ginger",
	"119901981820059648": "iLovePoison",
	"186976302568439808": "johnscoutman",
	"585117710111735848": "karatekick16",
	"231203838256742401": "Manu",
	"714240877144440833": "Novali91",
	"610627258264190976": "nsavant",
	"388116178268192768": "SadNixon",
	"369876514990194692": "Sarah",
	"124359873667399680": "Tenachiasaca",
	"164759167561629696": "themeeman",
	"701249489515708475": "Gawaine",
	"162950823293353985": "Shane",
	"481306040173068327": "ambition",
	"505247393835515905": "bellz",
	"337934133751840769": "benjamin172",
	"587672358647627776": "bhaddinger",
	"688870534720913424": "Bianca",
	"676134309781831691": "borby16",
	"466786756990337036": "Darkys",
	"224879227705491457": "dev",
	"637931645667639296": "Fairy Boots",
	"580057191193509888": "Maximovic96",
	"595741739680268309": "MsTinyJedi",
	"158337985727692800": "pingu",
	"247128461704036352": "Scorcha",
	"267225688761696257": "toothpaste",
	"583676123687419926": "woa",
	"160128034379137024": "Chilly",
	"177261421023854592": "Dolby",
	"499880855611768844": "DragonSlayer",
	"419779597672906752": "EggYolk",
	"329095420603269131": "epoxymoron",
	"210536044318162955": "Potato",
	"183474450237358081": "Ivy",
	"167286576915677184": "noonuus",
	"322140142661926914": "Octarine",
	"895796048780480553": "Owen",
	"168909821074997248": "SaxJon",
	"261563308698632199": "Stabby",
	"394894860835880960": "Tall",
	"155532098193588224": "The",
	"328271177569140736": "Thenuke740",
	"152907131325120513": "Yang",
	"469679601397006379": "artzy",
	"911332966477725749": "blobby",
	"400964886462726147": "Canaris",
	"126541778005393409": "Deadphisher",
	"490633966974533640": "Arwenior",
	"491037784274894855": "gitis",
	"515229058167078941": "ingenue",
	"297409105881202693": "Key",
	"409359894723035172": "Macspie",
	"309084775984136192": "mars",
	"153113236496056320": "Monoxide",
	"346547088412377098": "polypies73",
	"692525613591953408": "rainspider",
	"229102206886871041": "rose",
	"84045472511033344": "rsarvar1a",
	"182670214121390080": "shiro",
}

function usage(custom_message) {
    const embed = new MessageEmbed()
        .setTitle(custom_message)
        .setDescription("\`Usage: !d a <achievement-id> [<user/team> ...]")
        .setColor("LIGHT_GREY")
    return embed
}

function describe(number, achievement_array) {
    const embed = new MessageEmbed()
        .setTitle("Achievement #" + number)
        .setDescription(achievement_array[0] + " -- Team Points: " + achievement_array[1] + ", Personal Points: " + achievement_array[2])
        .setColor("LIGHT_GREY")
    return embed
}

client.on('messageCreate', async (message) => {
    if (message.author == client.user) { return; }
    // else {
    //     console.log("author:" + message.author);
    //     console.log("client:" + client.user);
    // }
    if (message.channel.name != "achievement-list-submissions") { return; }
    let temp_text = message.content.split(" ");
    if (temp_text[0] != "!d") { return; }
    if (!(temp_text[1] == "a" || temp_text[1] == "achievement")) {
        await message.reply({embeds: [usage("Error.")]});
    }
    let x = parseInt(temp_text[2]);
    if (isNaN(x)) {
        console.log(temp_text[2]);
        await message.reply({embeds: [usage("Error.")]});
        return;
    }
    if (achievements[x] === undefined) {
        await message.reply({embeds: [usage("Invalid achievement.")]});
        return;
    }
    await message.react("👌");
    await message.reply({embeds: [describe(x, achievements[x])]});
});

client.on('messageReactionAdd', async(reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error("bad", error);
			return;
		}
	}

	//console.log("!!!!");
    if (reaction.message.channel.name != "achievement-list-submissions") { return; }
	//console.log("!!!!");
    if (user == client.user) { return; }
	//console.log("!!!!");
    if (reaction.emoji.name != "👍") { console.log(reaction.emoji); return; }
    let reactor = reaction.message.guild.members.cache.get(user.id);
	//console.log(reactor);
    if (reactor.roles.cache.some(role => role.name.includes("Coordinator"))) {


		//console.log("in here");
        let temp_text = reaction.message.content.split(" ");
		//console.log("in here");
        if (temp_text[0] != "!d") { return; }
		//console.log("in here");
        if (!(temp_text[1] == "a" || temp_text[1] == "achievement")) {
            await reaction.message.channel.send(`${user} something went wrong.`);
        }
		//console.log("in here");
        let x = parseInt(temp_text[2]);
        if (isNaN(x)) {
            console.log(temp_text[2]);
            await reaction.message.channel.send(`${user} something went wrong.`);
            return;
        }
		//console.log("in here");
        if (achievements[x] === undefined) {
            await reaction.message.channel.send(`${user} something went wrong.`);
        }
        teamPoints = achievements[x][1];
        personalPoints = achievements[x][2];
        mentions = reaction.message.mentions;
        members_mentioned = mentions.users;
        roles_mentioned = mentions.roles;
        
		console.log("in here");
		console.log(members_mentioned);
		const matches = reaction.message.content.matchAll(USERS_PATTERN);
		const matches_arr = [...matches]
		console.log(matches_arr);
		console.log(reaction.message.content);
		

        result_text = "Successfully updated ";
        matches_arr.forEach(e => {
			let temp_id = e[1];
			console.log(temp_id);
            if (competitors[temp_id] !== undefined) {
                co = competitors[temp_id];
                result_text += competitors[temp_id] + ", ";
				
				if (personalPoints != 0) {
					let values = [[personalPoints]];

					const resource = {
						values,
					};
					
					update_cell(co, start_row, 5 + x, resource, reaction.message);
					/*for (i = 0; i < range_of_players.length; i++) {
						pName = range_of_players[i][0];
						if (pName.trim().toUpperCase() == co.trim().toUpperCase()) {
							cell_row = (start_row + i);
							cell_column = (4 + x);
							//console.log(cell_column, x);
							range_str = "Achievements!" + "R" + cell_row + "C" + cell_column + ":R" + cell_row + "C" + cell_column;
							console.log(range_str)
							console.log(pName);
							console.log(co);
							googleSheetsInstance.spreadsheets.values.update({
								auth,
								spreadsheetId,
								range: range_str,
								valueInputOption: "USER_ENTERED",
								resource
							}, async (err, result) => {
								if (err) {
									console.log(err);
									await reaction.message.react("⛔");
								} else {
									console.log("success!", result);
									await reaction.message.react("✅");
								}
							})
						}
					}*/
				}
            }
        });
        
		roles_mentioned.forEach(e => {
			let role_id = e.id;
			console.log(role_id);
			if (teams[role_id] !== undefined) {
				te = teams[role_id];
				result_text += teams[role_id] + ", ";
				if (teamPoints != 0) {
					let values = [[teamPoints]];

					const resource = {
						values,
					}
					update_cell(te, start_row, 5 + x, resource, reaction.message);

				}
			}
		});
        
        //await message.reply({embeds: [describe(x, achievements[x])]});
    } else {
		console.log(":(");
	}
});
// usage: !d a/achievement # @everyone who participated

async function update_cell(target_name, start_row, column, resource, message) {
	for (i = 0; i < range_of_players.length; i++) {
		pName = range_of_players[i][0];
		if (pName.trim().toUpperCase() == target_name.trim().toUpperCase()) {
			cell_row = (start_row + i);
			cell_column = column;
			//console.log(cell_column, x);
			range_str = "Achievements!" + "R" + cell_row + "C" + cell_column + ":R" + cell_row + "C" + cell_column;
			console.log(range_str)
			console.log(pName);
			//console.log(co);
			googleSheetsInstance.spreadsheets.values.update({
				auth,
				spreadsheetId,
				range: range_str,
				valueInputOption: "USER_ENTERED",
				resource
			}, async (err, result) => {
				if (err) {
					console.log(err);
					await message.react("⛔");
				} else {
					console.log("success!", result);
					await message.react("✅");
				}
			})
		}
	}
}

client.login(token);
