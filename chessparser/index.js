const cheerio = require('cheerio');
const Scraper = require('../scraper');
const Discord = require('discord.js');
const scraper = new Scraper();

class ChessParser {
	getOpenings() {
		return scraper
			.getHtml('https://www.chess.com/openings')
			.then((body) => {
				const $ = cheerio.load(body);
				var list = [];
				$('.openings-game-block').each(function (i, item) {
					var name = $(item).attr('title');
					var link = $(item).attr('href');
					var imgsrc = $(item).find('img').attr('data-src');
					var opening = new Opening(name, link, imgsrc);
					list.push(opening.AsMessageEmbed());
				});
				return list;
			});
	}
}

class Opening {
	constructor(name, href, imgsrc) {
		this.name = name;
		this.href = href;
		this.imgsrc = imgsrc;
	}

	AsMessageEmbed() {
		return new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`${this.name}`)
			.setURL(`${this.href}`)
			.setThumbnail(`${this.imgsrc}`);
	}
}

//TODO: opening search, split results in opening move

module.exports = ChessParser;
