var express = require('express');
var router = express.Router();
var Blog  = require("../blog/blog");
var Comment = require("../comment/comment");

/* GET home page. */
router.get('/', function(req, res) {
	res.render('mainLayout');
});

/**
 * 文章发布页面
 */
router.get("/Publish", function(req, res){
	res.render('publishLayout', { title: 'Express' });
});

/**
 * 文章保存
 */
router.post("/save", function(req, res){
	var email = req.param('email');
	var username = req.param('username');
	var website = req.param('website');
	var title = req.param('title');
	var content = req.param('content');
	var newBlog;
	if(req.session.user != null){
		var authorId = req.session.user._id;
		newBlog = new Blog({
			authorId:authorId,
			email : email,
			content:content,
			createTime:new Date(),
			title:title,
			readCount:0,
			replyCount:0
		});
	}else{
		newBlog = new Blog({
			authorInfo:{
				email : email,
				username:username,
				website:website
			},
			content:content,
			createTime:new Date(),
			title:title,
			readCount:0,
			replyCount:0
		});
	}
	newBlog.save();
	res.json({status:"success"});
});

/**
 * 文章列表
 */
router.post("/list", function(req, res){
	var pageNum = req.param('pageNum');
	Blog.findByConditionWithAuthor({'page':{'pageNum':pageNum}},function(err, items){
		res.json(items);
	});
});

router.get("/detail/:id", function(req, res){
	var id = req.params.id;
	res.render("detailLayout", {id:id});
});

router.post("/detail/:id", function(req, res){
	var id = req.params.id;
	Blog.findByConditionWithAuthorWithoutPageInfo({_id:id}, function(err,item){

		res.json(item);
	})
});

router.post("/comment/save/:blogId", function(req, res){
	var blogId = req.param('blogId');
	var content = req.param('content');
	var username = req.param('username');
	var email = req.param('email');
	var newComment = new Comment({
		content:content,
		blogId:blogId,
		username:username,
		email:email
	});
	newComment.save();
	
	Blog.update({_id:blogId},{$inc:{"replyCount":1}},function(){
		res.json({status:"success"});
	});
	
});

router.get("/comment/list/:blogId", function(req, res){
	var blogId = req.param('blogId');
	Comment.find({blogId:blogId}, function(err, items){
		res.json(items);
	});
});

router.post("/count/readCount/:blogId", function(req, res){
	var blogId = req.param("blogId");
	
	Blog.update({_id:blogId},{$inc:{"readCount":1}},function(){
		res.json({status:"success"});
	});
});




module.exports = router;
