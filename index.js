var express = require('express'); //require為使用模組
var linebot = require('linebot'); 
var apiai = require('apiai');

var app = express(); //建立express實體，將express初始化，去NEW一個express，變數app才是重點。

var api = apiai("96499911855b40b29cc7908eca2ed768");

var bot = linebot({
  "channelId": "1531669581",
  "channelSecret": "a990b2c5396e8e5c207db5e034d74711",
  "channelAccessToken": "OTBP0oDhpEORLXeEi7dgGbROpakoaKRbB4b4p9O2WuXgP/+3KLkohEBC0gE20ayjidJ3Ja4QSmJNwchLiuqsTDnKOMD5CBwKCZ6Bwjbosu5l9kYryfY+5xO1K1chLWdN1LRZRT7By00apZS8mnUZCAdB04t89/1O/w1cDnyilFU="
}); // 連接line，驗證

bot.on('message', function (event) {
    event.reply(event.message.text).then(function (data) 
    {
        console.log('success');// success 
    }).catch(function (error) {
        console.log('error)';// error 
    });
});

var linebotParser = bot.parser();

app.post('/', linebotParser);  //路徑 

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});