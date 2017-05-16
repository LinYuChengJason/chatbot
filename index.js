var express = require('express'); //require為使用那些模組
var mongodb = require('mongodb'); //使用模組mongodb
var app = express(); //建立express實體，將express初始化，去NEW一個express，變數app才是重點。

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

app.get('/', function(request, response){ //app.get就是幫你做路由(分辨做哪種事情，類似事件監聽器 ex:新增資料、查詢資料、刪除資料、修改資料)。
	response.status(200).send('<html><body><H1>Hello World</H1></body></html>'); // 200為http通訊協定 表示連線成功
	response.end(); //end為回傳給使用者
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

app.get('/webhook/', function(req, res){
	if(req.query['hub.verify_token'] === '<validation_token>'){
		res.send(req.query['hub.challenge']);
	}
	res.send('Error, wrong validation token');
})

app.post('/webhook/', function(req, res){
	messaging_events = req.body.entry[0].messaging; //所有訊息
	
	for(i = 0; i < messaging_events.length; i++){ //遍歷每一則
	
	event = req.body.entry[0].messaging.[i];
	sender = event.sender.id; //誰發的訊息
	
	if(event.message && event.message.text){
		text = event.message.text; //Handle a text message from this sender
	}
	}
	res.sendstatus(200);
});

var token = "<page_access_token>";

function sendTextMessage(sender, text){
	messageData = {
		text:text
	}
	request({
		url:'https://www.facebook.com/%E7%95%A2%E6%A5%AD%E5%B0%88%E9%A1%8C-170319796828236/'
		qs:{access_token:token},
		method: 'POST',
		json:{
			recipient: {id:sender},
			message: messageData,
		}
	},function(error, response, body){
		if(error){
			console.log('Error sending message:', error);
		}else if (response.body.error){
			console.log('Error:', response.body.error);
		}
	});
}

app.listen(process.env.PORT || 5000);
console.log('port ' + (process.env.PORT || 5000)); //啟動伺服器，聆聽port 5000。預設為80port，所以多半被別人佔走。IP:127.0.0.1:5000，domain:http://localhost:5000







