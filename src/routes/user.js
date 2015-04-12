var express = require('express');
var router = express.Router();
var User = require("../user/user");
var Email = require("../email/email");

router.get("/regist", function(req, res){
	res.render("registLayout");
});


/**
 * 用户注册
 */
router.post("/regist", function(req, res){
	var username = req.param("username");
	var passwd = req.param("passwd");
	var email = req.param('email');
	var UserInfo = {
		username:username,
		passwd:passwd,
		createTime:new Date(),
		email:email
	};
	var UserEntity = new User(UserInfo);
	UserEntity.save();
	
	
	Email({
		to:email,
		html: '<b>登录名：</b>'+username+'<br/><b>注册邮箱为该收件箱,如密码忘记可以使用该收件箱找回密码！</b>' // html body
	}, function(error, response) {
		var result = "";
		if (error) {
			res.json({status:"fail",msg:error});
		} else {
			res.json({status : "success"});
		}
	});
});

router.post("/verifyEmail", function(req, res){
	var email = req.param("email");
	User.find({email:email},function(err, items){
		if(items.length > 0){
			res.json({"exist":true});
		}else{
			res.json({"exist":false});
		}
	});
});

router.post("/verifyUsername", function(req, res){
	var username = req.param("username");
	User.find({username:username},function(err, items){
		if(items.length > 0){
			res.json({"exist":true});
		}else{
			res.json({"exist":false});
		}
	});
});


router.post("/update", function(req, res){
	var userId = req.param("userId");
	var username = req.param("username");
	var passwd = req.param("passwd");
	var email = req.param('email');
	var UserInfo = {
		_id:userId,
		username:username,
		passwd:passwd,
		createTime:new Date(),
		email:email
	};
	var UserEntity = new User(UserInfo);
	UserEntity.update();
	res.json({status:"success"});
});


router.get("/login", function(req, res){
	res.render("loginLayout");
});

router.post("/login", function(req, res){
	var email = req.param("email");
	var passwd = req.param("passwd");
	User.find({"email":email, "passwd":passwd},function(err, items){
		if(items.length > 0){
			var currentUser = items[0];
			req.session.user = currentUser;
			res.json({status:"success"});
		}else{
			res.json({status:"fail"});
		}
	});
});

router.post("/isLogin", function(req, res){
	var currentUser = req.session.user;
	console.log(currentUser);
	if(currentUser != null){
		res.json({isLogin:true,username:currentUser.username});
	}else{
		res.json({isLogin:false});
	}
});

module.exports = router;
