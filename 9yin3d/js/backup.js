//首屏之外的所有点击弹框按钮封装函数
	function clickpopbox(obj){
		console.log(obj);
		$(obj.clickobj).click(function(){
			$(obj.popbox).show();
			if(!!obj.mask){
				$(obj.mask).show();
			}
			if(!!obj.switchbtn){
				$(obj.switchbtn).addClass(obj.cur).siblings().removeClass(obj.cur);
			}
			if(!!obj.switchdes){
				console.log("yeah");
				$(obj.switchdes).addClass(obj.cur).siblings().removeClass(obj.cur);
			}
		});
		obj.extra(0);
	}

	//所有点击按钮点击事件
	clickpopbox({
		clickobj:'.redflagbtn1',
		popbox:'.popbox1',
		switchbtn:'.popbox1 .btnlit1',
		switchdes:'.popbox1 .popdes1',
		mask:'.mask',
		cur:"cur",
		extra:function(index){return;}
	});
	clickpopbox({
		clickobj:'.redflagbtn2',
		popbox:'.popbox1',
		switchbtn:'.popbox1 .btnlit2',
		switchdes:'.popbox1 .popdes2',
		mask:'.mask',
		cur:"cur",
		extra:function(index){return;}
	});