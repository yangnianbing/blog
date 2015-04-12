var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
	port:"465",
	host:"smtp.qq.com",
	secure:"true",
	auth:{
		user:"137602812@qq.com",
		pass:"86962653"
	}
});


var MailUtil = function(option,callback){
	option.from = "137602812@qq.com";
	option.subject = "注册信息";
	smtpTransport.sendMail(option, callback);
};

module.exports = MailUtil;
