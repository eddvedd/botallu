const cheerio = require('cheerio');
const Scraper = require('../scraper');
const scraper = new Scraper();

class ChessParser {
	getOpenings() {
		return scraper
			.getHtml('https://www.chess.com/openings')
			.then((body) => {
				const $ = cheerio.load(body);
				var list = [];
				$('.openings-game-block').each(function (i, item) {
					list.push($(item).attr('href'));
				});
				return list;
			});
	}
}

//TODO: search, split results in opening move, respond with picture, name and link

module.exports = ChessParser;
