var sflib = require("JSForce");
//var Q = require("Q");

module.exports = function (config) {

    var _config = config;


  var conn = new sflib.Connection({
    oauth2:{
     loginUrl: _config.sfLogonUrl,
     clientId :_config.clientId,
     clientSecret : _config.clientSecret
    },
    proxyUrl : 'http://127.0.0.1:8888'
});

 

    var Listen = function (delegate) {
       conn.login(_config.login, _config.password, function (err, userInfo) {
  
            if (err) { return console.error(err); }
            // Now you can get the access token and instance URL information.
            // Save them to establish connection next time.
            console.log(conn.accessToken);
            console.log(conn.instanceUrl);
            // logged in user property
            console.log("User ID: " + userInfo.id);
            console.log("Org ID: " + userInfo.organizationId);
            conn.streaming.topic(_config.topic).subscribe(function (message) {
               delegate(message);
            });
        });

    }

    return {
        Listen: Listen
    }
} 