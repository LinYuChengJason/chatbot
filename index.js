var express = require('express'); //require為使用模組
var bodyParser = require('body-parser');
var linebot = require('linebot'); 
var mongodb = require('mongodb'); 
var apiai = require('apiai');
var request = require('request');

var app = express(); //建立express實體，將express初始化，去NEW一個express，變數app才是重點。

var msg = '';

var bot = linebot({
  "channelId": "1531669581",
  "channelSecret": "a990b2c5396e8e5c207db5e034d74711",
  "channelAccessToken": "OTBP0oDhpEORLXeEi7dgGbROpakoaKRbB4b4p9O2WuXgP/+3KLkohEBC0gE20ayjidJ3Ja4QSmJNwchLiuqsTDnKOMD5CBwKCZ6Bwjbosu5l9kYryfY+5xO1K1chLWdN1LRZRT7By00apZS8mnUZCAdB04t89/1O/w1cDnyilFU="
}); // 連接line，驗證

bot.on('message', function(event) {
  if (event.message.type = 'text') {
     msg = event.message.text;
  // 收到文字訊息時，直接把收到的訊息傳回去
    event.reply(msg).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(abc);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }
});

var linebotParser = bot.parser();

app.post('/', linebotParser);  //路徑 

var api = apiai("96499911855b40b29cc7908eca2ed768");
var abc = '';

app.get('/api' , function(request , response){
	var request = api.textRequest('msg', {
    sessionId: 'Jason'
	});
 
	request.on('response', function(response) {
    console.log(response);
    abc = response;
	});
 
	request.on('error', function(error) {
    console.log(error);
	});
	
	request.end();
	
	response.status(200).send("Succeed Save"); 
	response.end();

		
});

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});