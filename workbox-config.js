module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{json,ico,html,txt,md,css,js,png,svg,jsx}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};