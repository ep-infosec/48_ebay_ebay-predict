'use strict';

var chromiumRevision = require('puppeteer/package.json').puppeteer.chromium_revision;
var downloader = require('puppeteer/utils/ChromiumDownloader');
var revisionInfo = downloader.revisionInfo(downloader.currentPlatform(), chromiumRevision);

process.env.CHROME_BIN = revisionInfo.executablePath;

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['lasso', 'mocha', 'chai'],
        lasso: {
            plugins: [
                'lasso-marko'
            ],
            minify: false,
            bundlingEnabled: false,
            resolveCssUrls: true,
            cacheProfile: 'test',
            tempdir: './.test'
        },
        plugins: [
            'karma-chai',
            'karma-mocha',
            'karma-lasso',
            'karma-mocha-reporter',
            'karma-chrome-launcher',
            'karma-coverage'
        ],
        files: [
            {
                pattern: 'test/functional-test/*.js',
                included: true,
                nocache: false
            }
        ],
        preprocessors: {
            'src/**/*.js': ['coverage'],
            'test/functional-test/*.js': ['coverage']
        },
        reporters: ['progress', 'coverage'],
        port: 9876,
        colors: true,
        autoWatch: true,
        singleRun: true,
        logLevel: config.LOG_DEBUG,
        browsers: ['ChromeHeadless'],
        coverageReporter: {
            reporters: [
                { type: 'html', dir: 'coverage/', subdir: '.functional-test', includeAllSources: true }
            ]
        }
    });
};
