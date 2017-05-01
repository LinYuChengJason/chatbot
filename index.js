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

app.listen(5000); //啟動伺服器，聆聽port 5000。預設為80port，所以多半被別人佔走。IP:127.0.0.1:5000，domain:http://localhost:5000







