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

const secret = "614a1dc79eaefd4ca0c37263634be761"; // 您的 Channel Secret
const id = "1511016044"; // 您的 Channel ID
const mid = "u03751d74c237fe741813b789e8ab43a2"; // 您的 MID 
const weather_key = "16b8c42d665cb0410dab109736c1c20d"; // openweathermap API key

var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');

var port = process.env.port || 1337
var app = express();
app.use(bodyParser.json());

// 接聽來自Line伺服器中的訊息，交由Function receiver處理
app.post('/callback', function (req, res) {
    receiver(req, res);
});

// 開啟伺服器
http.createServer(app).listen(port);

function getSign(event) {
    var crypto = require('crypto');
    var body = new Buffer(JSON.stringify(event.body), 'utf8');
    // secret 為您的 Channel secret     
    var hash = crypto.createHmac('sha256', secret).update(body).digest('base64');
    return hash
}
function receiver(req, res) {
    var data = req.body;
    if (getSign(req) == req.get("X-LINE-ChannelSignature")) {
        // ChannelSignature 正確，處理訊息
        data.result.forEach(function (result) {
            var type = result.content.contentType;
            if (type == "1") {
                sendTextMessage(result.content.from, "傳送您的位置來獲得天氣訊息");
            }
            else if (type == "8") {
                // 傳送一張隨機貼圖
                sendSticker(result.content.from, 4, getRandom(260, 289));
            }
            else if (type == "7")//location
            {
                // 傳送天氣訊息
                sendWeather(result.content.from, result.content.location.latitude, result.content.location.longitude)
            }

        });
        res.sendStatus(200);
    }
    else
        res.sendStatus(403); //ChannelSignature錯誤，回傳403

}
function sendWeather(recipientId, lat, lng) {
    // 查詢天氣，設定語言為繁體中文，溫度單位為攝氏溫度
    request({
        uri: 'http://api.openweathermap.org/data/2.5/weather',
        qs: {
            appid: weather_key,
            lat: lat,
            lon: lng,
            lang: "zh_tw",
            units: "metric"
        },
        method: 'GET',
    },

        function (error, response, body) {
            //Check for error
            if (error) {
                return console.log('Error:', error);
            }

            //Check for right status code
            if (response.statusCode !== 200) {
                return console.log('Invalid Status Code Returned:', response.statusCode, response.statusMessage);
            }
            var data = JSON.parse(body);
            // 傳送 城市名稱 天氣狀況 溫度
            sendTextMessage(recipientId, data.name + " " + data.weather[0].description + " 溫度:" + data.main.temp)
            // 傳送和天氣有關的貼圖
            var icon = data.weather[0].icon[0] + data.weather[0].icon[1];
            if (icon == "01" || icon == "02") //晴天
                sendSticker(recipientId, 4, 263);
            else if (icon == "03" || icon == "04") //多雲
                sendSticker(recipientId, 4, 264);
            else //雨天
                sendSticker(recipientId, 4, 266);

        }


    );
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function sendSticker(recipientId, s_pack, s_id) {
    var messageData = {
        to: [recipientId],
        toChannel: 1383378250,
        eventType: "138311608800106203",
        content: {
            contentType: 8,
            toType: 1,
            contentMetadata: {
                STKID: s_id + '',
                STKPKGID: s_pack + ''
            }
        }
    };

    toLine(messageData);
}
function sendTextMessage(recipientId, messageText) {
    var messageData = {
        to: [recipientId],
        toChannel: 1383378250,
        eventType: "138311608800106203",
        content: {
            contentType: 1,
            toType: 1,
            text: messageText
        }
    };
    toLine(messageData);
}
function toLine(messageData) {
    request({
        uri: 'https://trialbot-api.line.me/v1/events',
        headers: {
            "Content-type": "application/json; charser=UTF-8",
            "X-Line-ChannelID": id,
            "X-Line-ChannelSecret": secret,
            "X-Line-Trusted-User-With-ACL": mid
        },
        method: 'POST',
        json: messageData
    },
        function (error, response, body) {
            //Check for error
            if (error) {
                return console.log('Error:', error);
            }

            //Check for right status code
            if (response.statusCode !== 200) {
                return console.log('Invalid Status Code Returned:', response.statusCode, response.statusMessage);
            }

            //All is good. Print the body
            console.log(body); // Show the HTML for the Modulus homepage.

        }


    );
}

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

app.listen(process.env.PORT || 5000);
console.log('port ' + (process.env.PORT || 5000)); //啟動伺服器，聆聽port 5000。預設為80port，所以多半被別人佔走。IP:127.0.0.1:5000，domain:http://localhost:5000







