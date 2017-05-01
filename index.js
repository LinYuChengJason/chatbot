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

app.listen(5000); //�Ұʦ��A���A��ťport 5000�C�w�]��80port�A�ҥH�h�b�Q�O�H�����CIP:127.0.0.1:5000�Adomain:http://localhost:5000







