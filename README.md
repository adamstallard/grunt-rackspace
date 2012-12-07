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

####``config``

Required options:
* ``authUser``
This is a rackspace username
* ``authKey``
This is a rackspace Api key

Other options:
* ``authUrl``
Url of the rackspace cloud authentication service

####``upload``

``upload`` is a multitask that organizes files into named groups.  Example:

```javascript
...
upload {
  images : {
    filename : "images/*"
  },
  css : {
    filename : "css/*"
  },
  disclaimer : {
    filename : "disclaimer.txt"
    remotedir : "container/subdir"
  }
}
...
```

Required options:
* ``filename``

Other options:
* ``remotedir``
The location of the remote file--``container/dir/subdir/subsubdir``, etc.
* ``basedir`` may be set in the top-level ``_options`` group to provide a starting location point (or container) for all remote files

Filenames use the [minimatch](https://github.com/isaacs/minimatch) syntax for matching multiple files