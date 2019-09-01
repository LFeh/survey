module.exports = function(grunt) {

  // Load all tasks
  require('load-grunt-tasks')(grunt);

  // Paths
  var PathConfig = {
    dev: 'dev/',
    dist: 'dist/'
  };

  // Set scripts
  var scripts = [

    // Dependencies
    '<%= config.dev %>**/jquery-2.1.1.min.js',
    '<%= config.dev %>**/raphael-min.js',

    // Morris
    '<%= config.dev %>**/morris.min.js',
  ];

  // Grunt config
  grunt.initConfig({

    // Config path
    config: PathConfig,

    // Agroup Media Querie
    cmq: {
      options: {
        log: true
      },
      dev: {
        files: {
          '<%= config.dist %>assets/css/': ['<%= config.dist %>assets/css/style.css']
        }
      }
    },

    // Less
    less: {
      dev: {
        files: {
          "<%= config.dist %>assets/css/style.css": "<%= config.dev %>vendor/css/less/style.less"
        }
      },
      dist: {
        options: {
          cleancss: true,
          compress: true
        },
        files: {
          '<%= config.dist %>assets/css/style.css': '<%= config.dist %>assets/css/style.css'
        }
      }
    },

    // Uglify
    uglify: {
      dev: {
        files: {
          '<%= config.dist %>assets/js/scripts.min.js': scripts,
          '<%= config.dist %>assets/js/2014.js': '<%= config.dev %>**/2014.js',
          '<%= config.dist %>assets/js/2016.js': '<%= config.dev %>**/2016.js',
        }
      }
    },

    // JShint
    jshint: {
      files: [
        '<%= config.dev %>**/scripts/*.js',
      ]
    },

    // HTMLmin
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dev %>',
          src: ['*.html', '**/*.html'],
          dest: '<%= config.dist %>',
        }],
      }
    },

    // Watch
    watch: {
      options: {
        debounceDelay: 500,
      },
      less: {
        files: [
          '<%= config.dev %>**/*.less'
        ],
        tasks: ['less:dev']
      },
      js: {
        files: [
          '<%= config.dev %>**/scripts/*.js',
          'Gruntfile.js'
        ],
        tasks: ['uglify']
      },
      html: {
        files: [
          '<%= config.dev %>*.html'
        ],
        tasks: ['htmlmin']
      }
    },

    // Sync
    browser_sync: {
      files: {
        src: [
          '<%= config.dist %>**/*.css',
          '<%= config.dist %>**/*.jpg',
          '<%= config.dist %>**/*.png',
          '<%= config.dist %>**/*.js',
          '*.html'
        ]
      },
      options: {
        watchTask: true,
        host: '',
        server: {
          baseDir: '<%= config.dist %>'
        },
        ghostMode: {
          scroll: true,
          links: true,
          forms: true
        }
      }
    }


  });

  // Less
  grunt.registerTask('l', ['less']);

  // Js
  grunt.registerTask('j', ['uglify']);

  // JsLint
  grunt.registerTask('test', ['jshint']);

  // Build
  grunt.registerTask('build', ['uglify', 'htmlmin', 'less:dev', 'cmq', 'less:dist']);

  // Watch
  grunt.registerTask('w', ['browser_sync', 'watch']);

};
