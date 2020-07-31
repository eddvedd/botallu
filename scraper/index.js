const fetch = require('node-fetch');
const CacheService = require('../cacheservice');
const cache = new CacheService({ stdTTL: 3600, maxKeys: 100 });

class Scraper {
	constructor() {}

	getHtml(url, options) {
		const key = `getHtmlFromUrl${url}`;
		return cache
			.get(key, () =>
				getHtmlFromUrl(url, options).then((info) => {
					return info;
				})
			)
			.then((result) => {
				return result;
			});
	}

	getJson(url, options) {
		const key = `getJsonFromUrl${url}`;
		return cache
			.get(key, () =>
				getJsonFromUrl(url, options).then((info) => {
					return info;
				})
			)
			.then((result) => {
				return result;
			});
	}
}

function getHtmlFromUrl(url, options) {
	return fetch(url, options)
		.then((res) => res.text())
		.then((body) => {
			return body;
		});
}

function getJsonFromUrl(url, options) {
	return fetch(url, options)
		.then((res) => res.json())
		.then((json) => {
			return json;
		});
}

module.exports = Scraper;
