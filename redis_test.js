var _redis = require("redis");

var client = _redis.createClient();

client.mset(["key1", "test val 1", "key2", 2], function (err, res) {});

// 리스트, 셋 삭제 후 리스트 데이터 넣기
client.del("key3");
client.del("key4");
for(var i=0;i<5;i++)
{
	client.lpush("key3", i, function (err, res) {});
	client.sadd("key4", i, function (err, res) {});
}

client.get("key1", function(err, reply) {
    // reply is null when the key is missing
    console.log(reply);
});

client.get("key2", function(err, reply) {
    console.log(reply);
});

// 리스트 값 얻기
client.lrange("key3", 0, -1, function(err, data) {
    console.log(data);
});

// 셋 정렬
client.sort("key4", "DESC", function(err, replies) {
	if (err) {
		return console.error("error response - " ,err);
	}
	
	console.log(replies.length + "replies:");
	replies.forEach(function(reply, i) {
		console.log(" sorted --> " + i + ": " + reply);
	});
});

// 셋 값 얻기
client.smembers("key4", function(err, data) {
    console.log(data);
});
