$(function(){
    pageIndex=0
    $('html,body').animate({'scrollTop':0},300);
	//视频播放
    var isMove = 0;
    var bgvideo;
    $('.box1 .play').click(function(){
        bgvideo=jwplayer('j-popvideo').setup({
            'flashplayer':  'http://static.woniu.com/script/jwplayer/player.swf',
            'width':    '720',
            'height':   '400',
            'file':     'http://dl.jy3d.woniu.com/2016/11/jy3d.mp4',
            'autostart':true,
            'controls':false
        })
        $('.maskdiv,.pop-video').show();

        // }
        setTimeout(function(){
            isMove=1;
        },1000);
    })



    $('.popboxvideo').on('click','.close',function(){
        $('.popboxvideo,.maskdiv').hide();
        $('.pop-video').html('<span class="close"></span><div id="j-popvideo"></div>');

    })

    $('#j-order').click(function(){
        // $('.pop-order,.maskdiv').show();
        window.open('http://m.jy3d.woniu.com/static/act/web201606/pre/index.html');
    })

    $('#j-down , .dl_2').click(function(){
        $('.pop-down,.mask').show();
    })
    $('.pop-down .close').click(function() {
        $('.pop-down,.mask').fadeOut();
    })

    //滚屏函数
    var isScroll=0,
		pageIndex=0,
		$html= $('html');

	var win_w = $(window).width(),
        win_h = $(window).height();

    if(win_h<900){
        $('.scroll-tip').remove();
    }

    //判断加载的时候屏幕在哪一屏，做对应的显示
	// var scrTop=document.body.scrollTop;
	// // console.log(scrTop);
	// if(scrTop<960+55){
	// 	pageIndex=0;
	// }else if(scrTop<2*960+55&&scrTop>=960+55){
	// 	pageIndex=1;
	// }else if(scrTop<3*960+55&&scrTop>=2*960+55){
	// 	pageIndex=2;
	// }
	// console.log(pageIndex);
	// if(pageIndex==1){
	// 	$('.subnav').fadeIn();
 //        $('.scroll-tip').hide();
	// }else if(pageIndex==2){
	// 	$('.subnav').fadeOut();
	// }

	//屏幕滚动
	$('#scroll').mousewheel(function(event, delta){
		if(isScroll==0){
			isScroll=1;
			setTimeout(function(){
				isScroll=0;
			},800);
			console.log(pageIndex);
			if(delta==-1){
				if(pageIndex<6){
					pageIndex++
					if(pageIndex==0){
						$('html,body').animate({'scrollTop':0},300);
					}
					if(pageIndex==1){
						$('html,body').animate({'scrollTop':55},300);
						$('.subnav').fadeOut();
					}
					if(pageIndex==2){
						$('.subnav').fadeIn();
						$('.scroll-tip').hide();
						$('html,body').animate({'scrollTop':55+960},300);
					}
					if(pageIndex ==3 || pageIndex ==4 || pageIndex ==5){
						$('.navbtn').eq(pageIndex-2).trigger("click");
						return false;

					}
					if(pageIndex==6){
						$('.subnav').fadeOut();

						$('html,body').animate({'scrollTop':55+960*2},300);
					}
				}
	    	}else{
	    		if(pageIndex>0){
	    			pageIndex--;
	    			if(pageIndex==0){
						$('html,body').animate({'scrollTop':0},300);
					}
					if(pageIndex==1){
						$('html,body').animate({'scrollTop':55},300);
						$('.subnav').fadeOut();
					}
					if(pageIndex==5){
						$('.subnav').fadeIn();
						$('html,body').animate({'scrollTop':55+960},300);
					}
					if(pageIndex ==2 || pageIndex ==3 || pageIndex ==4){
						$('.navbtn').eq(pageIndex-2).trigger("click");
						return false;
					}
	    		}
	    	}
            return false;
		}else{
			return false;
		}

    });

	//第二屏点击“更多内容”滚到第三屏
	$('.navbtnmore').click(function(){
		$('html,body').animate({'scrollTop':2*960+55},800);
		pageIndex=2;
		$('.subnav').fadeOut();
		// setTimeout(function(){
  //      		$('.subnav').fadeOut();
  //      		// $('.scroll-tip').fadeOut();
  //      },800);
	});


	//所有点击切换事件封装函数
	function switchbtn(obj){
		$(obj.btnobj).click(function(){
			$(this).addClass(obj.cur).siblings().removeClass(obj.cur);
			var index=$(this).index(obj.btnobj);
			if(!!obj.exindex) index+=obj.exindex;
			if(!!$(obj.swobj)){
				$(obj.swobj).eq(index).addClass(obj.cur).siblings().removeClass(obj.cur);
			}
			obj.extra(index);
		})
	}

	// switchbtn({
	// 	btnobj:'.popbox1 .btndiv .btnlit',//按钮对象
	// 	swobj:'.popbox1 .popdesdiv .popdes',//切换对象
	// 	cur:"cur",//显示/隐藏的class名
	// 	exindex:0,//位移参数，指box相对于btn的相对位移量。
	// 	extra:function(index){return;}//回调函数
	// });
	switchbtn({
		btnobj:'.popbox5 .btndiv .btnbig',
		swobj:'.popbox5 .popdesdiv .popdes',
		cur:"cur",
		exindex:0,
		extra:function(index){return;}
	});
	switchbtn({
		btnobj:'.popbox6 .btndiv .btnbig',
		swobj:'.popbox6 .popdesdiv .popdes',
		cur:"cur",
		exindex:0,
		extra:function(index){return;}
	});

	//所有关闭按钮的函数
	$('.closebtn').click(function(){
		$(this).parent().hide();
		// $(this).parent().removeClass('cur');
		$('.mask').hide();
	});

	//第二屏滚屏函数
	var index=0,navbtncurindex=0,isClick=0;
	var screenwidth=document.body.clientWidth;//屏幕宽度
	$('.secswpdiv').css("width",screenwidth+"px");
	$(window).resize(function() {
		screenwidth=document.body.clientWidth;
		$('.secswpdiv').css("width",screenwidth+"px");
		navbtncurindex=$('.navbtn.cur').index('.navbtn');
		var sec=$('.secswpdiv');
		if(!!sec[navbtncurindex-1]){
			sec[navbtncurindex-1].style.left=0-screenwidth+"px";
		}
		if(!!sec[navbtncurindex]){
			sec[navbtncurindex].style.left=0;
		}
		if(!!sec[navbtncurindex+1]){
			sec[navbtncurindex+1].style.left=screenwidth+"px";
		}
	});
	$('.navbtn').click(function(){
		if(isClick==0){
			isClick=1;
			setTimeout(function(){
				isClick=0;
			},500);
			navbtncurindex=$('.navbtn.cur').index('.navbtn');
			// console.log(navbtncurindex);
			index=$(this).index('.navbtn');
            pageIndex=index+2;
			// console.log(index);
			var sec=$('.secswpdiv');
			if(!$(sec[index]).is(":animated")&&!$(sec[navbtncurindex]).is(":animated")){
				$(this).addClass('cur').siblings().removeClass('cur');
			}
			//第二屏-第四页 视频播放
			if(index==3){
				if(!!document.createElement('video').canPlayType){
					$('#sec4video').get(0).play();
				}


			}else{
				if(!!document.createElement('video').canPlayType){
					$('#sec4video').get(0).pause();
				}

			}


			// console.log(sec[index]);
			if(index>navbtncurindex){
				if(!$(sec[index]).is(":animated")&&!$(sec[navbtncurindex]).is(":animated")){
					// sec[index].style.left=screenwidth+"px";
					$(sec[index]).css("left",screenwidth+"px");
					$(sec[index]).addClass("cur");
					$(sec[index]).animate({left:"0"},500);
					$(sec[navbtncurindex]).animate({left:0-screenwidth+"px"},500,function(){
						$(sec[index]).siblings().removeClass("cur");
					});
				}
				sec[navbtncurindex].style.left=0+"";
			}else if(index<navbtncurindex){
				if(!$(sec[index]).is(":animated")&&!$(sec[navbtncurindex]).is(":animated")){
					$(sec[index]).css("left",0-screenwidth+"px");
					// sec[index].style.left=0-screenwidth+"px";
					$(sec[index]).addClass("cur");
					$(sec[index]).animate({left:"0"},500);
					$(sec[navbtncurindex]).animate({left:screenwidth+"px"},500,function(){
						$(sec[index]).siblings().removeClass("cur");
					});
				}
				sec[navbtncurindex].style.left=0+"";
			}
		}
	});

	$('.sec4video').hide();
	if(!!document.createElement('video').canPlayType){
		$('.sec4video').show();
		$('#sec4video').eq(0).on('ended',function(){
			$('.sec4video').hide();
		})
	}

	//第二屏 第三页 左右箭头
	$('.arr').click(function(){
		$('.weapon').toggle('cur');
	});

	//弹窗
/*	$('.popbtn1').click(function(){
		var index = $(this).index('.popbtn1');
		$('.popbox1').eq(index).show();
	})
	$('.popbtn2').click(function(){
		var index = $(this).index('.popbtn2');
		$('.popbox2').eq(index).show();
	})*/

});
(function () {
    var URL = window.location.href;
    var _body = $('body'),
        _window = $(window),
        _height = $(window).height(),
        _width = $(window).width();
    var index = 0;

    var ajax_data = [];
    var ajax_url = [];
    var oPopup_txt1 = $('#popup-txt1'),
        oPopup_txt2 = $('#popup-txt2');
    $.ajax({
        type: 'GET',
        url: 'http://jy3d.woniu.com/act/1611_popbox/data.html',
        dataType: 'html',
        success: function (data) {
            console.log(data);
            ajax_data =  eval("(" + data + ")");
            $.each(ajax_data,function (i,n) {
                console.log(i,n.url);
                ajax_url[i] = n.url;
            });
        }
    });
    $('.popup').on('click','.close, .layer',function () {
        $('.popup').fadeOut();
        _body.removeAttr('onmousewheel');
    });
    oPopup_txt2.on('click', '.tab span',function () {
        $('#popup-txt2 .tab span').removeClass('active');
        $(this).addClass('active');
        $('#popup-txt2 .box').removeClass('show');
        $('#popup-txt2 .box').eq($(this).index()).addClass('show');
    });
    //跨服多人竞技
    $('.box2 .redflagbtn1').click(function () {
        console.log(ajax_url)
        oPopup_txt1.find('.wrap').load(ajax_url[3],function () {
            popup_fadeIn(oPopup_txt1);
        });
    });
    $('.box2 .redflagbtn2').click(function () {
        oPopup_txt1.find('.wrap').load(ajax_url[4],function () {
            popup_fadeIn(oPopup_txt1);
        });
    });
    $('.box2 .yelflagbtn1').click(function () {
        oPopup_txt1.find('.wrap').load(ajax_url[5],function () {
            popup_fadeIn(oPopup_txt1);
        });
    });
    $('.box2 .yelflagbtn2').click(function () {
        oPopup_txt1.find('.wrap').load(ajax_url[6],function () {
            popup_fadeIn(oPopup_txt1);
        });
    });
    $('.box3btn').click(function () {
        oPopup_txt1.find('.wrap').load(ajax_url[7],function () {
            popup_fadeIn(oPopup_txt1);
        });
    });
    $('.box2').on('click','.weapontext1',function () {
        oPopup_txt1.find('.wrap').load(ajax_url[8],function () {
            popup_fadeIn(oPopup_txt1);
        });
    });
    $('.box2').on('click','.weapontext2',function () {
        oPopup_txt1.find('.wrap').load(ajax_url[9],function () {
            popup_fadeIn(oPopup_txt1);
        });
    });
    $('.box2').on('click','.secsw4 .tag2',function () {
        oPopup_txt2.find('.box').eq(0).load(ajax_url[0],function () {
            $('#popup-txt2 .tab span').removeClass('active');
            $('#popup-txt2 .tab span').eq(0).addClass('active');
            $('#popup-txt2 .box').removeClass('show');
            $('#popup-txt2 .box').eq(0).addClass('show');
            popup_fadeIn(oPopup_txt2);
        });
        oPopup_txt2.find('.box').eq(1).load(ajax_url[1]);
        oPopup_txt2.find('.box').eq(2).load(ajax_url[2]);
    });
    $('.box2').on('click','.secsw4 .tag1',function () {
        oPopup_txt2.find('.box').eq(0).load(ajax_url[0]);
        oPopup_txt2.find('.box').eq(1).load(ajax_url[1],function () {
            $('#popup-txt2 .tab span').removeClass('active');
            $('#popup-txt2 .tab span').eq(1).addClass('active');
            $('#popup-txt2 .box').removeClass('show');
            $('#popup-txt2 .box').eq(1).addClass('show');
            popup_fadeIn(oPopup_txt2);
        });
        oPopup_txt2.find('.box').eq(2).load(ajax_url[2]);
    });
    $('.box2').on('click','.secsw4 .tag3',function () {
        oPopup_txt2.find('.box').eq(0).load(ajax_url[0]);
        oPopup_txt2.find('.box').eq(1).load(ajax_url[1]);
        oPopup_txt2.find('.box').eq(2).load(ajax_url[2],function () {
            $('#popup-txt2 .tab span').removeClass('active');
            $('#popup-txt2 .tab span').eq(2).addClass('active');
            $('#popup-txt2 .box').removeClass('show');
            $('#popup-txt2 .box').eq(2).addClass('show');
            popup_fadeIn(oPopup_txt2);
        });
    });
    $('.box3').on('click','.box3btnone1',function () {
        oPopup_txt1.find('.wrap').load(ajax_url[10],function () {
            popup_fadeIn(oPopup_txt1);
        });
    });
    $('.box3').on('click','.box3btnone2',function () {
        oPopup_txt1.find('.wrap').load(ajax_url[11],function () {
            popup_fadeIn(oPopup_txt1);
        });
    });
    $('.box3').on('click','.box3btnone3',function () {
        oPopup_txt1.find('.wrap').load(ajax_url[12],function () {
            popup_fadeIn(oPopup_txt1);
        });
    });
    function popup_fadeIn(ele) {
        ele.fadeIn();
        _body.css('overflow', 'hidden');
    }
})();

