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

app.get('/webhook/', function(req, res){
	if(req.query['hub.verify_token'] === '<validation_token>'){
		res.send(req.query['hub.challenge']);
	}
	res.send('Error, wrong validation token');
})

app.post('/webhook/', function(req, res){
	messaging_events = req.body.entry[0].messaging; //�Ҧ��T��
	
	for(i = 0; i < messaging_events.length; i++){ //�M���C�@�h
	
	event = req.body.entry[0].messaging.[i];
	sender = event.sender.id; //�ֵo���T��
	
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
console.log('port ' + (process.env.PORT || 5000)); //�Ұʦ��A���A��ťport 5000�C�w�]��80port�A�ҥH�h�b�Q�O�H�����CIP:127.0.0.1:5000�Adomain:http://localhost:5000







