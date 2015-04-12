var express = require('express');
var router = express.Router();
var User = require("../user/user");
var Blog  = require("../blog/blog");
var log = require("../log");


router.get("/",function(req, res){
	res.render("manage/login");
});

router.post("/login",function(req, res){
	var email = req.param("email");
	var password = req.param("passwd");
	var rememberMe = req.param("rememberMe");
	User.find({email:email, passwd:password}, function(err, item){
		if(item.length > 0){
			req.session.user = item;
			res.json({"status":"success"});
		}else{
			res.json({"status":"error"});
		}
	});
});

router.get("/index", function(req, res){
	var user = req.session.user;
	if(user && user[0] && user[0].email === '137602812@qq.com'){
		res.render("manage/index");
	}else{
		res.redirect('/manage');
	}
});

router.get("/blog/list", function(req, res){
	res.render("manage/list");
});

router.get("/type/list", function(req, res){
	res.render("manage/type");
});


router.get("/blog/edit", function(req, res){
	res.render("manage/edit");
});

router.post("/blog/edit", function(req, res){
	var blogId = req.param('blogId');
	Blog.findByConditionWithAuthorWithoutPageInfo({_id:blogId}, function(err,item){
		res.json(item);
	});
});


router.post('/blog/update',function(req, res){
	var blogId = req.param('_id');
	var title = req.param('title');
	var content = req.param('content');

	Blog.update({_id:blogId},{title:title,content:content},function(){
		res.json({status:"success"});
	});
});


router.param("blogId", function(req, res, next, id){
	log.info("param called only once!");
	next();
});

router.get('/blog/delete/:blogId', function(req, res){
	var blogId = req.param("blogId");
	console.log(blogId);
	Blog.remove({_id:blogId}, function(err, item){
		res.redirect('/manage/index#/blog/list');
	});
});
module.exports = router;