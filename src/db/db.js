/**
 * New node file
 */
var dbSetting = require("./settings");
var mongodb = require("mongodb");
var Db = mongodb.Db;
var Connection = mongodb.Connection;
var Server = mongodb.Server;
module.exports = new Db(dbSetting.db, new Server(dbSetting.host, Connection.DEFAULT_PORT, {}));