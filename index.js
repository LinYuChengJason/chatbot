var express = require('express'); //require為使用那些模組
var mongodb = require('mongodb'); //使用模組mongodb
var linebot = require('linebot'); //使用模組linebot
var apiai = require('apiai');

var app = express(); //建立express實體，將express初始化，去NEW一個express，變數app才是重點。

/*var api = apiai("96499911855b40b29cc7908eca2ed768");

var options = {
    sessionId: 'Jason'
};

var request = api.getContextsRequest(options);

request.on('response', function(response) {
    // response = [
    // { name: "contextName" }
    // ]
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();

var requestSingle = api.getContextsRequest(options, 'contextName');

requestSingle.on('response', function(response) {
    console.log(response);
});

requestSingle.on('error', function(error) {
    console.log(error);
});

request.end();

/*app.get('/', function(request, res){ //app.get就是幫你做路由(分辨做哪種事情，類似事件監聽器 ex:新增資料、查詢資料、刪除資料、修改資料)。
	var api = apiai("96499911855b40b29cc7908eca2ed768");
	var text ='weather-question';
	var req = api.textRequest(text,{
		sessionId: 'Jason'
	});
	
	req.on('response', function(response) {
		var q='aa';
		//res.status(200).send(response); // 200為http通訊協定 表示連線成功
		res.status(200).send(q); // 200為http通訊協定 表示連線成功
	});
	 
	req.on('error', function(error) {
		var a='bb';
		res.status(200).send(error); // 200為http通訊協定 表示連線成功
		res.status(200).send(a); // 200為http通訊協定 表示連線成功
		
	});
	res.status(200).send('fuck'); // 200為http通訊協定 表示連線成功
	//res.status(200).send('fuck you'); // 200為http通訊協定 表示連線成功
	
	req.end();
	res.end(); //end為回傳給使用者	
	
		
	});*/

var bot = linebot({
  "channelId": "1531669581",
  "channelSecret": "a990b2c5396e8e5c207db5e034d74711",
  "channelAccessToken": "OTBP0oDhpEORLXeEi7dgGbROpakoaKRbB4b4p9O2WuXgP/+3KLkohEBC0gE20ayjidJ3Ja4QSmJNwchLiuqsTDnKOMD5CBwKCZ6Bwjbosu5l9kYryfY+5xO1K1chLWdN1LRZRT7By00apZS8mnUZCAdB04t89/1O/w1cDnyilFU="
}); // 連接line

bot.on('message', function(event) {
  if (event.message.type = 'text') {
    var msg = event.message.text;
    event.reply(msg).then(function(data) {
      // success 
      console.log(msg);
    }).catch(function(error) {
      // error 
      console.log('error');
    });
  }
});  //使用者打甚麼，LINE回什麼

const linebotParser = bot.parser();

app.post('/', linebotParser);  //路徑

var mongodbURL =
'mongodb://LinYuCheng:a0936662285@ds143081.mlab.com:43081/jasondatabase'; //將MongoDB的位置在Server程式碼中以一個變數儲存

var myDB; //建立一個全域變數myDB
mongodb.MongoClient.connect(mongodbURL, function(err, db){ //使用mongodb.MongoClient的方法connect()進行連線
	if(err){                                               //事件監聽器用在非同步程式碼，不確定何時會用到
		console.log(err);                                  //若回傳的參數有error，用console.log()印出錯誤內容
	} else{
		myDB = db;                                         //在mongoDB成功連線後，留住db物件
		console.log('connection success');                 //若沒有錯誤表示連線成功，印出connection success
	}
});

app.get('/api/test', function(request, response){ //連接到/api/test才會做的事情，request帶有連接進來的資訊(參數)，response為回傳的內容。
	var collection = myDB.collection('data'); //使用myDB的方法collection('data')取得data這個collection
	collection.find({}).toArray(function(err, docs){ //使用collection的方法find()取得資料表內的內容，{}表示取得全部內容
		if(err){                                     //使用toArray()將資料轉成陣列，function的docs是轉成陣列後的結果
			response.status(406).end();              //轉陣列過程若有err，回傳給錯誤碼406，此為Http協定狀態碼      
		} else{                                      //.end()為將資料回傳給使用者
			response.type('application/json');       //沒有錯誤回傳狀態碼200並附帶著資料，因為MongoDB存的資料就是JSON，所以不用特別轉換
			response.status(200).send(docs);
			response.end();
		}
   });
});

app.listen(process.env.PORT || 5000);
console.log('port ' + (process.env.PORT || 5000)); //啟動伺服器，聆聽port 5000。預設為80port，所以多半被別人佔走。IP:127.0.0.1:5000，domain:http://localhost:5000







