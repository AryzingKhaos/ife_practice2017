(function(){
	var windowwidth=document.documentElement.clientWidth;//浏览器宽度
	var windowheight=document.documentElement.clientHeight;//浏览器高度
	var logindiv=document.getElementById('login');//登录框
	var mongolia=document.getElementById('mongolia');//半透明蒙层
	var videoplay=document.getElementById('videoplay');
	var vibrow=document.getElementById('vibrow');

	///
	///顶部通知栏
	///
	//关闭按钮
	var closebtn=document.getElementById('closebtn');
	var msg=document.getElementById('msg');
	closebtn.addEventListener("click",function(){
		// closebtndiv.className+=" displaynone";
		msg.style.display="none";
		setCookie("nomoremsg","1");
	});
	if(getCookie("nomoremsg")=="1"){
		msg.style.display="none";
	}


	//点击关注按钮
	var follow=document.getElementById('follow');
	var loginclosebtn=document.getElementById('loginclosebtn');
	var loginbutton=document.getElementById('loginbutton');
	var havefollow=document.getElementById('havefollow');
	var havefollowdiv=document.getElementById('havefollowdiv');
	var cancelfollow=document.getElementById('cancelfollow');
	var logindivopen = function () {
		logindiv.style.display = "block";
		mongolia.style.display = "block";
	};
	var logindivclose = function () {
		logindiv.style.display = "none";
		mongolia.style.display = "none";
	};

	///
	///登录部分
	///
	//登录框位置
	logindiv.style.top=windowheight/2-195+'px';
	logindiv.style.left=windowwidth/2-145+'px';

	//登录框关闭按钮
	loginclosebtn.addEventListener("click",function(){
		// logindiv.setAttribute('style','display:none;');
		// mongolia.setAttribute('style','display:none;');
		logindivclose();
	});

	//点击关注,看是否登陆了
	follow.addEventListener("click",function () {
		if (getCookie("loginSuc")) {
			follow.style.display = "none";
			havefollowdiv.style.display = "block";
			ajax({
				method:"get",
				url:"http://study.163.com/webDev/attention.htm",
				data:{
				},
				success:function(){
					setCookie("followSuc","1");
				}
			});

		} else {
			logindivopen();
			loginclosebtn.onclick = function () {
				logindivclose();
			};


			//执行表单验证函数
			formVerify();
		}
	});
	if(getCookie("followSuc")=="1"){
		follow.style.display = "none";
		havefollowdiv.style.display = "block";
	}
	cancelfollow.addEventListener("click",function(){
		setCookie("followSuc","0");
		follow.style.display = "block";
		havefollowdiv.style.display = "none";
	});

	//登录表单验证
	function formVerify() {
		loginbutton.onclick=function () {
			var userName = document.getElementById('userName');
			var password = document.getElementById('password');
			var formTxt = /^[a-zA-Z]\w{3,15}$/gi;
			var form = document.getElementById("loginfrom");
			if(formTxt.test(userName.value)){
				ajax({
					method:"post",  //传输方式
					url:"http://study.163.com/webDev/login.htm", //url地址
					data:{
						"userName":hex_md5(userName.value), //"studyOnline",
						"password":hex_md5(password.value)//"study.163.com"
					},
					success:function (text) {
						setCookie("loginSuc","login",setCookieTime(3628800));//7天
						logindivclose();
						follow.style.display="none";
						havefollowdiv.style.display="block";
					},
					async:true  //异步方式
				});
			}else{
				alert("账号密码有误!");
			}
		}
	}

	///
	///视频播放部分
	///
	//弹出视频
	var videobrow=document.getElementById('videobrow');
	videobrow.addEventListener("click",function(){
		videoplay.removeAttribute('class','displaynone');
		mongolia.removeAttribute('class','displaynone');
		vibrow.play();
	});
	//视频位置
	videoplay.style.top=windowheight/2-300+'px';
	videoplay.style.left=windowwidth/2-475+'px';
	//关闭视频
	var videoclosebtn=document.getElementById('videoclosebtn');
	videoclosebtn.addEventListener("click",function(){
		videoplay.setAttribute('class','displaynone');
		mongolia.setAttribute('class','displaynone');
		vibrow.pause();
		vibrow.currentTime=0;
	});

	///
	///课程表单
	///
	// var pagesum=0;
	var pages=document.getElementById("pages");
	var content2="";
	var pagenum=pages.getElementsByClassName("pagenum");//页码数组
	// console.log(pagenum);
	// var pagesum=getPageSum();
	courseform(1,20,10);
	// console.log(pagesum);
	// setPageEvent(pagesum);

	//发送ajax，获得页码总数
	function getPageSum(){
		var myHeader="Content-Type";
		var myValue="application/x-www-form-urlencoded";
		var xhr =new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
					// console.log(JSON.parse(xhr.responseText).totalPage);
					var jsons=JSON.parse(xhr.responseText);

					var temppp=jsons.totalPage;
					return temppp;
				}else{
					alert("页码总数出错，错误代码: "+xhr.status);
					// console.log("获取课程列表出错，错误代码: "+xhr.status);
				}
			}
		};
		xhr.open("get","http://study.163.com/webDev/couresByCategory.htm?pageNo=1&psize=20&type=10",false);
		xhr.setRequestHeader(myHeader,myValue);
		xhr.send(null);
	}

	//tab切换
	var labelpro=document.getElementById('labelpro');
	var labelcode=document.getElementById('labelcode');
	labelpro.addEventListener("click",function(){
		this.className="labelone act";
		labelcode.className="labelone";
		courseform(1,10,20);
	});
	labelcode.addEventListener("click",function(){
		this.className="labelone act";
		labelpro.className="labelone";
		courseform(1,20,20);
	});




	//以下都是课程列表，包括分页器
	var nowindex;
	function setPageCurrent(nowindex2){
		for(var l=0;l<pagenum;l++){
			pagenum[l].className="pagenum";
		}
		pagenum[nowindex2-1].className="pagenum current";
	};
	setPageCurrent(1);
	function courseform(pageNo,type,psize) {
		ajax({
			method: "get",  //传输方式
			url: "http://study.163.com/webDev/couresByCategory.htm", //url地址
			data: {
				"pageNo": pageNo, //当前页码
				"psize": 20, //每页返回数据个数
				"type": type //筛选类型（10:产品设计;20:编程语言）;
			}, success: function (text) {
				//生成HTML内容
				var jsons = JSON.parse(text);
				var course = document.getElementById('course');

				var content = "";
				var coursenum = jsons.totalCount;
				for (var i = 0; i < 20; i++) {
					content += '<a  class="coursepart" href="">' +
						'<div class="course">' +
						'<div class="imgdiv"><img src="' + jsons.list[i].middlePhotoUrl + '"></div>' +
						'<div class="title">' + jsons.list[i].name + '</div>' +
						'<div class="belong">' + jsons.list[i].provider + '</div>' +
						'<div class="studentnumber"><div class="people"></div>' + jsons.list[i].learnerCount + '</div>' +
						'<div class="price">￥' + jsons.list[i].price + '</div>' +
						'</div>' +
						'<div class="courseop">' +
						'<div class="imgdiv fl"><img src="' + jsons.list[i].middlePhotoUrl + '" alt=""></div>' +
						'<div class="content fl">' +
						'<div class="title">' + jsons.list[i].name + '</div>' +
						'<div class="studentnumber">' + jsons.list[i].learnerCount + '人在学</div>' +
						'<div class="belong">发布者：' + jsons.list[i].provider + '</div>' +
						'<div class="divi">' + jsons.list[i].categoryName + '</div>' +
						'</div>' +
						'<div class="intr fl">' + jsons.list[i].description + '</div>' +
						'</div>' +
						'</a>'
				}
				course.innerHTML = content;
				var pagesum=jsons.totalPage;

				content2 = "";
				content2 += '<a href="javascript:;" id="larrow"  class="larrow"></a>';
				// var kk = 0;
				var startnum=1;
				var endnum=pagesum;

				//通过nowindex来判断当前应该显示的页码范围
				// var nowindexs=nowindex+1;
				if(nowindex==undefined) nowindex=1;
				if(nowindex<=5){
					startnum=1;
					endnum=8;
				}else if(nowindex>=6&&nowindex<=pagesum-4){
					startnum=nowindex-4;
					endnum=nowindex+3;
				}else if(nowindex>pagesum-4){
					startnum=pagesum-7;
					endnum=pagesum;
				}else{
					startnum=1;
					endnum=8;
				}
				console.log(nowindex);
				console.log(startnum,endnum);
				for (var k = startnum; k<=endnum; k++) {
					// kk = k + 1;
					content2 += '<a href="javascript:;"  class="pagenum">' + k + '</a>';
				}
				content2 += '<a href="javascript:;"  id="rarrow" class="rarrow"></a>';
				pages.innerHTML = content2;
				// pagenum=pages.getElementsByClassName("pagenum");
				var larrow=document.getElementById('larrow');
				var rarrow=document.getElementById('rarrow');

				//绑定左右箭头点击事件
				larrow.addEventListener("click",function(){
					if(nowindex-1>=1){
						courseform(nowindex-1,20,10);
						setPageCurrent(nowindex-1);
						nowindex-=1;
					}
				});
				rarrow.addEventListener("click",function(){
					if(nowindex+1<=endnum){
						courseform(nowindex+1,20,10);
						setPageCurrent(nowindex+1);
						nowindex+=1;
					}
				});

				//绑定页码点击事件
				for (var j = 0; j <8; j++){
					pagenum[j].index = j + 1;
					// throw new Error("错误发生在"+j);
					function handle(){
						courseform(this.index,20,10);
						nowindex=this.index;
						setPageCurrent(nowindex);
					};
					pagenum[j].removeEventListener("click",handle);
					pagenum[j].addEventListener("click",handle);
				}
			},
			async: false
		});
	}

	//热门排行榜
	rankform();
	function rankform(){
		ajax({
			method: "get",  //传输方式
			url: "http://study.163.com/webDev/hotcouresByCategory.htm", //url地址
			data: {
			},
			success: function (restext){
				var jsons=JSON.parse(restext);
				var rankdiv=document.getElementById('rankdiv');
				var content="";
				for(var i=0;i<20;i++){
					content+='<a href="'+jsons[i].providerLink+'">' +
						'<div class="rankone clearfix">'+
						'<img src="'+jsons[i].smallPhotoUrl+'" height="50" width="55" alt="">'+
						'<div class="rankc">'+
						'<div class="rankt">'+jsons[i].name+'</div>'+
						'<div class="ranknum"><div class="people"></div>'+jsons[i].learnerCount+'</div>'+
						'</div>'+
						'</div>'+
						'</a>'
				}
				rankdiv.innerHTML=content;
				var j=10;
				var top=0;
				inter=setInterval(upperScroll(rankdiv,j,top),5000);
				return jsons;
			},
			async: true
		});
	}

	//热门排行榜的滚动函数
	function upperScroll(rankdiv,j,top){
		return(function(){
			top-=70;
			j++;
			if(j>=20){
				top=0;
				j=10;
				rankdiv.style.top=top+"px";
			}else{
				rankdiv.style.top=top+"px";
			}
		});

	}



	//轮播图
	var banner = document.getElementById('slide');
	var box = banner.getElementsByClassName('slide-box')[0];
	var aImg = box.getElementsByTagName('div');
	var count = banner.getElementsByClassName('count')[0];
	var circle = count.getElementsByTagName('i');
	var timer = play = null;
	var i = index = 0;
	var len=circle.length;
	//切换按钮
	for(var i=0;i<len;i++){
		circle[i].index = i;
		circle[i].front=index==0?len-1:index-1;//index的前一个元素。如果index为0，那么front为最后一个元素
		// circle[i].onmouseover = function(){
		// 	show(this.index)
		// }
		circle[i].addEventListener("click", function(){
			show(this.index);
		});
	}


	//鼠标滑过定时器
	banner.onmouseover = function(){
		clearInterval(play)
	};
	//鼠标离开开启自动播放
	banner.onmouseout = function(){
		autoPlay();
	};
	//自动播放函数
	function autoPlay(){
		play = setInterval(function(){
			index=indexOf(circle,count.getElementsByClassName('current')[0]);
			index++;
			index >= aImg.length && (index = 0);
			show(index);
		},5000);
	}
	autoPlay();//应用
	//图片切换，淡入淡出效果
	function show(index){
		var alpha = 0;
		var fralpha=100;
		var len=circle.length;
		for(var i=0;i<len;i++){
			circle[i].className = "";
			circle[index].className = "current";
			clearInterval(timer);
		}

		//设置动画函数，实现不管怎么点击轮播图，都会有渐变切换
		timer = setInterval(function(){
			var op=0;
			for(var i=0;i<len;i++){
				op=aImg[i].style.opacity;
				if(i!=index&&op>0){
					aImg[i].style.opacity-=0.02;
					aImg[i].className="slideone";
					if(aImg[i].style.opacity<0) aImg[i].style.opacity=0;
				}
			}
			alpha +=alpha>=100?0:2;
			alpha > 100 && (alpha = 100);
			aImg[index].style.opacity = alpha / 100;
			aImg[index].className = "slideone current";
			alpha === 100&&fralpha===0 &&clearInterval(timer);
		},20);

	}
	//获取元素在数组中的index
	function indexOf(arr, item) {
		var j = -1, i = 0;
		// if (!Array.isArray(arr)) return -2;
		for (;i<arr.length; i++) {
			if (arr[i] == item) {
				return i;
			}
		}
		return j;
	}

	//轮播图结束

})();

