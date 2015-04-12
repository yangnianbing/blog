/**
 * New node file
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');

var BlogSchema = new mongoose.Schema({
	title:String,
	content:String,
	createTime:Date,
	replyCount:Number,
	readCount:Number,
	authorId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'users'
	},
	authorInfo:{
		email:String,
		username:String,
		website:String
	}
});

BlogSchema.statics = {
		findByConditionWithAuthorWithoutPageInfo:function(obj, callback){
			return this.find(obj).populate('authorId').exec(function(err, item){
				callback(err, item);
			});
		},


		findByConditionWithAuthor:function(obj,callback){
			var q = obj.search || {};
			var pageNum = (obj.page && obj.page.pageNum) || 1;
			var pageSize = (obj.page && obj.page.pageSize) || 20;
			var skipFrom = ((pageNum - 1) * pageSize);
			return this.find(q).populate('authorId').sort({createTime:-1}).skip(skipFrom).limit(pageSize).exec(function(error, results){
				if (error) {
						callback(error, null, null);
				} else {
					Blog.count(q, function(error, count) {
						if (error) {
							callback(error, null, null);
						} else {
							var pageCount = Math.ceil(count / pageSize);
							callback(null ,{pageCount:pageCount, results:results});
						}
					});
				}
			});
		}
};

var Blog = mongoose.model('blogs',BlogSchema);



module.exports = Blog;
