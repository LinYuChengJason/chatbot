var express = require('express'); //require為使用那些模組
var app = express(); //建立express實體，將express初始化，去NEW一個express，變數app才是重點。

app.get('/', function(request, response){ //app.get就是幫你做路由(分辨做哪種事情，類似事件監聽器 ex:新增資料、查詢資料、刪除資料、修改資料)。
	response.status(200).send('<html><body><H1>Hello World</H1></body></html>'); // 200為http通訊協定 表示連線成功
	response.end(); //end為回傳給使用者
});

app.get('/api/test', function(request, response){ //連接到/api/test才會做的事情，request帶有連接進來的資訊(參數)，response為回傳的內容。
	var ret = {
		msg : 'Hello World',
		status : 0
	}
	response.status(200).send(JSON.stringify(ret)); //response status 回應使用者的代碼，send 回應給使用者實際上在畫面上的內容。
	response.end();
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







