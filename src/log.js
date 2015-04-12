/**
 * Created by 杨念兵 on 2015/1/28.
 */
var log = require("log4js");

log.configure({
    appenders:[
        {type:'console'},
        {
            type:"file",
            filename:'log/access.log',
            maxLogSize:1024,
            backups:3
        }
    ]
})


var logger = log.getLogger("blog");
logger.setLevel("INFO");

module.exports = logger;