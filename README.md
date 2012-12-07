#grunt-rackspace

Grunt tasks for working with the Rackspace Cloud Api

###Installation

1.  Change directories to the root directory of your project.
2.  ``npm install grunt-rackspace``

###Usage

Add the following line to your grunt.js file
```javascript
grunt.loadNpmTasks('grunt-yourplugin')
```

The ``rackspace`` task is now available, for example

```bash
grunt rackspace
```

###Options

Options are placed in the ``grunt.initConfig`` section of your ``grunt.js`` file in the ``rackspace`` object.

Example:

```javascript
rackspace : {
  config : {
    authUser : "xyzDaddy",
    authKey : "1234567890abcdef1234567890abcdef"
  },
  upload : {
    testfiles : {
      filename : "test/*",
      remoteDir : "site/"
    }
  }
}
```

Globs (*) use the [minimatch](https://github.com/isaacs/minimatch) syntax

