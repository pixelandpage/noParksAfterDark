// Karma configuration
// Generated on Wed Jun 15 2016 10:17:21 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../www/lib/ionic/js/ionic.bundle.js',
      '../www/lib/ionic-platform-web-client/dist/ionic.io.bundle.min.js',
      '../www/index.html',
      '../www/js/app.js',
      '../www/js/controllers.js',
      '../www/js/services.js',
      'http://js.api.here.com/v3/3.0/mapsjs-core.js',
      'http://js.api.here.com/v3/3.0/mapsjs-service.js',
      'http://js.api.here.com/v3/3.0/mapsjs-mapevents.js',
      'http://js.api.here.com/v3/3.0/mapsjs-ui.js',
      '../www/lib/angular-mocks/angular-mocks.js',
      'unit-tests/api.controller.tests.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
