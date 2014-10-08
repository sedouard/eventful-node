module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	    typescript: {
	      compile: {
	        src: ['src/*.ts'],
	        dest: 'lib',
	        options: {
	          module: 'commonjs',
	          target: 'es5', //or es3
	          basePath: 'src',
	          sourceMap: true,
	          declaration: true,
			  watch: false,
			  atBegin: true
	      	}
		  },
		  watch: {
	        src: ['src/*.ts'],
	        dest: 'lib',
	        options: {
	          module: 'commonjs',
	          target: 'es5', //or es3
	          basePath: 'src',
	          sourceMap: true,
	          declaration: true,
			  watch: true,
			  atBegin: true
	      	}
		  }
		},
		mochaTest: {
	      test: {
	        options: {
	          reporter: 'spec'
	        },
	        src: ['tests/**/*.js']
	      }
	    },
		uglify: {
			
	      options: {
	        //places a timestamp on top of our minified file
	        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
	      },
	      build: {
	        //specifies source file(s) and destination.
	        src: 'lib/eventful-node.js',
	        dest: ‘bin/eventful-node’
	      }
    	}
		
	});
	
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//build
	grunt.registerTask('default', ['typescript:compile', 'uglify']);
	//test
	grunt.registerTask('test', ['mochaTest']);
	//live compile - for development
	grunt.registerTask('watch', ['typescript:watch']);
}

