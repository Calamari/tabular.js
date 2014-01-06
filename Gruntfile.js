module.exports = function(grunt) {
  grunt.initConfig({
    concat: { // grunt-contrib-concat
      node: {
        src: ['src/tabular.js'],
        dest: 'tabular.js'
      },
      browser: {
        src: ['src/tabular.js'],
        dest: 'tabular_browser.js',
        options: {
          process: function(src, filepath) {
            return src.replace('module.exports', 'window.Tabular');
          }
        }
      },
      options: {
        separator: ';',
      }
    },
    shell: { // grunt-shell
      mocha: {
        command: './node_modules/.bin/mocha --reporter spec test/support/**/*.js test/**/*test.js',
        options: {
          stdout: true,
          stderr: true
        }
      }
    },
    uglify: { // grunt-contrib-uglify
      node: {
        files: {
          'tabular.min.js': 'tabular.js'
        },
        options: {
          preserveComments: 'some'
        }
      },
      browser: {
        files: {
          'tabular_browser.min.js': 'tabular_browser.js'
        },
        options: {
          preserveComments: 'some'
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build', ['concat', 'uglify']);

  grunt.registerTask('test', function() {
    grunt.task.run(['shell:mocha']);
  });
};
