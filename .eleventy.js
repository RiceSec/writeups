module.exports = (conf) => {
	conf.addPassthroughCopy({
		css: '/css',
	});

	conf.addNunjucksFilter('depth', (str) => str.split('/').length);

	return {
		pathPrefix: '/writeups/',
	};
};
