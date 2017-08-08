var express = require('express'); //require���ϥΨ��ǼҲ�
var mongodb = require('mongodb'); //�ϥμҲ�mongodb
var linebot = require('linebot'); //�ϥμҲ�linebot
var getJSON = require('get-json'); //�ϥμҲ�get-json

var bot = linebot({
  "channelId": "1511016044",
  "channelSecret": "614a1dc79eaefd4ca0c37263634be761",
  "channelAccessToken": "TYdm9aLp06Z+QIsCrCTPGPGrt8XrNx2QpWJFI4z+FbTuhxV2/nucvHZo7+kkdPlY1EowYjAd1CSDu8sqRL3G0VJl1ks1MRhogtDDITHyz6E4qSL9GMfkyexOCdrZIRLR/gobgmdQEFQvm473Yu0m0QdB04t89/1O/w1cDnyilFU="
}); 

var timer; //�w�q�ɶ�
var pm = []; //�w�q�Ѯ𬰯x�}
_getJSON(); //�I�s�禡

_bot(); //�I�s�禡

// �s��line
var app = express(); //�إ�express����A�Nexpress��l�ơA�hNEW�@��express�A�ܼ�app�~�O���I�C
const linebotParser = bot.parser();
app.post('/', linebotParser); //���|


app.listen(process.env.PORT || 5000);
console.log('port ' + (process.env.PORT || 5000)); //�Ұʦ��A���A��ťport 5000�C�w�]��80port�A�ҥH�h�b�Q�O�H�����CIP:127.0.0.1:5000�Adomain:http://localhost:5000



function _bot() {
  bot.on('message', function(event) {
    if (event.message.type == 'text') {
      var msg = event.message.text;
      var replyMsg = '';
      if (msg.indexOf('PM2.5') != -1) {
        pm.forEach(function(e, i) {
          if (msg.indexOf(e[0]) != -1) {
            replyMsg = e[0] + '�� PM2.5 �ƭȬ� ' + e[1];
          }
        });
        if (replyMsg == '') {
          replyMsg = '�п�J���T���a�I';
        }
      }
      if (replyMsg == '') {
        replyMsg = '�����D�u'+msg+'�v�O����N�� :p';
      }

      event.reply(replyMsg).then(function(data) {
        console.log(replyMsg);
      }).catch(function(error) {
        console.log('error');
      });
    }
  });

} //�^�_�Ŧ����A

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
  timer = setInterval(_getJSON, 1800000); //�C�b�p�ɧ���@���s���
}


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






