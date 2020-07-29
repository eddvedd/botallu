const {
	getInfoFromName,
	searchResultsWhereNameAndType,
} = require("myanimelists");
const CacheService = require("../cacheservice");
const cache = new CacheService({ stdTTL: 0, maxKeys: 100 });

module.exports = {
	getAnimeFromName: function (query) {
		const key = `getAnimeFromName${query}`;
		return cache
			.get(key, () =>
				getInfoFromName(query).then((info) => {
					return info;
				})
			)
			.then((result) => {
				return result;
			});
	},

	getMangaFromName: function (query) {
		const key = `getMangaFromName${query}`;
		return cache
			.get(key, () =>
				searchResultsWhereNameAndType(query, "manga").then((info) => {
					return info;
				})
			)
			.then((result) => {
				return result;
			});
	},
};
