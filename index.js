var express = require('express'); //require���ϥΨ��ǼҲ�
var mongodb = require('mongodb'); //�ϥμҲ�mongodb
var app = express(); //�إ�express����A�Nexpress��l�ơA�hNEW�@��express�A�ܼ�app�~�O���I�C

var mongodbURL =
'mongodb://LinYuCheng:a0936662285@ds143081.mlab.com:43081/jasondatabase'; //�NMongoDB����m�bServer�{���X���H�@���ܼ��x�s

var myDB; //�إߤ@�ӥ����ܼ�myDB
mongodb.MongoClient.connect(mongodbURL, function(err, db){ //�ϥ�mongodb.MongoClient����kconnect()�i��s�u
	if(err){                                               //�ƥ��ť���Φb�D�P�B�{���X�A���T�w��ɷ|�Ψ�
		console.log(err);                                  //�Y�^�Ǫ��ѼƦ�error�A��console.log()�L�X���~���e
	} else{
		myDB = db;                                         //�bmongoDB���\�s�u��A�d��db����
		console.log('connection success');                 //�Y�S�����~��ܳs�u���\�A�L�Xconnection success
	}
});

const secret = "614a1dc79eaefd4ca0c37263634be761"; // �z�� Channel Secret
const id = "1511016044"; // �z�� Channel ID
const mid = "u03751d74c237fe741813b789e8ab43a2"; // �z�� MID 
const weather_key = "16b8c42d665cb0410dab109736c1c20d"; // openweathermap API key

var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');

var port = process.env.port || 1337
var app = express();
app.use(bodyParser.json());

// ��ť�Ӧ�Line���A�������T���A���Function receiver�B�z
app.post('/callback', function (req, res) {
    receiver(req, res);
});

// �}�Ҧ��A��
http.createServer(app).listen(port);

function getSign(event) {
    var crypto = require('crypto');
    var body = new Buffer(JSON.stringify(event.body), 'utf8');
    // secret ���z�� Channel secret     
    var hash = crypto.createHmac('sha256', secret).update(body).digest('base64');
    return hash
}
function receiver(req, res) {
    var data = req.body;
    if (getSign(req) == req.get("X-LINE-ChannelSignature")) {
        // ChannelSignature ���T�A�B�z�T��
        data.result.forEach(function (result) {
            var type = result.content.contentType;
            if (type == "1") {
                sendTextMessage(result.content.from, "�ǰe�z����m����o�Ѯ�T��");
            }
            else if (type == "8") {
                // �ǰe�@�i�H���K��
                sendSticker(result.content.from, 4, getRandom(260, 289));
            }
            else if (type == "7")//location
            {
                // �ǰe�Ѯ�T��
                sendWeather(result.content.from, result.content.location.latitude, result.content.location.longitude)
            }

        });
        res.sendStatus(200);
    }
    else
        res.sendStatus(403); //ChannelSignature���~�A�^��403

}
function sendWeather(recipientId, lat, lng) {
    // �d�ߤѮ�A�]�w�y�����c�餤��A�ū׳�쬰���ū�
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
            // �ǰe �����W�� �Ѯ𪬪p �ū�
            sendTextMessage(recipientId, data.name + " " + data.weather[0].description + " �ū�:" + data.main.temp)
            // �ǰe�M�Ѯ������K��
            var icon = data.weather[0].icon[0] + data.weather[0].icon[1];
            if (icon == "01" || icon == "02") //����
                sendSticker(recipientId, 4, 263);
            else if (icon == "03" || icon == "04") //�h��
                sendSticker(recipientId, 4, 264);
            else //�B��
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

app.get('/', function(request, response){ //app.get�N�O���A������(���밵���بƱ��A�����ƥ��ť�� ex:�s�W��ơB�d�߸�ơB�R����ơB�ק���)�C
	response.status(200).send('<html><body><H1>Hello World</H1></body></html>'); // 200��http�q�T��w ��ܳs�u���\
	response.end(); //end���^�ǵ��ϥΪ�
});

app.get('/api/test', function(request, response){ //�s����/api/test�~�|�����Ʊ��Arequest�a���s���i�Ӫ���T(�Ѽ�)�Aresponse���^�Ǫ����e�C
	var collection = myDB.collection('data'); //�ϥ�myDB����kcollection('data')���odata�o��collection
	collection.find({}).toArray(function(err, docs){ //�ϥ�collection����kfind()���o��ƪ������e�A{}��ܨ��o�������e
		if(err){                                     //�ϥ�toArray()�N����ন�}�C�Afunction��docs�O�ন�}�C�᪺���G
			response.status(406).end();              //��}�C�L�{�Y��err�A�^�ǵ����~�X406�A����Http��w���A�X      
		} else{                                      //.end()���N��Ʀ^�ǵ��ϥΪ�
			response.type('application/json');       //�S�����~�^�Ǫ��A�X200�ê��a�۸�ơA�]��MongoDB�s����ƴN�OJSON�A�ҥH���ίS�O�ഫ
			response.status(200).send(docs);
			response.end();
		}
   });
});

app.listen(process.env.PORT || 5000);
console.log('port ' + (process.env.PORT || 5000)); //�Ұʦ��A���A��ťport 5000�C�w�]��80port�A�ҥH�h�b�Q�O�H�����CIP:127.0.0.1:5000�Adomain:http://localhost:5000







