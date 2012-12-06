'use strict';

var request = require('request');
var fs = require('fs');

module.exports = function(grunt){
  
  grunt.registerTask('rackspace','Commands for working with Rackspace Cloud.',function(){
    grunt.config.requires('rackspace.config.authUser','rackspace.config.authKey');
    grunt.config('rackspaceInit',grunt.config('rackspace.config'));
    grunt.task.run('rackspaceInit');
    if(grunt.config('rackspace.upload')){
      grunt.config('rackspaceUpload',grunt.config('rackspace.upload'));
      grunt.task.run('rackspaceUpload');
    }
    // TODO: Implement other rackspace api commands
  });
  
  grunt.registerTask('rackspaceInit','Authenticates with Rackspace; needed for other rackspace tasks.', function(){
    grunt.config.requires('rackspaceInit.authKey','rackspaceInit.authUser');
    var url = grunt.config('rackspaceInit.apiUrl') || 'https://auth.api.rackspacecloud.com/v1.0';
    var done = this.async();
    grunt.log.debug('requesting token from ' + url);
    request({
      url : url,
      headers : {
        "X-Auth-Key" : grunt.config('rackspaceInit.authKey'),
        "X-Auth-User" : grunt.config('rackspaceInit.authUser')
      },
      method : "HEAD"
    },function(error, response){
      if(error){
        grunt.log.error(error);
        done(false);
      }
      if(response.headers["x-auth-token"])
        grunt.config.set('rackspaceInit.authToken', response.headers["x-auth-token"]);
      else{
        error = 'No authentication token was returned in the headers. ' +
          'Request url: ' + url + '. Try setting "apiUrl" to something else.';
        grunt.fatal(error);
      }
      if(response.headers["x-storage-url"])
        grunt.config.set('rackspaceInit.storageUrl', grunt.utils._.rtrim(response.headers["x-storage-url"]), '/');
      else{
        error = 'No storage url was returned in the headers. ' +
          'Request url: ' + url + '. Try setting "apiUrl" to something else.';
        grunt.fatal(error);
      }
      grunt.log.debug('got token: ' + grunt.config('rackspaceInit.authToken'));
      grunt.log.debug('storage url: ' + grunt.config('rackspaceInit.storageUrl'));
      done();
    });
  });
  
  grunt.registerMultiTask('rackspaceUpload','Uploads files to Rackspace Cloud Files.',function(){
    this.requires('rackspaceInit');
    grunt.file.expandFiles(this.data.filename).forEach(uploadFile);
  });
  
  // Helper function for uploading a single file to rackspace cloud files
  function uploadFile() {
    var task = grunt.task.current;
    var data = task.data;
    var remote = grunt.utils._.trim(data.remoteDir, '/') + '/' + data.filename;
    var url = grunt.config('rackspaceInit.storageUrl') + '/' + remote;
    var done = task.async();
    grunt.log.debug('uploading ' + data.filename + ', remote: ' + remote);
    var uploadRequest = request({
      method : "PUT",
      url : url,
      headers : {
        "X-Auth-Token" : grunt.config('rackspaceInit.authToken')
      }
    });
    fs.createReadStream(data.filename).pipe(request(uploadRequest,function(error){
      if(error){
        grunt.log.error(error);
        done(false);
      }
      done();
    }));
  }
};
