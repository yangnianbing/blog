/**
 * Created by 杨念兵 on 2015/1/18.
 */
var express = require('express');
var router = express.Router();
var https = require("https");
var User = require("../user/user");

var gitConfig = {
    clientId : 'cbbf18b9166d19ce63e8',
    clientSecret : '9001b2546460ffb5946ad8f5861096e309a0ea70',
    scope : 'user:email'
}

router.get("/login", function(req, resp){
    var dataStr = (new Date()).valueOf();
    var path = "https://github.com/login/oauth/authorize";
    path += '?client_id=' + gitConfig.clientId;
    path += '&scope='+gitConfig.scope;
    path += '&state='+ dataStr;
    resp.redirect(path);
})

router.get("/loginAfter", function(req, resp){
    var code = req.param('code');
    var state = req.param('state');
    var headers = req.headers;
    var path = "/login/oauth/access_token";
    headers.host = 'github.com';

    path += '?client_id=' + gitConfig.clientId;
    path += '&client_secret='+gitConfig.clientSecret;
    path += '&code='+ code;

    console.log(headers);
    var opts = {
        hostname:'github.com',
        port:'443',
        path:path,
        headers:headers,
        method:'POST'
    };
    var req = https.request(opts, function(res){
        res.setEncoding('utf8');
        res.on('data', function(data){
            var args = data.split('&');
            var tokenInfo = args[0].split("=");
            var token = tokenInfo[1];
            console.log(token);
            var url = "https://api.github.com/user?access_token="+token;

            opts.path = "/user?access_token="+token;
            opts.method = "GET";

            https.request(opts, function(res){
                res.setEncoding("utf-8");
                res.on('data', function(userInfo){
                    console.log(userInfo);
                    var UserEntity = new User({
                        email:userInfo.email,
                        username:userInfo.login,
                        passwd:'',
                        createTime:new Date(),
                        avatar_url:userInfo.avatar_url
                    });
                    UserEntity.save();
                });
            });
        })
    });

    req.on('error', function(err){
        console.log(err);
    });

    req.end();
});

module.exports = router;