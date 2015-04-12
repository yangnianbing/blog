var express = require('express');
var router = express.Router();
var xmlreader = require("xmlreader");
var log = require("../log");

router.get('/', function(req, res){
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;
    res.send(echostr);
})


router.post("/", function(req, res){
    var info = "";
    req.addListener("data", function(chunk){
        info += chunk;
    }).addListener("end",function(){
        xmlreader.read(info, function(errors, response){
            var root = response.xml;
            var FromUserName = root.FromUserName.text();
            var ToUserName = root.ToUserName.text();
            var MsgType = root.MsgType.text();
            var Content = root.Content.text();
            if(null !== errors){
                res.send("");
            }
            var reponseText = buildResponseXml(FromUserName, ToUserName, MsgType, Content);
            log.info(reponseText);
            res.send(reponseText);
        });
    });

});

function buildResponseXml(FromUserName, ToUserName, MsgType, Content){
    var responseStr = "<xml> <ToUserName><![CDATA["+FromUserName+"]]></ToUserName>"+
        "<FromUserName><![CDATA["+ToUserName+"]]></FromUserName>"+
        "<CreateTime>"+new Date().valueOf()+"</CreateTime>"+
        "<MsgType><![CDATA["+MsgType+"]]></MsgType>"+
        "<Content><![CDATA["+Content+"]]></Content></xml>";
    return responseStr;
}

module.exports = router;