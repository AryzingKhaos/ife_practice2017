$(function(){
	var content="";//存储硬件信息
	var config=$('.config');
	var ajax_data=[];
	var imgnum=1;

	$.ajax({
        type: 'GET',
        url: 'http://172.18.90.70/act/download.html',//需要修改
        dataType: 'html',
        success: function (data) {
            console.log(data);
            ajax_data =  eval("(" + data + ")");
            $('.btnadr').attr("href",ajax_data['download_link'].android);
            // $('.btnios').attr("href",ajax_data['download_link'].ios);
            content="发布日期："+ajax_data['info'].date+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;版本号："+ajax_data['info'].version+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文件大小："+ajax_data['info'].size+"<br>支持系统： "+ajax_data['info'].system+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MD5值："+ajax_data['info'].md5;
            config.html(content);
            var content2="";
            var contdot="";
            // console.log(ajax_data['images'][0]);
            imgnum=ajax_data['images'].length;
            for(var i=0;i<ajax_data['images'].length;i++){
            	if(i==0){
            		content2+='<div class="swimgone cur"><img src="'+ajax_data['images'][i]+'" alt="" style="width:980px;height:435px;"></div>';
            		contdot+='<a href="javascript:;" class="swdotone cur"></a>'
            	}else{
            		content2+='<div class="swimgone"><img src="'+ajax_data['images'][i]+'" alt="" style="width:980px;height:435px;"></div>';
            		contdot+='<a href="javascript:;" class="swdotone"></a>'
            	}
            }
            $('.swimgdivscroll').html(content2);
            $('.swdot').html(contdot);

		    //轮播图
			var swimgdivscroll=$('.swimgdivscroll');
			swimgdivscroll.css("width",imgnum*980);
			var nowimg=1;
			console.log(imgnum);
			var timer;
			createtimer();
			//轮播图按钮点击事件
			$('.swdotone').click(function(){
				var index=$(this).index();
				$('.swdotone').eq(index).addClass('cur').siblings().removeClass('cur');
				nowimg=index+1;
				clearInterval(timer);
				swimgdivscroll.animate({marginLeft:0-(nowimg-1)*980},500,function(){
				});
				createtimer();
			});
			$('.swimgdivscroll').hover(function(){
				clearInterval(timer);
			},function(){
				createtimer();
			});

			//轮播图的滚动函数
			function createtimer(){
				timer=setInterval(function(){
					if(nowimg<imgnum){
						// console.log(nowimg);
						$('.swdotone').eq(nowimg).addClass('cur').siblings().removeClass('cur');
						swimgdivscroll.animate({marginLeft:0-nowimg*980},500,function(){
							nowimg++;
						});
					}else{
						$('.swdotone').eq(0).addClass('cur').siblings().removeClass('cur');
						swimgdivscroll.animate({marginLeft:0},500,function(){
							nowimg=1;
						});
					}
				},1500);
			}

        }
    });


	//微信二维码图
	$('.follow-wx').hover(function(){
		$(this).siblings('.weqrcode').fadeIn();
	},function(){
		$(this).siblings('.weqrcode').fadeOut();
	});

	$('.btnreadme').click(function(){
		$('.mask').show();
		$('.popbox').show();
		$('#scrollbar1').tinyscrollbar();
	});
	$('.closebtn').click(function(){
		$(this).parent().hide();
		$('.mask').hide();
	});

});




