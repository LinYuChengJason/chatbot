//require為使用模組
var express = require('express'); 
var linebot = require('linebot'); 
var apiai = require('apiai');
var request = require('request');
var cheerio = require('cheerio');

//建立express實體，將express初始化，去NEW一個express，變數app才是重點。
var app = express(); 

var api = apiai("96499911855b40b29cc7908eca2ed768");

// 連接line，驗證
var bot = linebot({
  "channelId": "1531669581",
  "channelSecret": "a990b2c5396e8e5c207db5e034d74711",
  "channelAccessToken": "OTBP0oDhpEORLXeEi7dgGbROpakoaKRbB4b4p9O2WuXgP/+3KLkohEBC0gE20ayjidJ3Ja4QSmJNwchLiuqsTDnKOMD5CBwKCZ6Bwjbosu5l9kYryfY+5xO1K1chLWdN1LRZRT7By00apZS8mnUZCAdB04t89/1O/w1cDnyilFU="
}); 

app.get('/', function(request, response){ 

    bot.on('message', function(event) {
	  request({
    url: "http://www.vscinemas.com.tw/visPrintShowTimes.aspx?cid=TP&visLang=2",
    method: "GET"
  }, function(error, response, body) {
    if (error || !body) {
      return;
    } else {
      var $ = cheerio.load(body);
      var target = $(".PrintShowTimesFilm");
      var target2 = $(".PrintShowTimesDay");
      var target3 = $(".PrintShowTimesSession")
      // console.log(target[14].children[0].data);
      // var showtimes = []
      var movie = target[0].children[0].data;
      var movie2 = target2[0].children[0].data;
      var movie3 = target3[0].children[0].data;
      
      // if (jp > 0) {
        // bot.on('message',function(event){
      event.reply('電影'+ movie + movie2 + movie3);

      response.status(200);
      response.end(); //end為回傳給使用者
        // });
       // resolve(showtimes)
         // });
      }
  });
})    
});

//bot收到訊息後
// bot.on('message', function(event) {

// 	var text = event.message.text;

// 	var request = api.textRequest(text, {
// 	    sessionId: '<Jason>'
// 	});
	 
// 	request.on('response', function(response) {

//   	var action = response.result.action;    
//   	var aiSpeech = response.result.fulfillment.speech;
//   	if (action == 'weather') {
//   // 收到文字訊息時，直接把收到的訊息傳回去
//     event.reply(aiSpeech).then(function(data) {
//       // 傳送訊息成功時，可在此寫程式碼 
//       console.log(aiSpeech);
//     }).catch(function(error) {
//       // 傳送訊息失敗時，可在此寫程式碼 
//       console.log('錯誤產生，錯誤碼：'+error);
//     });
// 	    console.log(response);
// 	}});

// 	request.on('error', function(error) {
// 	    console.log(error);
// 	});
	 
// 	request.end();
// });

// var linebotParser = bot.parser();

// //路徑
// app.post('/', linebotParser);   

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});