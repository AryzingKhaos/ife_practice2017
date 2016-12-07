(function(){
	// var list1=$('.scrolllist1 li');
	// var len1=list1.length;
	// var scroll1=$('.scroll1');
	// if(len1>11){
	// 	scrollanimotion(scroll1,list1,-53);
	// }
	scrollobj(1,11,-53);
	scrollobj(2,11,-53);
	var list3=$('.ul3 .textpac1 span');
	var len3=list3.length;
	var scroll3=$('.text1');
	console.log(len3,scroll3);
	if(len3>24){
		scrollAnimotionSpan(scroll3,list3,-44);
	}
	var list32=$('.ul3 .textpac2 span');
	var len32=list32.length;
	var scroll32=$('.text2');
	if(len32>24){
		scrollAnimotionSpan(scroll32,list32,-44);
	}
	scrollobj(4,7,-84);
	scrollobj(5,7,-84);
	scrollobj(6,7,-84);
	scrollobj(7,7,-84);
	scrollobj(8,7,-84);
	scrollobj(9,7,-84);
})();

function scrollobj(scrollnum,scrollmax,scrollpx){
	var list=$('.ul'+scrollnum+' li');
	var len=list.length;
	var scroll=$('.scroll'+scrollnum);
	if(len>scrollmax){
		scrollAnimotion(scroll,list,scrollpx);
	}
}

function scrollAnimotion(scroll,list,scale){
	var i=0;
	var nows=scroll.children("li").get(0);
	// console.log(nows);
	setInterval(function(){
		scroll.animate({"margin-top":scale},500,function(){
			nows=scroll.children("li").get(0);
			scroll.children("li").get(0).remove();
			scroll.css({'margin-top':'0px'});
			scroll.append(nows);
		});
	},4000);
}


function scrollAnimotionSpan(scroll,list,scale){
	var i=0;
	var chi0,chi1,chi2,chi3;
	setInterval(function(){
		scroll.animate({"margin-top":scale},500,function(){
			chi0=scroll.children("span").get(0);
			chi1=scroll.children("span").get(1);
			chi2=scroll.children("span").get(2);
			chi3=scroll.children("span").get(3);
			console.log(chi0,chi1,chi2,chi3);
			scroll.children("span").get(0).remove();
			scroll.children("span").get(0).remove();
			scroll.children("span").get(0).remove();
			scroll.children("span").get(0).remove();
			scroll.css({'margin-top':'0px'});
			scroll.append(chi0);
			scroll.append(chi1);
			scroll.append(chi2);
			scroll.append(chi3);
		});
	},4000);
}


