var path = require('path');

module.exports = function (config) {

    var filesCollection = [
        'node_modules/lodash/index.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-ui-bootstrap/ui-bootstrap.js',
        'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.js',
        'node_modules/angular-payments/lib/angular-payments.js',
        'node_modules/angular-sanitize/angular-sanitize.js',
        'node_modules/ng-toast/dist/ngToast.js',
        'node_modules/socket.io-client/socket.io.js',
        'node_modules/phantomjs-polyfill/bind-polyfill.js',
        'public/main.js',
        'node_modules/sinon/pkg/sinon.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'tests/env.js',

        'tests/browser/**/*.js'
    ];

    var excludeFiles = [
        'tests/browser/karma.conf.js'
    ];



    var configObj = {
        browsers: ['PhantomJS'],
        frameworks: ['mocha', 'chai'],
        basePath: path.join(__dirname, '../../'),
        files: filesCollection,
        exclude: excludeFiles,
        reporters: ['mocha', 'coverage'],
        preprocessors: {
            '**/*.html': ['ng-html2js'],
            'public/main.js': 'coverage'
        },

        coverageReporter: {
            dir: 'coverage/browser/',
            reporters: [{
                type: 'text',
                subdir: '.'
            }, {
                type: 'html',
                subdir: '.'
            }]
        },
    };

    config.set(configObj);

};
