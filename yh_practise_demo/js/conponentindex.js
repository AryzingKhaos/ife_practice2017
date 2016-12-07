/*
create by Luoxz 2016.10.12

 */

(function(){
	///
	///switchbtn函数说明
	///1.传入一个对象。
	///2.对象参数包括：btn(Array)、swdiv(Array)、cur(string)
	///3.对象参数功能如下：
	///	btn:点击切换的对象
	///	swdiv:需要添加焦点的对象
	///	cur:焦点类名
	///
	function switchbtn(obj){
		var len=obj.btn.length;
		var len2=obj.swdiv.length;
		if(len!=len2) return;
		for(var i=0;i<len;i++){
			obj.btn[i].click(function(){
				for(var j=0;j<len;j++){
					obj.btn[i].removeClass(cur);
					obj.swdiv[j].removeClass(cur);
				}
				obj.btn[i].addClass(cur);
				obj.swdiv[i].addClass(cur);
			})
		}
	}

})();


