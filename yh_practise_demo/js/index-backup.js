//切换事件
//职业切换事件

// function switchbtn(obj){
// 	console.log(obj.swdiv);
// 		var len=obj.btn.length;
// 		var len2=obj.swdiv.length;
// 		if(len!=len2) return;
// 		for(var i=0;i<len;i++){
// 			(function(){
// 				var t=i;
// 				obj.btn[i].click(function(){
// 				for(var j=0;j<len;j++){
// 					obj.btn[j].removeClass(obj.cur);
// 					obj.swdiv[j].removeClass(obj.cur);
// 				}
// 				console.log(t);
// 				obj.btn[t].addClass(obj.cur);
// 				obj.swdiv[t].addClass(obj.cur);
// 				});
// 			})();
// 		}
// 	}


// function switchbtn(obj){
// 	console.log(obj.swdiv);
// 	var len=obj.btn.length;
// 	var len2=obj.swdiv.length;
// 	if(len!=len2) return;
// 	obj.btn.each(function(){
// 		$(this).click(function(){
// 			var t=$(this).index();
// 			console.log(t);
// 			obj.btn[t].addClass(obj.cur).siblings().removeClass('cur');
// 			obj.swdiv[t].addClass(obj.cur).siblings().removeClass('cur');
// 		})
// 	})
	
// }

// $('.jobbtn').click(function(){
// 	$(this).addClass('cur').siblings().removeClass('cur');
// })


// switchbtn({
// 	btn:[$('.jobbtn.jobbtn2'),$('.jobbtn.jobbtn1')],
// 	swdiv:[$('.jobbox.job1'),$('.jobbox.job2')],
// 	cur:"cur"
// });


// switchbtn({
// 	btn:[$('.intrjob1'),$('.intrjob2')],
// 	swdiv:[$('.intro .cont1'),$('.intro .cont2')],
// 	cur:"cur"
// });

// switchbtn({
// 	btn:[$('.intrjob3'),$('.intrjob4')],
// 	swdiv:[$('.intro .cont3'),$('.intro .cont4')],
// 	cur:"cur"
// });

// $('a').click(function(){
// 	$(this).attr("style","border:1px solid #fff");
// });



//获取元素绝对位置  
function getAbsPosition(element)  
{  
    var abs={x:0,y:0}  
    //如果浏览器兼容此方法  
    if (document.documentElement.getBoundingClientRect)   
    {               
        //注意，getBoundingClientRect()是jQuery对象的方法  
        //如果不用jQuery对象，可以使用else分支。  
        abs.x = element.getBoundingClientRect().left;           
        abs.y = element.getBoundingClientRect().top;  
          
        abs.x += window.screenLeft +    
                    document.documentElement.scrollLeft -              
                    document.documentElement.clientLeft;  
        abs.y += window.screenTop +    
                    document.documentElement.scrollTop -    
                    document.documentElement.clientTop;  
          
    }   
    //如果浏览器不兼容此方法  
    else  
    {  
        while(element!=document.body)  
        {  
            abs.x+=element.offsetLeft;  
            abs.y+=element.offsetTop;  
            element=element.offsetParent;  
        }  
          
     //计算想对位置  
     abs.x += window.screenLeft +   
            document.body.clientLeft - document.body.scrollLeft;  
     abs.y += window.screenTop +   
            document.body.clientTop - document.body.scrollTop;  
    }
    return abs;  
}  

// $.extend({
// 	totop:function(){
// 		$(this).animate({scrollTop: 0}, 500);
// 	}
// })
$.fn.totop=function(){
	// console.log(this);
	var anithis=this;
	// $(this).animate({scrollTop: 0}, 500);
	var sctop=$(window).scrollTop();
	// console.log($('#j-wn-gamehead').offsetTop);
	console.log(getAbsPosition(document.getElementById('j-wn-gamehead')));

	$('html').mousewheel(function(event,delta){
		sctop=$(window).scrollTop();
		// console.log(sctop);
		if(sctop<=55){
			anithis.style.top=sctop+'px';
		}else{
			anithis.style.top=0;
		}
	});
	// this.animate({top: "0px"}, 500);
	return this;
}