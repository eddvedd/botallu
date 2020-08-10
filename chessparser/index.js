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
				var openings = [];
				$('.openings-game-block').each(function (i, item) {
					var name = $(item).attr('title');
					var link = $(item).attr('href');
					var imgsrc = $(item).find('img').attr('data-src');
					var opening = new Opening(name, link, imgsrc);
					openings.push(opening);
				});
				return openings;
			});
	}

	getOpening(query) {
		return this.getOpeningFromOpenings(query).then((openings) => {
			if (openings.length) {
				return openings;
			} else {
				return this.getOpeningFromSearch(query).then((result) => {
					return result;
				});
			}
		});
	}
	getOpeningFromOpenings(query) {
		return this.getOpenings().then((result) => {
			var openings = [];
			result.forEach((opening) => {
				if (opening.name.toLowerCase().includes(query)) {
					openings.push(opening);
				}
			});
			return openings;
		});
	}
	getOpeningFromSearch(query) {
		return scraper
			.getHtml(`https://www.chess.com/openings/search?keyword=${query}`)
			.then((body) => {
				const $ = cheerio.load(body);
				const links = $('.openings-post')
					.map(function (i, item) {
						const test = $(item)
							.find('.post-category-preview-title')
							.attr('href');
						return test;
					})
					.get();
				return links;
			})
			.then((links) => {
				var promiseArray = [];
				var i;
				for (i = 0; i < links.length && i < 5; i++) {
					promiseArray.push(
						this.getOpeningDataFromPage(`${links[i]}`)
					);
				}
				return Promise.all(promiseArray).then((openings) => {
					return openings;
				});
			});
	}
	getOpeningDataFromPage(link) {
		return scraper.getHtml(`${link}`).then((body) => {
			const $ = cheerio.load(body);
			var imgsrc = $("meta[property='og:image']")
				.attr('content')
				.replace('&mask=social', '&size=2');
			var name = $("meta[property='og:title']")
				.attr('content')
				.replace(' - Chess Openings', '');
			return new Opening(name, link, imgsrc);
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

//TODO: split results in opening move

module.exports = ChessParser;
