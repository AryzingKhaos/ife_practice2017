$(function(){
    //出现动画(主slogan的动画用的)
	var title2=$(".title2");
	title2.delay(1400);
	title2.animate({marginTop:"0",opacity:"1"},400);
	var qqbtn=$(".qqbtn");
	qqbtn.delay(1600);
	qqbtn.animate({marginTop:"0",opacity:"1"},400);


    var bgaudio=$('#bg-audio').get(0);
	$('.bgmusic').click(function(){
		if($(this).hasClass("active")){
			bgaudio.pause();
		}else{
			bgaudio.play();
		}
		$(this).toggleClass("active");
	})

    var localUrl = window.location.href;

    var qrcode;
    // 清除上一次的二维码
    if(qrcode){
        qrcode.clear();
    }
    // 创建二维码
    qrcode = new QRCode(document.getElementById("qrcode"), {
        width : 158,//设置宽高
        height : 158
    });

    qrcode.makeCode(localUrl);

    $('.weixin').click(function(event) {
        $('.qrcode-pop').fadeIn();
    });
    
    $('.p-close').click(function(event) {
        $('.qrcode-pop').fadeOut();
    });
});

//share
;(function() {
        var shareconf = {
            title: '2017年蜗牛旗舰手游悬念站-创新超越极致，品质一脉相承',
            url: window.location.href,
            desc: '蜗牛游戏2017旗舰级新游悬念站今日神秘上线！给你更大、更高、更真实的世界！官方QQ讨论群：312445961',
            pic: 'http://tt2.woniu.com/static/web201607/images/share.jpg'
        };
        var qzone = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(shareconf.url) + '&title=' + shareconf.title + '&pics=' + shareconf.pic + '&summary=' + shareconf.desc;

        var sinaurl = 'http://service.weibo.com/share/share.php?title=' + shareconf.desc + '&url=' + encodeURIComponent(shareconf.url) + '&source=bookmark&pic=' + shareconf.pic;

        var qqurl = 'http://connect.qq.com/widget/shareqq/index.html?url=' + encodeURIComponent(shareconf.url) + '&desc=' + shareconf.desc + '&title=' + shareconf.title + '&summary=&pics=' + shareconf.pic + '&flash=&site=&style=201&width=32&height=32&showcount=';

        $('.weibo').attr('href', sinaurl);
        $('.qq').attr('href', qqurl);
        $('.qzone').attr('href', qzone);
})();




