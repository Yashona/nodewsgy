var express = require('express')

var News = require('./controller/control.js')
var UserSellInfor = require('./controller/userSellInforControl.js')

var router = express.Router()

router.get('/',function(req,res){
	res.render('./index.html')
})

router.get('/index',function(req,res){
	res.render('./index.html')
})

router.get('/product',function(req,res){
	res.render('./product.html')
})

router.get('/news',function(req,res){
	if(req.query.id){
		News.findById(req.query.id,function(err,data){
			if(err) return res.status(500).send('Server Error')
			res.render('./news/news'+ data.id +'.html',{newItem:data.id})
		})
	}else{
		News.find(function(err,data){
			if(err) return res.status(500).send('Server Error')

			var dataNewsList = data.news.reverse();
			res.render('./news.html',{newlist:dataNewsList})
		})
	}
	
})

router.get('/linkus',function(req,res){
	res.render('./linkus.html')
})

router.get('/sellInfor',function(req,res){

	UserSellInfor.save(req.query,function(err,data){
		if(err){
			return res.status(500).json({
					code: 500,
					message: '服务器忙，请稍后再试...'  //err 默认有一个message属性
				});
		}

		if(data === 'ok'){
			return res.status(200).json({
					code: 5000,
					message: '资料提交成功'
				})
		}
		
	})
})


module.exports = router