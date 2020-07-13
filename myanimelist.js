const { getInfoFromName, searchResultsWhereNameAndType, getInfoFromURL } = require('myanimelists');
const chalk = require('chalk');
const helper = require('./helper');

module.exports = {
	searchAnime: function(message) {
		try {
			var query = message.content.replace('!anime ', '');
			getInfoFromName(query)
			    .then(function(animeResult) {
    				var episodes = animeResult.episodes;
					var genresArray = animeResult.genres;
					//myanimelist has updated their html and the scraper doesnt handle it well..
					//genresArray[0] can now be expected to be " ActionAction   "
					const cleanedGenres = genresArray.map(genre => {
						genre = genre.trim();
						genre = genre.slice(0, genre.length/2)
						return genre;
					});

					var score = animeResult.score;
					var url = animeResult.url;
					var title = animeResult.englishTitle;

					var animeReturnString = "\n> " + helper.BoldText(title) + "\n> " + url + "\n> " + helper.CursiveText(cleanedGenres.join(', ')) + "\n> Score: " + score + " | Episodes: " + episodes;

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
			     	var mangaResult = mangaResultList[0];
			     	var title = mangaResult.name;
			     	var url = mangaResult.url;

			     	message.reply(title + "\n" + url);
			    }); 
		}
		catch(err) {
			console.log(chalk.red(err.message));
		}
	}	
}