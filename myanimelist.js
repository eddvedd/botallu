const { getInfoFromName } = require('myanimelists');
var chalk = require('chalk');
var Discord = require("discord.js");

module.exports = {
	searchAnime: function(message) {
		try {
			var animeQ = message.content.replace('!anime ', '');
			getInfoFromName(animeQ)
			    .then(function(animeResult) {
    				var episodes = animeResult.episodes;
					var genresArray = animeResult.genres;
					var genresString = "";
					for(var i=0; i<genresArray.length; i++) {
						genresString += genresArray[i] + ", ";
					}
					genresString = genresString.slice(0, -2);
					var score = animeResult.score;
					var url = animeResult.url;
					var title = animeResult.englishTitle;

					var animeReturnString = title + " | " + url + " | " + genresString + " | Score: " + score + " | Episodes: " + episodes;

					message.reply(animeReturnString);
			    }); 
		}
		catch(err) {
			console.log(chalk.red(err.message));
		}
	}
}