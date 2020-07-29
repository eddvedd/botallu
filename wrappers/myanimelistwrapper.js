const {
	getInfoFromName,
	searchResultsWhereNameAndType,
} = require("myanimelists");
const CacheService = require("../cacheservice");
const cache = new CacheService({ stdTTL: 3600, maxKeys: 100 });

module.exports = {
	getAnimeFromName: function (query) {
		return cache
			.get(query, () =>
				getInfoFromName(query).then((info) => {
					return info;
				})
			)
			.then((result) => {
				return result;
			});
	},

	getMangaFromName: function (query) {
		return cache
			.get(query, () =>
				searchResultsWhereNameAndType(query, "manga").then((info) => {
					return info;
				})
			)
			.then((result) => {
				return result;
			});
	},
};
