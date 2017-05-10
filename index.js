var express = require('express'); //require���ϥΨ��ǼҲ�
var app = express(); //�إ�express����A�Nexpress��l�ơA�hNEW�@��express�A�ܼ�app�~�O���I�C

app.get('/', function(request, response){ //app.get�N�O���A������(���밵���بƱ��A�����ƥ��ť�� ex:�s�W��ơB�d�߸�ơB�R����ơB�ק���)�C
	response.status(200).send('<html><body><H1>Hello World</H1></body></html>'); // 200��http�q�T��w ��ܳs�u���\
	response.end(); //end���^�ǵ��ϥΪ�
});

app.get('/api/test', function(request, response){ //�s����/api/test�~�|�����Ʊ��Arequest�a���s���i�Ӫ���T(�Ѽ�)�Aresponse���^�Ǫ����e�C
	var ret = {
		msg : 'Hello World',
		status : 0
	}
	response.status(200).send(JSON.stringify(ret)); //response status �^���ϥΪ̪��N�X�Asend �^�����ϥΪ̹�ڤW�b�e���W�����e�C
	response.end();
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







