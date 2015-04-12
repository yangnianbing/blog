/**
 * New node file
 */
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	email:String,
	username:String,
	passwd:String,
	createTime:Date,
	avatar_url:String
});
var User = mongoose.model('users',UserSchema);

module.exports = User;
