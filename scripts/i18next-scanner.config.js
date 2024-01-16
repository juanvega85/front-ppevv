var fs = require('fs');

module.exports = {
    input: [
        'src/**/*.{ts,tsx}',
        // Use ! to filter out files or directories
        '!app/**/*.spec.{js,jsx}',
        '!app/i18n/**',
        '!**/node_modules/**',
    ],
    output: './',
    options: {
        debug: false,
        sort: true,
        removeUnusedKeys: false,
        func: {
            list: ['t'],
            extensions: ['']
        },
        trans: {
            component: 'Trans',
            i18nKey: 'i18nKey',
            defaultsKey: 'defaults',
            extensions: ['.js', '.jsx'],
            fallbackKey: function(ns, value) {
                return value;
            },
            acorn: {
                ecmaVersion: 2020,
                sourceType: 'module', // defaults to 'module'
                // Check out https://github.com/acornjs/acorn/tree/master/acorn#interface for additional options
            }
        },
        lngs: ['en', 'es'],
        defaultLng: 'en',
        defaultValue: '__STRING_NOT_TRANSLATED__',
        resource: {
            loadPath: 'src/locales/{{lng}}.json',
            savePath: 'src/locales/{{lng}}.json',
            jsonIndent: 2,
            lineEnding: '\n'
        },
        nsSeparator: false, // namespace separator
        keySeparator: false, // key separator
        interpolation: {
            prefix: '{{',
            suffix: '}}'
        }
    },
    transform: function customTransform(file, enc, done) {
        "use strict";
        const parser = this.parser;
        const content = fs.readFileSync(file.path, enc);

        parser.parseFuncFromString(content, { list: ['t'] }, (key, options) => {
            parser.set(key, Object.assign({}, options, {
                nsSeparator: false,
                keySeparator: false
            }));
        });

        done();
    }
};
