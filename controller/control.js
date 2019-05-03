var fs = require('fs')

var dbPath = './newlist.json'

exports.find = function(callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err) return callback(err)

		callback(null,JSON.parse(data))
	})
} 

exports.findById = function(sid,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err) return callback(err)

		var newlist = JSON.parse(data).news

		var ret = newlist.find(function(item){
			return item.id === parseInt(sid)
		})

		callback(null,ret)
	})
}
