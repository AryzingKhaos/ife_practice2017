
(function(){
//
//问题
//
//播放视频结束后没有自动回来
//

var scrollNowPage=1;
$("#intrvideo").get(0).muted=false;//初始化视频的muted值为false

//skip跳过播放按钮
var intrvideo=$("#intrvideo").get(0);

//停止播放视频
function intrvideostop(){
    console.log(intrvideo.currentTime);
    intrvideo.pause();
    intrvideo.currentTime=0;
    $("#intrvideo").hide();
    $(".page1main").fadeIn();
    $(".dlmsg2").fadeOut();
}

//停止播放
function intrvideoplay(){
    $("#intrvideo").show();
    intrvideo.play();
    $(".page1main").fadeOut();
    $(".dlmsg2").fadeIn();
}

//暂停播放视频
function intrvideopause(){
    intrvideo.pause();
    $(".page1main").fadeOut();
    $(".dlmsg2").fadeIn();
}

//自动播放视频
intrvideoplay();
//跳过按钮
$("#skip").click(intrvideostop);
//重播按钮
$("#replay").click(intrvideoplay);


if(intrvideo.currentTime>=34.688){
    intrvideostop();
}

//关闭音乐按钮
$("#sndstop").click(function(){
    var $sndstop=intrvideo.muted;
    if(!$sndstop){
        intrvideo.muted=true;
    }else{
        intrvideo.muted=false;
    }
})

function scrollpage(index){
        if(index==0){

            $('.left').animate({top:"55px"},200);
            $('html, body').animate({scrollTop: 0}, 500,function(){
                $('.page').eq(index).addClass('cur').siblings().removeClass('cur');
            });
             $('.left').animate({"left":"-300px"},500,function(){
                $('.left').addClass('fold');
            });
            if(intrvideo.currentTime!=0){
                intrvideoplay();//假如当前视频进度不为0，那么播放视频
            }
        }else{
            if(intrvideo.currentTime!=0){
                intrvideopause();//视频暂停
            }
            $('.left').animate({"left":"0px"},500,function(){
                $('.left').removeClass('fold');
            });
            $('html, body').animate({scrollTop: index*1000+55}, 500,function(){
                $('.page').eq(index).addClass('cur').siblings().removeClass('cur');
            });

        }
        $('.scrollcontent a').removeClass('cur').eq(index).addClass('cur');
    }

var sTop= $(window).scrollTop();
var screenStep = 0;
	if(sTop>=1055 && sTop<2055 ){
	    $('.left').addClass('totop');
	    screenStep=1;
	    scrollpage(screenStep);
	}else if(sTop>=2055 && sTop<3055 ){
	    $('.left').addClass('totop');
	    screenStep=2;
	    scrollpage(screenStep);
	}else if(sTop>=3055 && sTop<3210 ){
	    $('.left').addClass('totop');
	    screenStep=3;
	    scrollpage(screenStep);
	}else if(sTop>=3210 ){
	    $('.left').addClass('totop');
	    screenStep=4;
	    scrollpage(screenStep);
	}else{
	    $('.left').removeClass('totop');
	}

//侧边栏的hover效果
$('#leftnav').mouseenter(function(){
    $(this).animate({"left":"0px"},200);
});
$('#leftnav').mouseleave(function(){
    if(screenStep==0){
        $(this).animate({"left":"-300px"},200);
    }
});

//鼠标滚动事件
$('html').mousewheel(function(event,delta){
   
	if(delta<0){//向下滚
		if(!$(this).is(':animated') && screenStep ==0){
                screenStep++;
                scrollpage(screenStep);
            }
            if(!$(this).is(':animated') && screenStep == 1){
                screenStep++;
                scrollpage(screenStep);
            }
            if(!$(this).is(':animated') && screenStep == 2){
                screenStep++;
                scrollpage(screenStep);
            }
            if(!$(this).is(':animated') && screenStep == 3){
                screenStep++;
                scrollpage(screenStep);
                // $('.downtip').fadeOut();
            }
            return false;
	}else{
		if(!$(this).is(':animated') && screenStep == 4){
                screenStep--;
                scrollpage(screenStep)
                // $('.downtip').fadeIn();
            }
            if(!$(this).is(':animated') && screenStep == 3  ){
                 screenStep--;
                scrollpage(screenStep)
                 
            }
            if(!$(this).is(':animated') && screenStep == 2){
                screenStep--;
                scrollpage(screenStep)
            }
            if(!$(this).is(':animated') && screenStep == 1){
                screenStep--;
                scrollpage(screenStep)
            }
            return false;
	}
});


//page2轮播图封装函数
function switchbanner(obj){
	var index=0;
	if(!!$(obj.swdot)){
		$(obj.swdot).click(function(){
			$(this).addClass(obj.cur).siblings().removeClass(obj.cur);
			index=$(this).index();
			$(obj.swdiv).eq(index).addClass(obj.cur).siblings().removeClass(obj.cur);
		})
	}
	//向前按钮
	if(!!$(obj.prebtn)){
		$(obj.prebtn).click(function(){
			//通过判断当前对象的上一个对象长度是否大于0（就是判断这个对象是否存在），来决定preitem等于下一个元素还是等于最后一个元素
			var $preitemdiv=($(obj.swdiv+"."+obj.cur).prev(obj.swdiv).length>0)
				?($(obj.swdiv+"."+obj.cur).prev(obj.swdiv))
				:($(obj.swdiv+"."+obj.cur).parent().children(obj.swdiv).last());
			var $preitemdot=($(obj.swdot+"."+obj.cur).prev(obj.swdot).length>0)
				?($(obj.swdot+"."+obj.cur).prev(obj.swdot))
				:($(obj.swdot+"."+obj.cur).parent().children(obj.swdot).last());
			$preitemdiv.addClass(obj.cur).siblings().removeClass(obj.cur);
			$preitemdot.addClass(obj.cur).siblings().removeClass(obj.cur);
		});
	}
	//向后按钮
	if(!!$(obj.nextbtn)){
		$(obj.nextbtn).click(function(){
			var len=$(obj.swdiv).length;
			//通过判断当前对象的下一个对象长度是否大于0（就是判断这个对象是否存在），来决定nextitem等于下一个元素还是等于第一个元素
			var $nextitemdiv=($(obj.swdiv+"."+obj.cur).next(obj.swdiv).length>0)
				?($(obj.swdiv+"."+obj.cur).next(obj.swdiv))
				:($(obj.swdiv+"."+obj.cur).parent().children(obj.swdiv).first());

			var $nextitemdot=($(obj.swdot+"."+obj.cur).next(obj.swdot).length>0)
				?($(obj.swdot+"."+obj.cur).next(obj.swdot))
				:($(obj.swdot+"."+obj.cur).parent().children(obj.swdot).first());
			$nextitemdiv.addClass(obj.cur).siblings().removeClass(obj.cur);
			$nextitemdot.addClass(obj.cur).siblings().removeClass(obj.cur);
		});
	}
	obj.extra(index);
}

//page2banner切换
switchbanner({
	swdot:'.sellpointdot',//swdot是切换banner的圆点的类名
	swdiv:'.sellpointli',//swdiv是切换的banner图的类名
	prebtn:'.sellpointprebtn',//向前按钮的类名
	nextbtn:'.sellpointnextbtn',//向后按钮的类名
	isautoplay:false,//是否自动轮播（因为动画效果还没写，所以这个属性是没用的）
	cur:"cur",//current类名
	extra:function(index){return;}//额外要做的事情的函数，可以外部定制。这里因为没有额外要做的，所以直接return
})
// console.log($('.sellpointdot').attr('class'));


//所有点击切换事件封装函数
function switchbtn(obj){
	$(obj.jqobj).click(function(){
		$(this).addClass(obj.cur).siblings().removeClass(obj.cur);
		var index=$(this).index(obj.jqobj);
		if(!!obj.exindex) index+=obj.exindex;
		if(!!$(obj.swobj)){
			console.log(index);
			$(obj.swobj).eq(index).addClass(obj.cur).siblings().removeClass(obj.cur);
		}
		obj.extra(index);
	})
}

//所有hover切换事件封装函数，其实跟点击切换函数几乎一模一样。
function switchbtnhover(obj){
    $(obj.jqobj).mouseenter(function(){
        $(this).addClass(obj.cur).siblings().removeClass(obj.cur);
        var index=$(this).index(obj.jqobj);
        if(!!obj.exindex) index+=obj.exindex;
        if(!!$(obj.swobj)){
            console.log(index);
            $(obj.swobj).eq(index).addClass(obj.cur).siblings().removeClass(obj.cur);
        }
        obj.extra(index);
    })
}

//page3两种职业按钮
switchbtn({
	jqobj:'.jobbtn',
	swobj:'.jobbox',
	cur:"cur",
	exindex:0,//位移参数，指box相对于btn的相对位移量。
	extra:function(index){return;}
});

//page3职业介绍1
switchbtn({
	jqobj:'.intrjob01',
	swobj:'.cont01',
	cur:"cur",
	exindex:0,
	extra:function(index){return;}
})

//page3职业介绍2
switchbtn({
	jqobj:'.intrjob02',
	swobj:'.cont02',
	cur:"cur",
	exindex:0,
	extra:function(index){return;}
})

//新闻部分切换
switchbtnhover({
    jqobj:'.lbl',
    swobj:'.newsone',
    cur:"cur",
    exindex:0,//位移参数，指box相对于btn的相对位移量。
    extra:function(index){return;}
});




//动态加载武将内容
var hunsZ = [{
    namealt: '张飞',
    intro: '燕人张翼德在此，谁敢与我决一死战？',
    bt: '震心一击',
    bd: '召唤出张飞武魂，将丈八蛇矛向前方发出猛烈的突击，对敌人造成285%的伤害，蓄力2阶段增加1.9倍伤害，3阶段增加3倍的伤害。',
    gt: '刺心',
    gd: '消耗所有连击点，召唤张飞武魂，向前方发出刺心一击，造成260%+连击点*78%的伤害。'
},{
    namealt: '貂蝉',
    intro: '舞罢隔帘偷目送，不知谁是楚襄王。',
    bt: '恢复旋律',
    bd: '生命力增加15%（数值随武魂等级增加而增加）',
    gt: '恢复旋律',
    gd: '生命力增加15%（数值随武魂等级增加而增加）'
},{
    namealt: '董卓',
    intro: '毕竟英雄谁得似，脐脂自照不须灯',
    bt: '震天动地',
    bd: '跺脚造成周围63%的伤害，并附带1-3s的眩晕效果。',
    gt: '暗器',
    gd: '投掷暗器攻击敌方，造成285%的伤害，增加1连击点。'
},{
    namealt: '甘宁',
    intro: '百翎直贯曹家寨，尽说甘宁虎将才。',
    bt: '击破',
    bd: '向前方快速突破，给予敌人136%的伤害。',
    gt: '死地逃脱',
    gd: '较大范围的伤害后迅速脱逃至后方，增加2连击点，伤害数值为299%。'
},{
    namealt: '公孙瓒',
    intro: '',
    bt: '绝对防御',
    bd: '3秒内无敌，但接下来的6秒内攻击将下降50-0% 。',
    gt: '暴走天使',
    gd: '3秒内攻击力增加25-150%，但是防御力变为0。'
},{
    namealt: '关羽',
    intro: '吾观颜良，如插标卖首尔！',
    bt: '横扫千军',
    bd: '召唤关羽武魂，向前方发出大范围斩击，造成511%的伤害。',
    gt: '旋风斩',
    gd: '消耗所有连击点召唤关羽武魂，发出连续性横扫，造成520%+连击点*34%的伤害。'
},{
    namealt: '黄盖',
    intro: '落帆黄鹤之浦，藏船鹦鹉之洲。',
    bt: '扫射',
    bd: '给予前方敌人90点伤害。',
    gt: '扔叉',
    gd: '扔出鱼叉，造成285%的伤害，快速移动到敌方身前，增加1连击点。'
},{
    namealt: '黄忠',
    intro: '',
    bt: '烈弓',
    bd: '召唤黄忠，在眼睛看不见的情况下快速射出一箭，给予敌人346的伤害。',
    gt: '闪光弓箭',
    gd: '召唤出黄忠，发射极速弓箭，造成346%的伤害 ，并增加2连击点。'
},{
    namealt: '吕布',
    intro: '关外诸侯，布视之如草芥。',
    bt: '无双一跃',
    bd: '跳向前方给予敌人554的伤害。',
    gt: '飞跃审判',
    gd: '消耗全部连击点，跳至前方下劈，造成277%+连击点*83%的伤害。'
},{
    namealt: '吕玲绮',
    intro: '吕布之女，勇武不逊其父矣。',
    bt: '反击',
    bd: '反击姿态，给予命中自身的敌人321点伤害。',
    gt: '凌厉反击',
    gd: '格挡姿势时对施展攻击对象造成 321%的伤害，成功格挡增加2连击点。'
},{
    namealt: '马超',
    intro: '威震西凉立大功，渭桥六战最英雄。',
    bt: '全军突击',
    bd: '大范围内巡回猛烈攻击敌人，每次给予56点伤害。',
    gt: '回旋砍',
    gd: '跳跃后施展回转攻击，对命中敌人造成82%的伤害，并增加2连击点。'
},{
    namealt: '庞德',
    intro: '宁为国家鬼，不为羌贼臣。',
    bt: '挑起摔',
    bd: '将敌人挑起，并向下猛摔，给予113点伤害。',
    gt: '突袭飞腿',
    gd: '快速刺向前方，造成136%的伤害。'
},{
    namealt: '太史慈',
    intro: '临终言壮志，千古共嗟咨。',
    bt: '连环突刺',
    bd: '向前方多次刺击，每次给予86点伤害。',
    gt: '逆转态势',
    gd: '先后退再极速向前方攻击，造成306%的伤害，并增加2连击点。'
},{
    namealt: '文丑',
    intro: '',
    bt: '齐心一击',
    bd: '集气后向前方偷袭，给予285点伤害，蓄力2阶段伤害增加1.9倍，3阶段增加三倍。',
    gt: '十字伤疤',
    gd: '连续上挑2次，造成252%的伤害，并增加2连击点。'
},{
    namealt: '夏侯惇',
    intro: '孤月独明勘比伦，至今功迹照乾坤。',
    bt: '水上漂',
    bd: '3s内移动速度增加50%。',
    gt: '猛冲',
    gd: '向前方快速移动击飞敌人，消耗所有连击点，造成260%+连击点*78%的伤害。'
},{
    namealt: '小乔',
    intro: '东风不与周郎便，铜雀春深锁二乔。',
    bt: '小李飞刀',
    bd: '蓄力后撇掷武器制造142%的伤害，蓄力阶段为2阶段时给予1阶段的1.9倍伤害，3阶段时给予3倍的伤害。',
    gt: '刃之幕',
    gd: '前方召唤无数刀刃，造成54%的伤害，并增加1连击点。'
},{
    namealt: '许褚',
    intro: '凛凛威风镇九州，当年许褚果如虎。只因孟起军前见，天下从兹播虎侯。',
    bt: '旋风斩',
    bd: '召唤虎痴许褚的武魂，给予范围内敌人131点伤害。',
    gt: '愤怒一击',
    gd: '消耗所有连击点，召唤虎痴许褚的武魂给予敌人260%+连击点*78%的伤害。'
},{
    namealt: '颜良',
    intro: '',
    bt: '溅射袭击',
    bd: '袭击前方，对广范围内造成356%的伤害。',
    gt: '死亡之舞',
    gd: '快速挥刀冲向前方，造成131%的伤害，并增加1连击点。'
},{
    namealt: '袁绍',
    intro: '空招俊杰三千客，漫有英雄百万兵。',
    bt: '连续刺',
    bd: '连续三次刺向前方，每次造成128%的伤害。',
    gt: '血之剑舞',
    gd: '快速施展三次攻击，造成63%的伤害，并增加1连击点。'
},{
    namealt: '张辽',
    intro: '才闻乳母低声说，夜静更阑不敢啼。',
    bt: '突袭',
    bd: '先退后再冲向前方给予发散性攻击，每次伤害为90点。',
    gt: '影子跳跃',
    gd: '快速移动一段距离，0.5S内无敌，并增加1连击点。'
},{
    namealt: '赵云',
    intro: '古来冲阵扶危主，只有常山赵子龙。',
    bt: '回旋踢',
    bd: '回旋式攻击，给予命中的敌人136点伤害。',
    gt: '回旋踢',
    gd: '回旋式攻击，给予敌人136%的伤害，并增加1连击点。'
},{
    namealt: '诸葛亮',
    intro: '功盖三分国，名高八阵图。',
    bt: '雷霆万钧',
    bd: '召唤出孔明武魂，对周身大范围内释放闪电攻击，造成299点伤害，蓄力2阶段伤害增加1.9倍，3阶段增加3倍。',
    gt: '大地动荡',
    gd: '消耗所有连击点，较广范围内召唤出强大的闪电，对敌人造成260%+连击点*78%的伤害。'
}];

var hunsB = [{
    namealt: '鲍三娘',
    intro: '',
    bt: '掠夺',
    bd: '击杀敌人后获得的金币增加（数值随等级增加而增加）。',
    gt: '掠夺',
    gd: '击杀敌人后获得的金币增加（数值随等级增加而增加）。'
},{
    namealt: '蔡文姬',
    intro: '十八拍笳休愤切，须知薄命是佳人。',
    bt: '进修',
    bd: '普通攻击会造成额外的33点伤害。',
    gt: '修炼剑术',
    gd: '普通攻击会造成额外18%的伤害。'
},{
    namealt: '大乔',
    intro: '东风不与周郎便，铜雀春深锁二乔。',
    bt: '精神恢复',
    bd: '普通攻击会回复一定量的MP。',
    gt: '精神恢复',
    gd: '普通攻击会回复一定量的MP。'
},{
    namealt: '郭嘉',
    intro: '虽然天数三分定，妙算神机亦可图。若是当时存奉孝，难容西蜀与东吴。',
    bt: '集中精神',
    bd: '对眩晕状态的免疫力提高。',
    gt: '集中精神',
    gd: '对眩晕状态的免疫力提高。'
},{
    namealt: '花鬘',
    intro: '',
    bt: '解毒',
    bd: '对中毒状态免疫力提高。',
    gt: '消化',
    gd: '对中毒状态免疫力提高。'
},{
    namealt: '华佗',
    intro: '诚皆玄妙之殊巧，非常之绝技矣。',
    bt: '青囊针灸',
    bd: '每秒回复一定量的生命值。',
    gt: '青囊针灸',
    gd: '每秒回复一定量的生命值。'
},{
    namealt: '黄月英',
    intro: '孔明之妻，才女之名响彻蜀地。',
    bt: '士气',
    bd: '普通攻击附带震慑效果，降低敌人攻击速度。',
    gt: '精神强化',
    gd: '普通攻击附带额外伤害，随连击点增加而增加。'
},{
    namealt: '贾诩',
    intro: '',
    bt: '精神增加',
    bd: '装备后增加最大MP。',
    gt: '精神增加',
    gd: '装备后增加最大MP。'
},{
    namealt: '敬哀皇后',
    intro: '',
    bt: '血气恢复',
    bd: '普通攻击有一定几率回复HP。',
    gt: '血气恢复',
    gd: '普通攻击有一定几率回复HP。'
},{
    namealt: '陆逊',
    intro: '持矛举火破连营，玄德穷奔白帝城。一旦威名惊蜀魏，吴王宁不敬书生。',
    bt: '熊熊战役',
    bd: 'MP100%情况下，攻击力增加。',
    gt: '熊熊战役',
    gd: 'MP100%情况下，攻击力增加。'
},{
    namealt: '马良',
    intro: '',
    bt: '伤口撕裂',
    bd: '敌方处于流血状态下，普通攻击会附带额外伤害。',
    gt: '伤口撕裂',
    gd: '敌方处于流血状态下，普通攻击会附带额外伤害。'
},{
    namealt: '马云騄',
    intro: '',
    bt: '消火',
    bd: '对灼烧状态免疫力提升。',
    gt: '消火',
    gd: '对灼烧状态免疫力提升。'
},{
    namealt: '南华老仙',
    intro: '著作《太平要术》',
    bt: '觉悟',
    bd: 'HP低于25%时，攻击力增加。',
    gt: '觉悟',
    gd: 'HP低于25%时，攻击力增加。'
},{
    namealt: '庞统',
    intro: '谁知天狗流量坠，不使将军衣锦回。',
    bt: '触电耐性',
    bd: '对感电状态免疫力增加。',
    gt: '触电耐性',
    gd: '对感电状态免疫力增加。'
},{
    namealt: '佟贵妃',
    intro: '',
    bt: '内力心法',
    bd: '每秒持续回复MP。',
    gt: '内力心法',
    gd: '每秒持续回复MP。'
},{
    namealt: '徐庶',
    intro: '片言却似春雷震，能使南阳起卧龙。',
    bt: '止血',
    bd: '对流血状态免疫力增加。',
    gt: '止血',
    gd: '对流血状态免疫力增加。'
},{
    namealt: '周瑜',
    intro: '世间豪杰英雄士，江左风流美丈夫。',
    bt: '士气',
    bd: '攻击生命值低于25%的敌人时，将附加额外伤害。',
    gt: '士气',
    gd: '攻击生命值低于25%的敌人时，将附加额外伤害。'
}];

//js加载所有武将信息
function humandescription(){
	var content="";
	for(var i=1;i<22;i++){
		content='<h2><img src="http://yh.woniu.com/static/web20151106/images/zhudong/names/'+(i+1)+'.png" alt="'+hunsZ[i].namealtalt+'"></h2>\
						<h4>'+hunsZ[i].intro+'</h4>\
						<div class="about">\
							<div class="abnav">\
								<a href="javascript:;" class="sexlink a1 cur">男</a>\
								<a href="javascript:;" class="sexlink a2">女</a>\
							</div>\
							<div class="detail detail1 cur">\
								<img src="http://yh.woniu.com/static/web20151106/images/zhudong/skills/b'+(i+1)+'.png" alt="">\
								<h4>'+hunsZ[i].bt+'</h4>\
								<h5>'+hunsZ[i].bd+'</h5>\
							</div>\
							<div class="detail detail2">\
								<img src="http://yh.woniu.com/static/web20151106/images/zhudong/skills/g'+(i+1)+'.png" alt="">\
								<h4>'+hunsZ[i].gt+'</h4>\
								<h5>'+hunsZ[i].gd+'</h5>\
							</div>\
						</div>\
						<img src="http://yh.woniu.com/static/web20151106/images/zhudong/roles/'+(i+1)+'.png" alt="" class="general">'
		$('.intr.intr'+(i+1)).html(content);
		content="";
	}
	for(var j=0;j<17;j++){
		content='<h2><img src="http://yh.woniu.com/static/web20151106/images/beidong/names/'+(j+1)+'.png" alt="'+hunsB[j].namealt+'"></h2>\
						<h4>'+hunsB[j].intro+'</h4>\
						<div class="about">\
							<div class="abnav">\
								<a href="javascript:;" class="sexlink a1 cur">男</a>\
								<a href="javascript:;" class="sexlink a2">女</a>\
							</div>\
							<div class="detail detail1 cur">\
								<img src="http://yh.woniu.com/static/web20151106/images/beidong/skills/b'+(j+1)+'.png" alt="">\
								<h4>'+hunsB[j].bt+'</h4>\
								<h5>'+hunsB[j].bd+'</h5>\
							</div>\
							<div class="detail detail2">\
								<img src="http://yh.woniu.com/static/web20151106/images/beidong/skills/g'+(j+1)+'.png" alt="">\
								<h4>'+hunsB[j].gt+'</h4>\
								<h5>'+hunsB[j].gd+'</h5>\
							</div>\
						</div>\
						<img src="http://yh.woniu.com/static/web20151106/images/beidong/roles/'+(j+1)+'.png" alt="" class="general">'
		$('.intr.intr'+(j+23)).html(content);
		content="";
	}
}
humandescription();

//page4主动技能 被动技能切换
switchbtn({
	jqobj:'.tec',
	swobj:'.hero',
	cur:"cur",
	exindex:0,
	extra:function(index){return;}
})

//page4男女
switchbtn({
	jqobj:'.sexlink',
	swobj:'.detail',
	cur:"cur",
	exindex:0,
	extra:function(index){return;}
})

//page4主动武将
switchbtn({
	jqobj:'.hero.hero1 a',
	swobj:'.intr',
	cur:"cur",
	exindex:0,
	extra:function(index){return;}
})

//page4被动武将
switchbtn({
	jqobj:'.hero.hero2 a',
	swobj:'.intr',
	cur:"cur",
	exindex:22,
	extra:function(index){return;}
})
})();


//滚动悬浮顶部代码
;(function (){
    var obj11 = document.getElementById("leftnav");
    var top11 = getTop(obj11); 
    var isIE6 = /msie 6/i.test(navigator.userAgent);
    window.onscroll = function(){
        var bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(bodyScrollTop);
        if (bodyScrollTop > top11){
            // obj11.style.position = (isIE6) ? "absolute" : "fixed";
            obj11.style.position = "fixed";
            // obj11.style.top = (isIE6) ? bodyScrollTop + "px" : "0px";
            obj11.style.top = "0px";
        } else {
            // obj11.style.position = "static";
            obj11.style.position = "absolute";
            obj11.style.top="55px";
        }
    }

    function getTop(e){
        var offset = e.offsetTop;
        if(e.offsetParent != null) offset += getTop(e.offsetParent);
        return offset;
    }
})();