//窗口大小变化的时候，改变登录框和视频播放框的位置，使之保持水平垂直居中
window.onresize=function(){
	var logindiv=document.getElementById('login');
	var windowwidth=document.documentElement.clientWidth;//浏览器宽度
	var windowheight=document.documentElement.clientHeight;//浏览器高度
	//登录框位置
	logindiv.style.top=(windowheight/2-195>0)?(windowheight/2-195+'px'):0;
	logindiv.style.left=(windowwidth/2-145>0)?(windowwidth/2-145+'px'):0;
	//视频播放位置
	videoplay.style.top=(windowheight/2-300>0)?(windowheight/2-300+'px'):0;
	videoplay.style.left=(windowwidth/2-475>0)?(windowwidth/2-475+'px'):0;
}


//独立封装ajax函数
function ajax(obj) {
	var xhr = createXHR();
	// obj.url = obj.url + '?rand=' +Math.random();
	obj.data = params(obj.data);
	if(obj.method === "get") obj.url += obj.url.indexOf("?") == -1 ? "?"  + obj.data : "&" + obj.data;

	if(obj.async === true) {
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				callback();
			}
		};
	}

	xhr.open(obj.method,obj.url,obj.async);
	if(obj.method === "post") {
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(obj.data);
	} else {
		xhr.send(null);
	}
	if(obj.async === false) {
		callback();
	}
	//回调函数，xhr请求发送成功就调用success函数
	function callback() {
		if(xhr.status == 200) {
			obj.success(xhr.responseText); //回调传递参数
		} else {
			alert("获取数据出错！错误代码：" + xhr.status + "，状态信息：" + xhr.statusText);
		}
	}
	function params(data){
		var arr=[];
		for(var i in data){
			arr.push(encodeURIComponent(i)+"="+encodeURIComponent(data[i]));
		}
		return arr.join("&");
	}

	//独立封装xhr的创建函数，保证兼容性
	function createXHR() {
		if(typeof XMLHttpRequest != "undefined") {
			return new XMLHttpRequest();
		} else if(typeof ActiveXObject != "undefined") {
			var version = [
				"MSXML2.XMLHttp.6.0",
				"MSXML2.XMLHttp.3.0",
				"MSXML2.XMLHttp"
			];
			for(var i = 0; version.length; i++) {
				try {
					return new ActiveXObject(version[i]);
				} catch(e) {
					//跳过
				}
			}
		} else {
			throw new Error("您的系统或浏览器不支持XHR对象！");
		}
	}


}

//设置cookie时间
function setCookieTime(second){
	var date=null;
	if(typeof second == "number" && second>0){
		date =new Date();
		date.setDate(date.getSeconds()+second);
	}else{
		throw new Error("计时方式为秒，请传入秒数。");
	}
	return date;
}

// 存储cookie
function setCookie(name,value,expires,path,domain,secure){
	var cookieName = encodeURIComponent(name)+ "=" + encodeURIComponent(value);
	if(expires instanceof Date){
		cookieName += ";expires=" + expires;
	}
	if(path instanceof Date){
		cookieName += ";path=" + path;
	}
	if(domain instanceof Date){
		cookieName += ";domain=" + domain;
	}
	if(secure instanceof Date){
		cookieName += ";secure";
	}
	document.cookie=cookieName;
}

//获取Cookie
function getCookie(name){
	var cookieName = encodeURIComponent(name) + "=";
	var cookieStart = document.cookie.indexOf(cookieName);
	var cookieValue;
	if(cookieStart > -1){
		var cookieEnd = document.cookie.indexOf(";",cookieStart);
		if(cookieEnd == -1){
			cookieEnd = document.cookie.length;
		}
		cookieValue=decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length,cookieEnd));
	}
	return cookieValue;
};




