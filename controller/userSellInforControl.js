var fs = require('fs')
var nodemailer = require('nodemailer')

var userInforPath = './userSellInfor.json'

exports.save = function(userInfor,callback){
	fs.readFile(userInforPath,'utf8',function(err,data){
		if(err) return callback(err)

		var sellInfors = JSON.parse(data).sellInfors;
				
		if(sellInfors.length !== 0){
			userInfor.id = sellInfors[sellInfors.length-1].id + 1
			userInfor.applytime = new Date().toLocaleString();
			sellInfors.push(userInfor)
		}else{
			userInfor.id = 1
			userInfor.applytime = new Date().toLocaleString();
			sellInfors.push(userInfor)
		}

		var fileData = JSON.stringify({
			sellInfors:sellInfors
		})

		sendEmail(userInfor);
		
		fs.writeFile(userInforPath,fileData,function(err){
			if(err) return callback(err)
			callback(null,'ok');
		});
	})
}


function sendEmail(userInfor){
	var fileDataHtml = '';
	for(var key in userInfor){
		fileDataHtml += "<span>"+ key +": </span>"+"<span>"+ userInfor[key] +"</span><br/>";
	}

	// 填入自己的账号和密码
	let transporter = nodemailer.createTransport({
	    host: 'smtp.qq.com',
	    auth: {
	        user: "1878850547@qq.com",
	        pass: "jwawyilxfkhpchie"
	    }
	});

	let mailOptions = {
	    from: '1878850547@qq.com',
	    to: '626460056@qq.com',
	    subject: 'this is a test',
	    html: fileDataHtml,
	};

	transporter.sendMail(mailOptions, (err, info) => {
	    if (err) return console.log(err);
	    console.log("邮件发送成功！");
	});
}