(function () {
    $('#btn-gift').click(function() {
        $('.gift,.mask').show();
    });
    $('.select').click(function() {
        var serverId = $('#server').val();
        reqJsonp('http://gwactv2.woniu.com/jy3d/h160817/award', {
            server_id: serverId
        }).done(function(redata) {
            if (redata.msgcode == 1) {
                $('.pop.gift,.server').hide();
                $('.success').fadeIn();
            } else {
                alert(redata.msg);
            }
        })
    })
    $('.get-btn').click(function() {
        var cookie = document.cookie;
        var hasCookie = cookie.match(/GWP_PassportUsername/gi);
        if (hasCookie) {
            $('.pop.gift').fadeOut();
            $('.server').fadeIn();
        } else {
            $('#wnGlobalLogin').trigger('click');
        }
    });
    $('.pop .close,.pop .sure').click(function() {
        $('.pop,.mask').hide();
    });
    reqJsonp('http://gwactv2.woniu.com/jy3d/h160816/getarealist', {}).done(function(redata) {
        var s = "",
            ss = "";
        // 屏蔽某些测试服，后期需要修改
        $.each(redata, function(index, ele) {
            s += '<option value="' + index + '">' + ele.areaname + '</option>';
        })

        $.each(redata[0]['server_list'], function(index, ele) {
            ss += '<option value="' + ele.id + '">' + ele.name + '</option>';
        })

        $('#area').html(s);
        $('#server').html(ss);
        $('#area').change(function() {
            var index = $('#area').val();
            ss = "";
            $.each(redata[index]['server_list'], function(index, ele) {
                ss += '<option value="' + ele.id + '">' + ele.name + '</option>';
            })
            $('#server').html(ss);
        })
    });

    function reqJsonp(url, data) {
        return $.ajax({
            type: "get",
            url: url,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            data: data
        });
    };
})();