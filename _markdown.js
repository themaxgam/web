const markdownIt = require('markdown-it');
const markdownItContainer = require('markdown-it-container');
const markdownItAbbr = require('markdown-it-abbr');
const markdownItDeflist = require('markdown-it-deflist');
const markdownItMark = require('markdown-it-mark');
const markdownItKbd = require('markdown-it-kbd');

module.exports = function (config) {
	const md = markdownIt({
		html: true
	});

	md.use(markdownItContainer, 'spoiler', {
		validate: function (params) {
			return params.trim().match(/^spoiler\s+(.*)$/);
		},
		render: function (tokens, idx) {
			const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

			if (tokens[idx].nesting === 1) {
				const headline = m[1] ?? '';

				return `<details><summary>${ headline }</summary>`;
			} else
				return `</details>\n`;
		}
	});

	md.use(markdownItContainer, 'figure', {
		caption: '',
		validate: function (params) {
			return params.trim().match(/^figure\s*(.*)$/);
		},
		render: function (tokens, idx) {
			const m = tokens[idx].info.trim().match(/^figure\s+(.*)$/);

			if (tokens[idx].nesting === 1) {
				this.caption = md.renderInline(md.utils.escapeHtml(m?.at(1) ?? ''));
				return `<figure>`;
			} else {
				let html = `</figure>\n`

				if (this.caption)
					html = `<figcaption>${ this.caption }</figcaption>${ html }`;

				return html;
			}
		}
	});

	md.use(markdownItAbbr);
	md.use(markdownItDeflist);
	md.use(markdownItMark);
	md.use(markdownItKbd);

	return md;
};
