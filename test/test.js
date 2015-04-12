/**
 * New node file
 */
var mongodb = require('mongodb');
var server = new mongodb.Server("localhost",27017,{});
new mongodb.Db("blog", server, {}).open(function(error,client){
	if(error){
		throw error;
	}
	var collection = new mongodb.Collection(client, "test");
	var test = {id:'1', title:'test'};
	collection.update({id:"1"},{$set:{title:"test001"}},{multi:true});
	collection.find().toArray(function(error, docs){
		console.log(docs);
	});
	
});