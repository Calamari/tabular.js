module.exports = function(grunt) {
  grunt.initConfig({
    shell: { // grunt-shell
      mocha: {
        command: './node_modules/.bin/mocha --reporter spec test/support/**/*.js test/**/*test.js',
        options: {
          stdout: true,
          stderr: true
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('test', function() {
    grunt.task.run(['shell:mocha']);
  });
};
