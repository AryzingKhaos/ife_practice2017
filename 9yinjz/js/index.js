$(function(){
	var c=$('#myCanvas').get(0);
	var ctx=c.getContext("2d");
	var img1=$('#hideimg1').get(0);
	var img2=$('#hideimg2').get(0);
	var img3=$('#hideimg3').get(0);
	var img4=$('#hideimg4').get(0);
	var img5=$('#hideimg5').get(0);
	var srwidth=document.body.clientWidth;
	var srheight=document.body.clientHeight;
	c.width=srwidth;
	c.height=srheight;
	var randomimg=1;
	var timer;
	//page1按钮
	$('.enterbut').click(function(){
		$('.page1').removeClass('cur');
		$('.page2').addClass('cur');
		timer=setInterval(startDraw,50);
	});
	//文字动画
	setTimeout(function(){$(".textdiv .text1").fadeIn(1000);},0);
	setTimeout(function(){$(".textdiv .text2").fadeIn(1000);},1000);
	setTimeout(function(){$(".textdiv .text3").fadeIn(1000);},2000);
	setTimeout(function(){$(".textdiv .text4").fadeIn(1000);},3000);
	setTimeout(function(){$(".textdiv .text5").fadeIn(1000);},4000);
	setTimeout(function(){$(".textdiv .text6").fadeIn(1000);},5000);
	setTimeout(function(){$(".textdiv .text7").fadeIn(1000);},6000);
	//page2按钮
	$('.page2').click(function(){
		clearInterval(timer);
		displayResult();
	});
	//分享按钮
	$('.shrbtn').click(function(){
		$('.mask').show();
	})
	$('.mask').click(function(){
		$(this).hide();
	})
	//职业变动函数
	function startDraw(){
		// var imgdraw=$('#hideimg'+randomInt(1,5)).get(0);
		randomimg=randomInt(1,6);
		switch(randomimg){
			case 1:
				ctx.drawImage(img1,0,0,srwidth,srheight);
				break;
			case 2:
				ctx.drawImage(img2,0,0,srwidth,srheight);
				break;
			case 3:
				ctx.drawImage(img3,0,0,srwidth,srheight);
				break;
			case 4:
				ctx.drawImage(img4,0,0,srwidth,srheight);
				break;
			case 5:
				ctx.drawImage(img5,0,0,srwidth,srheight);
				break;
			default:
				break;
		}
	}
	
	function randomInt(low, high) {
	    return low + Math.floor(Math.random() * (high - low));
	}

	var menpai=[//别纠结为什么叫menpai，因为“门派”的英文就是“menpai”...
	{
		menpainame:"华山派",
		imgpath:"./images/jobend1.png",
		shareimg:"./images/share1.jpg",
		sharetitle:"华山派",
		sharedes:"江将有大事发生，武林就由我华山欧巴来拯救，11.3《决战光明顶》等你~我看你骨骼精奇，不如和我一起决战江湖如何？"
	},{
		menpainame:"百花派",
		imgpath:"./images/jobend2.png",
		shareimg:"./images/share2.jpg",
		sharetitle:"百花派",
		sharedes:"江湖将有大事发生，武林就由我百花御姐来拯救，11.3《决战光明顶》等你~我看你骨骼精奇，不如和我一起决战江湖如何？"
	},{
		menpainame:"少林派",
		imgpath:"./images/jobend3.png",
		shareimg:"./images/share3.jpg",
		sharetitle:"少林派",
		sharedes:"江湖将有大事发生，武林就由我少林萌新来拯救，11.3《决战光明顶》等你~我看你骨骼精奇，不如和我一起决战江湖如何？"
	},{
		menpainame:"天山派",
		imgpath:"./images/jobend4.png",
		shareimg:"./images/share4.jpg",
		sharetitle:"天山派",
		sharedes:"江湖将有大事发生，武林就由我天山萝莉来拯救，11.3《决战光明顶》等你~我看你骨骼精奇，不如和我一起决战江湖如何？"
	},{
		menpainame:"无门派",
		imgpath:"./images/jobend5.png",
		shareimg:"./images/share3.jpg",
		sharetitle:"任意门派",
		sharedes:"无敌是多么的寂寞，武林之大居然没有一人能做我的对手，11.3《决战光明顶》等你~我看你骨骼精奇，不如和我一起决战江湖如何？"
	}];

	var sharedate={
		title:menpai[randomimg-1].sharetitle,
		desc:menpai[randomimg-1].sharedes,
		link:window.location.href,
		img:menpai[randomimg-1].shareimg,
		appId:"wx85f9279720b3a543"
	};
	//显示结果
	function displayResult(){
		// console.log(randomimg);
		$('.page2').removeClass('cur');
		$('.page3').addClass('cur');
		var resultMenpai=$('.page3 .result');
		var resultMenpaiName=$('.page3 .result i');	
		var jobchosimg=$('.jobchos img');
		var htmltitle=$('title');
		var htmldes=$('#description').get(0);
		var imgshare=$('#shareimg').get(0);
		if(randomimg>0&&randomimg<5){
			resultMenpaiName.html(menpai[randomimg-1].menpainame);
			jobchosimg.get(0).src=menpai[randomimg-1].imgpath;
		}else if(randomimg==5){
			resultMenpai.html("大侠，你骨骼惊奇可选任何门派！<br/><span>11月3日iOS先锋上架</span>，下载游戏登录吧！");
			jobchosimg.get(0).src=menpai[randomimg-1].imgpath;

		}
		htmltitle.html(menpai[randomimg-1].sharetitle);
		htmldes.content=menpai[randomimg-1].sharedes;
		imgshare.src=menpai[randomimg-1].shareimg;
		
		sharedate={
			title:menpai[randomimg-1].sharetitle,
			desc:menpai[randomimg-1].sharedes,
			link:window.location.href,
			img:menpai[randomimg-1].shareimg,
			appId:"wx85f9279720b3a543"
		};
		console.log(sharedate);
		wxShare.init(function(wx){
			  //分享到朋友圈
			  wx.onMenuShareTimeline({
			    title:sharedate.title,
			    link:sharedate.link,
			    imgUrl:sharedate.img||'',
			    success:function(){ 
			    	return;
			    },
			    cancel:function(res){
			    	return;
			    },
			    fail:function(res){
			    	return;
			    }
			  });
			  // 发送给好友
			  wx.onMenuShareAppMessage({
			    title:sharedate.title,
			    desc:sharedate.desc||title,
			    link:sharedate.link,
			    imgUrl:sharedate.img||'',
			    success:function(){ 
			    	return;
			    },
			    cancel:function(){ 
			    	return;
			    },
			    fail:function(res){
			    	return;
			    }
			  });
		}, sharedate.appId, '', false); 
	}

});

