var connection = require('../config/connectMon');
var config = require('../config/db');


module.exports.insertOne=function(obj,col,cb){
	connection.init(function(err, client){
		var db = client.db(config.dbName);
		db.collection(col).insertOne(obj, cb);
	});
}

module.exports.find=function(col,cb){
	connection.init(function(err, client){
		var db = client.db(config.dbName);
		db.collection(col).find().toArray(cb);
	});
}
	
module.exports.findOne=function(obj,col,cb){
	connection.init(function(err, client){
		var db = client.db(config.dbName);
		db.collection(col).find(obj).toArray(cb);
	});
}

module.exports.updateWhere=function(where, obj,col, cb){
	connection.init(function(err, client){
		var db = client.db(config.dbName);
		db.collection(col).updateOne(where, {$set : obj},{multi: true}, cb);
	});
}

module.exports.remove=function(obj,col,cb){
	connection.init(function(err,client){
		var db=client.db(config.dbName);
		db.collection(col).remove(obj,cb)
	});
}