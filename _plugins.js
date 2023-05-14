const eleventySassPlugin = require('eleventy-sass');
const eleventySyntaxHighlighPlugin = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (config) {
	config.addPlugin(eleventySassPlugin);
    config.addPlugin(eleventySyntaxHighlighPlugin);
};
