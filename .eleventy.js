const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = (conf) => {
	conf.addPassthroughCopy({
		css: '/css',
	});
	conf.addPassthroughCopy('**/media/*')

	conf.addPlugin(syntaxHighlight);

	conf.addNunjucksFilter('depth', (str) => str.split('/').length);

	return {
		pathPrefix: '/writeups/',
	};
};
