
//Bot Allu
var Discord = require("discord.js");
var chalk = require('chalk');
const handler = require('./handler');
const config = require("./config.json");

var client = new Discord.Client();

try {
	client.on("message", function (message) {
		handler.handleMessage(message);		
	});
}
catch(e) {
	console.log(chalk.red(e.message));
}

client.on("presenceUpdate", function (oldMember, newMember) {
	handler.handlePresence(client, oldMember, newMember);
});

client.on("ready", () => {
	client.user.setActivity('Skynet', {type: 'PLAYING'} );
    console.log(chalk.cyanBright("Allu is online and ready!"));
    console.log(chalk.magentaBright(client.readyAt));
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);		    	    
})

client.on('error', (error) => {
	console.log(chalk.gray("///////ERROR////////"));
	console.log(chalk.whiteBright(error.message));
	console.log(chalk.gray("////////////////////"));
	console.log(chalk.redBright("Encountered error, destroying and reconnecting Allu in 1 minute"))			
	setTimeout(function()
	{ 
		client.destroy();
		console.log(chalk.greenBright("destroyed..."));
		console.log(chalk.greenBright("reconnecting..."));
		client.login(config.token);				
	}, 60000);
})

client.on("messageDelete", (message) => {
	handler.handleDelete(message);
})

client.on("typingStart", (channel, user) => {
	if (user.bot === false) {
		var randomNr = (Math.floor(Math.random() * 11));

		if (randomNr === 1) {
			channel.startTyping(1);
			setTimeout(function()
			{ 
				channel.stopTyping(true);
			}, 10000);			
		}
	}
})

client.login(config.token);		    	
