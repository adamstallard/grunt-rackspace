#grunt-rackspace

Grunt tasks for working with the Rackspace Cloud Api

###Installation

1.  Change directories to the root directory of your project.
2.  ``npm install grunt-rackspace``

###Usage

Add the following line to your grunt.js file
```javascript
grunt.loadNpmTasks('grunt-rackspace')
```

The ``rackspace`` task is now available, for example

```bash
grunt rackspace
```

There is also ``grunt rackspace --debug``
if you want to see debug output.

###Options

Options are placed in the ``grunt.initConfig`` section of your ``grunt.js`` file in the ``rackspace`` object.

Example:

```javascript
rackspace : {
  config : {
    authUser : "someCoolUser",
    authKey : "1234567890abcdef1234567890abcdef"
  },
  upload : {
    remotedir : "container"
    testfiles : {
      filename : "test/*",
      remotedir : "site"
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
  _options : {
    remotedir : "container"
    localdir : "files"
  },
  images : {
    filename : "images/*"
  },
  css : {
    filename : "css/*"
  },
  html : {
    filename : "*",
    localdir : "html"
  },
  disclaimer : {
    filename : "disclaimer.txt"
    remotedir : "misc"
  }
}
...
```

Required options:
* ``filename``

Other options:
* ``remotedir``
The location of the remote file: ``container/dir/subdir/subsubdir``, etc.
* ``localdir``
The location of the local file.  This path is removed from the remote file location.
 * For example, if you want a local file ``fun/index.html`` to show up remotely as just ``index.html``, set ``filename : "index.html"`` and ``localdir : "fun"``
* ``upload._options.remotedir``
top-level starting point (or container) for all remote files
* ``upload._options.localdir``
top-level version of ``localdir`` (affects all files)

__Filenames use the [minimatch](https://github.com/isaacs/minimatch) syntax for matching multiple files__