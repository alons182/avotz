module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    
    uglify: {
      options: {
        compress:true,
        report:true,
        banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      app: {
        files:{
          'js/main.min.js':[
              'js/vendor/jPages.min.js',
              'js/vendor/jquery.cycle2.min.js',
              'js/vendor/jquery.inview.min.js',
              'js/vendor/jquery.validate.min.js',
              'js/vendor/shadowbox/shadowbox.js',
              'js/main.js'
          ]
        }
        
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
 // grunt.registerTask('default', ['uglify']);

};