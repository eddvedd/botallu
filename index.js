//Bot Allu
const Discord = require("discord.js");
const chalk = require("chalk");
const handler = require("./handler");
const config = require("./config.json");

const client = new Discord.Client();

try {
	client.on("message", function (message) {
		handler.HandleMessage(client, message);
	});
} catch (e) {
	console.log(chalk.red(e.message));
}

client.on("presenceUpdate", (oldPresence, newPresence) => {
	handler.HandlePresenceUpdate(client, oldPresence, newPresence);
});

client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => {
	handler.HandleVoiceStateUpdate(client, oldVoiceState, newVoiceState);
});

client.on("ready", () => {
	client.user.setActivity("Skynet", { type: "PLAYING" });
	console.log(chalk.cyanBright("Allu is online and ready!"));
	console.log(chalk.magentaBright(client.readyAt));
	console.log(
		`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`
	);
});

client.on("error", (error) => {
	console.log(chalk.gray("///////ERROR////////"));
	console.log(chalk.whiteBright(error.message));
	console.log(chalk.gray("////////////////////"));
	console.log(
		chalk.redBright(
			"Encountered error, destroying and reconnecting Allu in 1 minute"
		)
	);
	setTimeout(function () {
		client.destroy();
		console.log(chalk.greenBright("destroyed..."));
		console.log(chalk.greenBright("reconnecting..."));
		client.login(config.token);
	}, 60000);
});

client.on("messageDelete", (message) => {
	handler.HandleDelete(message);
});

client.on("typingStart", (channel, user) => {
	if (user.bot === false) {
		var randomNr = Math.floor(Math.random() * 11);

		if (randomNr === 1) {
			channel.startTyping(1);
			setTimeout(function () {
				channel.stopTyping(true);
			}, 10000);
		}
	}
});

client.login(config.token);
