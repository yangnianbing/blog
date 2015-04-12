/**
 * New node file
 */
var mongodb = require("mongodb");
var db = require("../src/db/db");
var collection = new mongodb.Collection(db, "test");
var test = {id:'1', title:'test'};
collection.insert(test);

