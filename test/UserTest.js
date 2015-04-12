var User = require("../src/user/user");
var newUser = new User({
	name : "yang",
	password:"86962653"
});
newUser.save(function(err){
	console.log(err);
});