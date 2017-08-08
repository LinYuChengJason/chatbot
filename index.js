var express = require('express'); //require為使用那些模組
var mongodb = require('mongodb'); //使用模組mongodb
var linebot = require('linebot'); //使用模組linebot
var getJSON = require('get-json'); //使用模組get-json

var bot = linebot({
  "channelId": "1511016044",
  "channelSecret": "614a1dc79eaefd4ca0c37263634be761",
  "channelAccessToken": "TYdm9aLp06Z+QIsCrCTPGPGrt8XrNx2QpWJFI4z+FbTuhxV2/nucvHZo7+kkdPlY1EowYjAd1CSDu8sqRL3G0VJl1ks1MRhogtDDITHyz6E4qSL9GMfkyexOCdrZIRLR/gobgmdQEFQvm473Yu0m0QdB04t89/1O/w1cDnyilFU="
}); 

var timer; //定義時間
var pm = []; //定義pm為矩陣
var weather = []; //定義天氣為矩陣
_getJSON(); //呼叫函式

_bot(); //呼叫函式

// 連接line
var app = express(); //建立express實體，將express初始化，去NEW一個express，變數app才是重點。
const linebotParser = bot.parser();
app.post('/', linebotParser); //路徑

app.post('/weather', linebotParser); //路徑


app.listen(process.env.PORT || 5000);
console.log('port ' + (process.env.PORT || 5000)); //啟動伺服器，聆聽port 5000。預設為80port，所以多半被別人佔走。IP:127.0.0.1:5000，domain:http://localhost:5000


//------------------------------------------------------------------空汙指數
function _bot() {
  bot.on('message', function(event) {
    if (event.message.type == 'text') {
      var msg = event.message.text;
      var replyMsg = '';
      if (msg.indexOf('PM2.5') != -1) {
        pm.forEach(function(e, i) {
          if (msg.indexOf(e[0]) != -1) {
            replyMsg = e[0] + '的 PM2.5 數值為 ' + e[1];
          }
        });
        if (replyMsg == '') {
          replyMsg = '請輸入正確的地點';
        }
      }
      if (replyMsg == '') {
        replyMsg = '不知道「'+msg+'」是什麼意思 :p';
      }

      event.reply(replyMsg).then(function(data) {
        console.log(replyMsg);
      }).catch(function(error) {
        console.log('error');
      });
    }	
	
  });

} //回復空汙狀態

function _getJSON() {
  clearTimeout(timer);
  getJSON('http://opendata2.epa.gov.tw/AQX.json', function(error, response) {
    response.forEach(function(e, i) {
      pm[i] = [];
      pm[i][0] = e.SiteName;
      pm[i][1] = e['PM2.5'] * 1;
      pm[i][2] = e.PM10 * 1;
    });
  });
 
  
  timer = setInterval(_getJSON, 1800000); //每半小時抓取一次新資料
}
//------------------------------------------------------------------空汙指數


//=================================================天氣
function _bot() {
  bot.on('message', function(event) {
    if (event.message.type == 'text') {
      var msg2 = event.message.text;
      var replyMsg2 = '';
      if (msg2.indexOf('天氣') != -1) {
        weather.forEach(function(e, i) {
          if (msg2.indexOf(e[0]) != -1) {
            replyMsg2 = e[0] + '的天氣狀況為 ' + e[1];
          }
        });
        if (replyMsg2 == '') {
          replyMsg2 = '請輸入正確的地點';
        }
      }


      event.reply(replyMsg2).then(function(data) {
        console.log(replyMsg2);
      }).catch(function(error) {
        console.log('error');
      });
    }
  });

} 

function _getJSON() {
  clearTimeout(timer);
  getJSON('http://opendata.epa.gov.tw/ws/Data/ATM00698/?$format=json', function(error, response) {
    response.forEach(function(e, i) {
      weather[i] = [];
      weather[i][0] = e.SiteName;
      weather[i][1] = e['天氣'] * 1;
    });
  });
  timer = setInterval(_getJSON, 1800000); //每半小時抓取一次新資料
}

//=================================================天氣




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






