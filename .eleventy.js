const plugins = require('./_plugins');
const markdown = require('./_markdown');

module.exports = function (config) {
    const input = 'src';
    const output = 'dist';

    config.addPassthroughCopy({
        'node_modules/@fontsource/open-sans/files/open-sans-{latin,latin-ext}-{400,500,700}-{italic,normal}.woff2':
            'assets/fonts/',
    });

    plugins(config);

    config.setLibrary('md', markdown(config));

    const templateFormats = ['md', 'njk', 'html'];
    const markdownTemplateEngine = 'njk';
    const htmlTemplateEngine = 'njk';

    return {
        templateFormats,
        markdownTemplateEngine,
        htmlTemplateEngine,

        dir: {
            input,
            output
        },
    };
}
