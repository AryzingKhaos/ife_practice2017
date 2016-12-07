(function($){
	$.fn.Rain = function(options){
		var deflaut = {
			width:400,
			height:1000,
			pic:'water-drop.png',//下雨图片 默认为water-drop.png
			speed:1000,          //雨速
			num:100,            //雨滴的密集度
			dir:['right',160],   //雨的飘向 默认为向右飘 雨滴的偏差
			func:function(d){}
		}
		
		options = $.extend(deflaut,options);	
		var self = $(this);
		
		var init = function(t){
			self.css({border:'0px',width:options.width,height:options.height,position:'relative'});
			//创建雨滴
			var _rainO = $('<span class="rain" style="display:block;width:25px;height:25px; background:none; position:absolute; top:0px;"><img src="'+options.pic+'" style="width:100%;" /></span>');

            //获取雨滴范围_h,_w
			var _h = self.height();
			var _w = self.width()-parseInt(options.dir[1]);
			
			//规定容器宽度范围内随机生成雨滴
			var _r = Math.random()*_w;
			
			//把雨滴加入容器对象内
			self.append(_rainO);
			//雨滴飘落效果
			var dir  = 0;
			if(typeof options.dir[1]=='undefined'||options.dir[1]==""){options.dir[1]=160;}
			if(options.dir[0]=="right"){
				dir = _r+(options.dir[1]);
			}else{
				dir = _r-(options.dir[1]);
			}
			
			_rainO.css({left:_r}).animate({top:_h,left:dir,opacity:'1'},options.speed,function(){$(this).remove();
			return options.func(dir)
			});
			
		}
		
		setInterval(function(){init()},options.num);
	}
})(jQuery);

