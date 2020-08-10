const command = require('./commands');
const myanimelist = require('./myanimelist');
const chalk = require('chalk');

module.exports = {
	HandleMessage: function (client, message) {
		message.content = message.content.toLowerCase();
		if (message.author.bot === false) {
			//Save twitch highlight links to textfile
			if (message.content.includes('clips.twitch.tv')) {
				command.SaveTwitchHighlight(message);
			}
			//@allu response
			if (message.content.includes('468006950240649216')) {
				command.AlluReply(client.emojis, message);
			}
			//commands
			if (message.content === '!commands') {
				command.Commands(message);
			}

			if (message.content === '!ping') {
				command.Ping(message);
			}

			if (message.content === '!roll') {
				command.Roll(message);
			}
			if (message.content === '!los') {
				command.Lineofsight(message);
			}

			if (message.content === '!flip') {
				command.Flip(message);
			}

			if (message.content === '!gather') {
				command.Gather(message);
			}

			if (
				message.content === '!ready' ||
				message.content === '!r' ||
				message.content.startsWith('!r ')
			) {
				command.Ready(message);
			}

			if (message.content.startsWith('!addready ')) {
				command.AddReady(client, message);
			}

			if (
				message.content === '!unready' ||
				message.content === '!ur' ||
				message.content.startsWith('!ur ')
			) {
				command.Unready(message);
			}

			if (
				message.content === '!checkready' ||
				message.content === '!cr' ||
				message.content.startsWith('!cr ')
			) {
				command.Checkready(message);
			}

			if (
				message.content === '!clear' ||
				message.content === '!clearready'
			) {
				command.Clearready(message);
			}

			if (message.content === '!checkdelete') {
				command.CheckDelete(message);
			}

			if (message.content.startsWith('!remindme')) {
				command.Remindme(message);
			}

			if (message.content.startsWith('!joinrole')) {
				command.JoinRole(message);
			}

			if (message.content.startsWith('!leaverole')) {
				command.LeaveRole(message);
			}

			//Read highlights.txt and reply content
			if (message.content === '!highlights') {
				command.Highlights(message);
			}

			//Maps function
			if (message.content.startsWith('!maps')) {
				command.Maps(message);
			}

			//Create teams
			if (message.content.startsWith('!inhouse')) {
				command.Inhouse(message);
			}

			if (message.content.startsWith('!poll')) {
				command.Poll(message);
			}
			//MyAnimeList
			if (message.content.startsWith('!anime')) {
				myanimelist.searchAnime(message);
			}

			if (message.content.startsWith('!manga')) {
				myanimelist.searchManga(message);
			}
			if (message.content.startsWith('!nani')) {
				command.Nani(client, message);
			}
			if (message.content.startsWith('!scatman')) {
				command.Scatman(client, message);
			}
			if (message.content === '!openings') {
				command.ChessOpenings(message);
			}
			if (message.content.startsWith('!opening ')) {
				command.ChessOpening(message);
			}
		} else {
			command.Alluception(message);
		}
	},

	HandlePresenceUpdate: function (client, oldPresence, newPresence) {
		var wasStreaming = false;
		try {
			if (oldPresence !== undefined) {
				oldPresence.activities.map((activity) => {
					if (activity.url !== null) wasStreaming = true;
				});
			}

			if (wasStreaming) return;
			newPresence.activities.map((activity) => {
				if (activity.url !== null) {
					command.PresenceStreaming(
						client,
						activity,
						newPresence.userID
					);
				}
			});
		} catch (err) {
			console.log(chalk.red(err));
		}
	},

	HandleDelete: function (message) {
		command.DeletedMessage(message);
	},

	HandleVoiceStateUpdate: function (client, oldVoiceState, newVoiceState) {
		command.UpdateReadyOnVoiceState(client, oldVoiceState, newVoiceState);
	},
};
