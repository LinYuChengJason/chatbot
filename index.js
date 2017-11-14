//require為使用模組
var express = require('express'); 
var linebot = require('linebot'); 
var apiai = require('apiai');
var mongodb = require('mongodb');

//建立express實體，將express初始化，去NEW一個express，變數app才是重點。
var app = express(); 

var api = apiai("96499911855b40b29cc7908eca2ed768");

var mongodbURL =
'mongodb://LinYuCheng:a0936662285@ds143081.mlab.com:43081/jasondatabase'; //將MongoDB的位置在Server程式碼中以一個變數儲存

var myDB; //建立一個全域變數myDB

// 連接line，驗證
var bot = linebot({
  "channelId": "1531669581",
  "channelSecret": "a990b2c5396e8e5c207db5e034d74711",
  "channelAccessToken": "OTBP0oDhpEORLXeEi7dgGbROpakoaKRbB4b4p9O2WuXgP/+3KLkohEBC0gE20ayjidJ3Ja4QSmJNwchLiuqsTDnKOMD5CBwKCZ6Bwjbosu5l9kYryfY+5xO1K1chLWdN1LRZRT7By00apZS8mnUZCAdB04t89/1O/w1cDnyilFU="
}); 

mongodb.MongoClient.connect(mongodbURL, function(err, db){ //使用mongodb.MongoClient的方法connect()進行連線
  if(err){                                               //事件監聽器用在非同步程式碼，不確定何時會用到
    console.log(err);                                  //若回傳的參數有error，用console.log()印出錯誤內容
  } else{
    myDB = db;                                         //在mongoDB成功連線後，留住db物件
    console.log('connection success');                 //若沒有錯誤表示連線成功，印出connection success
  }
});
var linebotParser = bot.parser();

app.post('/database', linebotParser); 

// app.get('/database', function(request, response){ //連接到/api/test才會做的事情，request帶有連接進來的資訊(參數)，response為回傳的內容。
bot.on('message', function(event) {
  var collection = myDB.collection('data'); //使用myDB的方法collection('data')取得data這個collection
  collection.find({}).toArray(function(err, docs){ //使用collection的方法find()取得資料表內的內容，{}表示取得全部內容

     event.reply(docs).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(docs);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });

   });
});

//路徑
app.post('/', linebotParser);  

bot.on('message', function(event) {

	var text = event.message.text;

	var request = api.textRequest(text, {
	    sessionId: '<Jason>'
	});
	 
	request.on('response', function(response) {

  	var action = response.result.action;    
  	var aiSpeech = response.result.fulfillment.speech;
  	if (action == 'movie') {
  // 收到文字訊息時，直接把收到的訊息傳回去
    event.reply(aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
	    console.log(response);
	}});

	request.on('error', function(error) {
	    console.log(error);
	});
	 
	request.end();
});

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});