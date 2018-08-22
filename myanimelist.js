const { getInfoFromName } = require('myanimelists');
const { searchResultsWhereNameAndType } = require('myanimelists');
const { getInfoFromURL } = require('myanimelists');
var chalk = require('chalk');

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
	},

	searchManga: function(message) {
		try {
			var mangaQ = message.content.replace('!manga ', '');
			searchResultsWhereNameAndType(mangaQ, "manga")
			    .then(function(mangaResultList) {
			  //   	console.log(mangaResultList);
			     	var mangaResult = mangaResultList[0];
			     	var title = mangaResult.name;
			     	var url = mangaResult.url;

			     	message.reply(title + " | " + url);
    	// 			var episodes = mangaResult.episodes;
					// var genresArray = mangaResult.genres;
					// var genresString = "";
					// for(var i=0; i<genresArray.length; i++) {
					// 	genresString += genresArray[i] + ", ";
					// }
					// genresString = genresString.slice(0, -2);
					// var score = mangaResult.score;
					// var url = mangaResult.url;
					// var title = mangaResult.englishTitle;

					// var mangaReturnString = title + " | " + url + " | " + genresString + " | Score: " + score + " | Episodes: " + episodes;

					// message.reply(mangaReturnString);
			    }); 
		}
		catch(err) {
			console.log(chalk.red(err.message));
		}
	}	
}