/*
* author:wangjia
* date:20160330
*/

$(function(){
    //视频延时2s播放
    var bgMov = $('video')[0];
    var $bigMov = $('video:first');


    if(Modernizr.video){
        $('.skip,.voice').show();
    }

    function playMov(){
        if (Modernizr.video) {
            bgMov.play();
            $('.slogen,.replay').fadeOut();
            // $('.android-order').addClass('folder');
            $('.down').addClass('folder');
        }
        
    }

    function endMov(){
        $bigMov.hide();
        if (Modernizr.video) {
            bgMov.pause();
        }
        $('.slogen,.replay').fadeIn(1000);
        $('.down').removeClass('folder');
    }
    
    
    $('video').eq(0).on('ended',function(){
        endMov();
    })



    $('.replay').click(function(){
        $bigMov.fadeIn();
        if (Modernizr.video) {
            bgMov.load();
            bgMov.play();
            $('.slogen,.replay').fadeOut();
            $('.down').addClass('folder');
        }
    })

    //首屏预约
    // $('.android-order').click(function(){
    //     $('.order').trigger('click'); 
    // })
    
    $('.dl-android').click(function(){
         $('.order').trigger('click'); 
    })


    //跳过&静音
    $('.skip').click(function(){
        endMov();
    })

    var isPlay=1;
    $('.voice').click(function(){
        $(this).toggleClass('voice-stop');
        if(isPlay==1){
            bgMov.muted=true;
            isPlay=0;
        }else{
            bgMov.muted=false;
            isPlay=1;
        }
        
    })



    //滚屏函数
    function scrollpage(index){
        if(index==0){
            $('.skip,.voice').show();
            if(Modernizr.video && $bigMov.is(':visible')){
                $('video')[0].play();
            }
            
            $('html, body').animate({scrollTop: 0}, 500,function(){
                $('.left').removeClass('totop').addClass('folder');
                $('.page').eq(index).addClass('current').siblings().removeClass('current');
            });

        }else{
            $('.skip,.voice').hide();
            if(Modernizr.video){
                $('video')[0].pause();
            }
            
            $('.left').addClass('totop').removeClass('folder');
            $('html, body').animate({scrollTop: index*1000+55}, 500,function(){
                $('.page').eq(index).addClass('current').siblings().removeClass('current');
            });

        }
        $('.fix-menu a').removeClass('current').eq(index).addClass('current');
    }

    //滚动，右边标签绑定点击事件
    var screenStep = 0;
    $('.fix-menu a').click(function(){
        var index = $(this).index();
        $(this).addClass('current').siblings().removeClass('current');
        if(!$('html,body').is(':animated') ){
            scrollpage(index);
            screenStep = index;
        }else{
            return false;
        }
        
    })
    //整屏滚动
    var sTop = $(window).scrollTop();
    if(sTop>=1055 && sTop<2055 ){
        $('.left').addClass('totop');
        screenStep=1;
        scrollpage(screenStep);
    }else if(sTop>=2055 && sTop<3055 ){
        $('.left').addClass('totop');
        screenStep=2;
         scrollpage(screenStep)
    }else if(sTop>=3055 && sTop<3210 ){
        $('.left').addClass('totop');
        screenStep=3;
         scrollpage(screenStep)
    }else if(sTop>=3210 ){
        $('.left').addClass('totop');
        screenStep=4;
        scrollpage(screenStep)
    }else{
        $('.left').removeClass('totop');
    }

    $('html').mousewheel(function(event, delta){
        if(delta == -1){ //down
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
                $('.downtip').fadeOut();
            }
            return false;
        }else{ //up
            if(!$(this).is(':animated') && screenStep == 4){
                screenStep--;
                scrollpage(screenStep)
                $('.downtip').fadeIn();
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

    })

    //如果是第一屏，播放
    if(screenStep==0){
        setTimeout(playMov,2000);
    }

    //首屏导航
    $('.left').hover(function(){
        if(screenStep==0){
            $(this).removeClass('folder');
        }
        
    },function(){
        if(screenStep==0){
            $(this).addClass('folder');
        }
    })


    //加载flash
    swfobject.embedSWF("http://yh.woniu.com/static/web20151106/images/p.swf","mainflash", "1100", "1000", "9.0.0",'','',{wmode: 'transparent'});

    //page2 轮播
    $('.feature-page a').click(function(){
        $(this).addClass('current').siblings().removeClass('current');
        var index = $(this).index();
        $('.feature-cont li').eq(index).addClass('current').show().siblings().removeClass('current').hide();
    })

    var pageLen = $('.feature-page a').length;
    $('.feature .prev').click(function(){
        var $prevItem = $('.feature-page .current').prev();
        if($prevItem.length>0){
            $prevItem.addClass('current').siblings().removeClass('current');
        }else{
            $('.feature-page a').eq(pageLen-1).addClass('current').siblings().removeClass('current');
        }
        $('.feature-page .current').click();
    })

    $('.feature .next').click(function(){
        var $nextItem = $('.feature-page .current').next();
        if($nextItem.length>0){
            $nextItem.addClass('current').siblings().removeClass('current');
        }else{
            $('.feature-page a').eq(0).addClass('current').siblings().removeClass('current');
        }
        $('.feature-page .current').click();
    })

    //page3 job切换
    $('.jobtn').click(function(){
        $(this).addClass('jobtn-current').siblings().removeClass('jobtn-current');
        var index = $(this).index();
        $('.jobbox').eq(index).addClass('current').show().siblings('.jobbox').removeClass('current').hide();
    })

    $('.job .nav a').click(function(){
        $(this).addClass('current').siblings().removeClass('current');
        var index = $(this).index();
        $(this).parent().siblings('.cont').find('p').hide().eq(index).show();
    })

    //page4 主动被动切换
    $('.skill .list .nav a').click(function(){
        $(this).addClass('current').siblings().removeClass('current');
        var index = $(this).index();
        $('.skill .list .cont').eq(index).show().siblings('.cont').hide();
    })

    var hunsZ = [{
            name: '张飞',
            intro: '燕人张翼德在此，谁敢与我决一死战？',
            bt: '震心一击',
            bd: '召唤出张飞武魂，将丈八蛇矛向前方发出猛烈的突击，对敌人造成285%的伤害，蓄力2阶段增加1.9倍伤害，3阶段增加3倍的伤害。',
            gt: '刺心',
            gd: '消耗所有连击点，召唤张飞武魂，向前方发出刺心一击，造成260%+连击点*78%的伤害。'
        },{
            name: '貂蝉',
            intro: '舞罢隔帘偷目送，不知谁是楚襄王。',
            bt: '恢复旋律',
            bd: '生命力增加15%（数值随武魂等级增加而增加）',
            gt: '恢复旋律',
            gd: '生命力增加15%（数值随武魂等级增加而增加）'
        },{
            name: '董卓',
            intro: '毕竟英雄谁得似，脐脂自照不须灯',
            bt: '震天动地',
            bd: '跺脚造成周围63%的伤害，并附带1-3s的眩晕效果。',
            gt: '暗器',
            gd: '投掷暗器攻击敌方，造成285%的伤害，增加1连击点。'
        },{
            name: '甘宁',
            intro: '百翎直贯曹家寨，尽说甘宁虎将才。',
            bt: '击破',
            bd: '向前方快速突破，给予敌人136%的伤害。',
            gt: '死地逃脱',
            gd: '较大范围的伤害后迅速脱逃至后方，增加2连击点，伤害数值为299%。'
        },{
            name: '公孙瓒',
            intro: '',
            bt: '绝对防御',
            bd: '3秒内无敌，但接下来的6秒内攻击将下降50-0% 。',
            gt: '暴走天使',
            gd: '3秒内攻击力增加25-150%，但是防御力变为0。'
        },{
            name: '关羽',
            intro: '吾观颜良，如插标卖首尔！',
            bt: '横扫千军',
            bd: '召唤关羽武魂，向前方发出大范围斩击，造成511%的伤害。',
            gt: '旋风斩',
            gd: '消耗所有连击点召唤关羽武魂，发出连续性横扫，造成520%+连击点*34%的伤害。'
        },{
            name: '黄盖',
            intro: '落帆黄鹤之浦，藏船鹦鹉之洲。',
            bt: '扫射',
            bd: '给予前方敌人90点伤害。',
            gt: '扔叉',
            gd: '扔出鱼叉，造成285%的伤害，快速移动到敌方身前，增加1连击点。'
        },{
            name: '黄忠',
            intro: '',
            bt: '烈弓',
            bd: '召唤黄忠，在眼睛看不见的情况下快速射出一箭，给予敌人346的伤害。',
            gt: '闪光弓箭',
            gd: '召唤出黄忠，发射极速弓箭，造成346%的伤害 ，并增加2连击点。'
        },{
            name: '吕布',
            intro: '关外诸侯，布视之如草芥。',
            bt: '无双一跃',
            bd: '跳向前方给予敌人554的伤害。',
            gt: '飞跃审判',
            gd: '消耗全部连击点，跳至前方下劈，造成277%+连击点*83%的伤害。'
        },{
            name: '吕玲绮',
            intro: '吕布之女，勇武不逊其父矣。',
            bt: '反击',
            bd: '反击姿态，给予命中自身的敌人321点伤害。',
            gt: '凌厉反击',
            gd: '格挡姿势时对施展攻击对象造成 321%的伤害，成功格挡增加2连击点。'
        },{
            name: '马超',
            intro: '威震西凉立大功，渭桥六战最英雄。',
            bt: '全军突击',
            bd: '大范围内巡回猛烈攻击敌人，每次给予56点伤害。',
            gt: '回旋砍',
            gd: '跳跃后施展回转攻击，对命中敌人造成82%的伤害，并增加2连击点。'
        },{
            name: '庞德',
            intro: '宁为国家鬼，不为羌贼臣。',
            bt: '挑起摔',
            bd: '将敌人挑起，并向下猛摔，给予113点伤害。',
            gt: '突袭飞腿',
            gd: '快速刺向前方，造成136%的伤害。'
        },{
            name: '太史慈',
            intro: '临终言壮志，千古共嗟咨。',
            bt: '连环突刺',
            bd: '向前方多次刺击，每次给予86点伤害。',
            gt: '逆转态势',
            gd: '先后退再极速向前方攻击，造成306%的伤害，并增加2连击点。'
        },{
            name: '文丑',
            intro: '',
            bt: '齐心一击',
            bd: '集气后向前方偷袭，给予285点伤害，蓄力2阶段伤害增加1.9倍，3阶段增加三倍。',
            gt: '十字伤疤',
            gd: '连续上挑2次，造成252%的伤害，并增加2连击点。'
        },{
            name: '夏侯惇',
            intro: '孤月独明勘比伦，至今功迹照乾坤。',
            bt: '水上漂',
            bd: '3s内移动速度增加50%。',
            gt: '猛冲',
            gd: '向前方快速移动击飞敌人，消耗所有连击点，造成260%+连击点*78%的伤害。'
        },{
            name: '小乔',
            intro: '东风不与周郎便，铜雀春深锁二乔。',
            bt: '小李飞刀',
            bd: '蓄力后撇掷武器制造142%的伤害，蓄力阶段为2阶段时给予1阶段的1.9倍伤害，3阶段时给予3倍的伤害。',
            gt: '刃之幕',
            gd: '前方召唤无数刀刃，造成54%的伤害，并增加1连击点。'
        },{
            name: '许褚',
            intro: '凛凛威风镇九州，当年许褚果如虎。只因孟起军前见，天下从兹播虎侯。',
            bt: '旋风斩',
            bd: '召唤虎痴许褚的武魂，给予范围内敌人131点伤害。',
            gt: '愤怒一击',
            gd: '消耗所有连击点，召唤虎痴许褚的武魂给予敌人260%+连击点*78%的伤害。'
        },{
            name: '颜良',
            intro: '',
            bt: '溅射袭击',
            bd: '袭击前方，对广范围内造成356%的伤害。',
            gt: '死亡之舞',
            gd: '快速挥刀冲向前方，造成131%的伤害，并增加1连击点。'
        },{
            name: '袁绍',
            intro: '空招俊杰三千客，漫有英雄百万兵。',
            bt: '连续刺',
            bd: '连续三次刺向前方，每次造成128%的伤害。',
            gt: '血之剑舞',
            gd: '快速施展三次攻击，造成63%的伤害，并增加1连击点。'
        },{
            name: '张辽',
            intro: '才闻乳母低声说，夜静更阑不敢啼。',
            bt: '突袭',
            bd: '先退后再冲向前方给予发散性攻击，每次伤害为90点。',
            gt: '影子跳跃',
            gd: '快速移动一段距离，0.5S内无敌，并增加1连击点。'
        },{
            name: '赵云',
            intro: '古来冲阵扶危主，只有常山赵子龙。',
            bt: '回旋踢',
            bd: '回旋式攻击，给予命中的敌人136点伤害。',
            gt: '回旋踢',
            gd: '回旋式攻击，给予敌人136%的伤害，并增加1连击点。'
        },{
            name: '诸葛亮',
            intro: '功盖三分国，名高八阵图。',
            bt: '雷霆万钧',
            bd: '召唤出孔明武魂，对周身大范围内释放闪电攻击，造成299点伤害，蓄力2阶段伤害增加1.9倍，3阶段增加3倍。',
            gt: '大地动荡',
            gd: '消耗所有连击点，较广范围内召唤出强大的闪电，对敌人造成260%+连击点*78%的伤害。'
        }];

        var hunsB = [{
            name: '鲍三娘',
            intro: '',
            bt: '掠夺',
            bd: '击杀敌人后获得的金币增加（数值随等级增加而增加）。',
            gt: '掠夺',
            gd: '击杀敌人后获得的金币增加（数值随等级增加而增加）。'
        },{
            name: '蔡文姬',
            intro: '十八拍笳休愤切，须知薄命是佳人。',
            bt: '进修',
            bd: '普通攻击会造成额外的33点伤害。',
            gt: '修炼剑术',
            gd: '普通攻击会造成额外18%的伤害。'
        },{
            name: '大乔',
            intro: '东风不与周郎便，铜雀春深锁二乔。',
            bt: '精神恢复',
            bd: '普通攻击会回复一定量的MP。',
            gt: '精神恢复',
            gd: '普通攻击会回复一定量的MP。'
        },{
            name: '郭嘉',
            intro: '虽然天数三分定，妙算神机亦可图。若是当时存奉孝，难容西蜀与东吴。',
            bt: '集中精神',
            bd: '对眩晕状态的免疫力提高。',
            gt: '集中精神',
            gd: '对眩晕状态的免疫力提高。'
        },{
            name: '花鬘',
            intro: '',
            bt: '解毒',
            bd: '对中毒状态免疫力提高。',
            gt: '消化',
            gd: '对中毒状态免疫力提高。'
        },{
            name: '华佗',
            intro: '诚皆玄妙之殊巧，非常之绝技矣。',
            bt: '青囊针灸',
            bd: '每秒回复一定量的生命值。',
            gt: '青囊针灸',
            gd: '每秒回复一定量的生命值。'
        },{
            name: '黄月英',
            intro: '孔明之妻，才女之名响彻蜀地。',
            bt: '士气',
            bd: '普通攻击附带震慑效果，降低敌人攻击速度。',
            gt: '精神强化',
            gd: '普通攻击附带额外伤害，随连击点增加而增加。'
        },{
            name: '贾诩',
            intro: '',
            bt: '精神增加',
            bd: '装备后增加最大MP。',
            gt: '精神增加',
            gd: '装备后增加最大MP。'
        },{
            name: '敬哀皇后',
            intro: '',
            bt: '血气恢复',
            bd: '普通攻击有一定几率回复HP。',
            gt: '血气恢复',
            gd: '普通攻击有一定几率回复HP。'
        },{
            name: '陆逊',
            intro: '持矛举火破连营，玄德穷奔白帝城。一旦威名惊蜀魏，吴王宁不敬书生。',
            bt: '熊熊战役',
            bd: 'MP100%情况下，攻击力增加。',
            gt: '熊熊战役',
            gd: 'MP100%情况下，攻击力增加。'
        },{
            name: '马良',
            intro: '',
            bt: '伤口撕裂',
            bd: '敌方处于流血状态下，普通攻击会附带额外伤害。',
            gt: '伤口撕裂',
            gd: '敌方处于流血状态下，普通攻击会附带额外伤害。'
        },{
            name: '马云騄',
            intro: '',
            bt: '消火',
            bd: '对灼烧状态免疫力提升。',
            gt: '消火',
            gd: '对灼烧状态免疫力提升。'
        },{
            name: '南华老仙',
            intro: '著作《太平要术》',
            bt: '觉悟',
            bd: 'HP低于25%时，攻击力增加。',
            gt: '觉悟',
            gd: 'HP低于25%时，攻击力增加。'
        },{
            name: '庞统',
            intro: '谁知天狗流量坠，不使将军衣锦回。',
            bt: '触电耐性',
            bd: '对感电状态免疫力增加。',
            gt: '触电耐性',
            gd: '对感电状态免疫力增加。'
        },{
            name: '佟贵妃',
            intro: '',
            bt: '内力心法',
            bd: '每秒持续回复MP。',
            gt: '内力心法',
            gd: '每秒持续回复MP。'
        },{
            name: '徐庶',
            intro: '片言却似春雷震，能使南阳起卧龙。',
            bt: '止血',
            bd: '对流血状态免疫力增加。',
            gt: '止血',
            gd: '对流血状态免疫力增加。'
        },{
            name: '周瑜',
            intro: '世间豪杰英雄士，江左风流美丈夫。',
            bt: '士气',
            bd: '攻击生命值低于25%的敌人时，将附加额外伤害。',
            gt: '士气',
            gd: '攻击生命值低于25%的敌人时，将附加额外伤害。'
        }];

    //魂技展示
    $('.herolist1 a').click(function(){
        $(this).addClass('current').siblings().removeClass('current');
        var index = $(this).index();
        $('.page4 .intro h2').html('<img src="http://yh.woniu.com/static/web20151106/images/zhudong/names/'+(index+1)+'.png">');
        $('.page4 .intro h4').html(hunsZ[index].intro);

        $('.page4 .detail-b .skill-img').attr('src','http://yh.woniu.com/static/web20151106/images/zhudong/skills/b'+(index+1)+'.png');
        $('.page4 .detail-b h3 span').html(hunsZ[index].bt);
        $('.page4 .detail-b p').html(hunsZ[index].bd);

        $('.page4 .detail-g .skill-img').attr('src','http://yh.woniu.com/static/web20151106/images/zhudong/skills/g'+(index+1)+'.png');
        $('.page4 .detail-g h3 span').html(hunsZ[index].gt);
        $('.page4 .detail-g p').html(hunsZ[index].gd);

        $('.page4 .role').css('right','-500px');
        $('.page4 .role').attr('src','http://yh.woniu.com/static/web20151106/images/zhudong/roles/'+(index+1)+'.png').animate({right:-540},500);
    })

    $('.herolist2 a').click(function(){
        $(this).addClass('current').siblings().removeClass('current');
        var index = $(this).index();
        $('.page4 .intro h2').html('<img src="http://yh.woniu.com/static/web20151106/images/beidong/names/'+(index+1)+'.png">');
        $('.page4 .intro h4').html(hunsB[index].intro);

        $('.page4 .detail-b .skill-img').attr('src','http://yh.woniu.com/static/web20151106/images/beidong/skills/b'+(index+1)+'.png');
        $('.page4 .detail-b h3 span').html(hunsB[index].bt);
        $('.page4 .detail-b p').html(hunsB[index].bd);

        $('.page4 .detail-g .skill-img').attr('src','http://yh.woniu.com/static/web20151106/images/beidong/skills/g'+(index+1)+'.png');
        $('.page4 .detail-g h3 span').html(hunsB[index].gt);
        $('.page4 .detail-g p').html(hunsB[index].gd);

        $('.page4 .role').css('right','-500px');
        $('.page4 .role').attr('src','http://yh.woniu.com/static/web20151106/images/beidong/roles/'+(index+1)+'.png').animate({right:-540},500);
    })

    //魂技性别切换
    $('.page4 .about .nav a').click(function(){
        var index = $(this).index();
        $(this).addClass('current').siblings().removeClass('current');
        $(this).parent().siblings('.detail').hide().eq(index).show();
    })

    

    $('.left').on('mouseenter mouseleave','.order',function(event){
        if( event.type == "mouseenter"){
            $(this).find('span').addClass('hover');
        }else if(event.type == "mouseleave" ){
            $(this).find('span').removeClass('hover');
        }
    });


    $('.page1 .video').bind('click',function(){
        $('.wrap-video').html($('.wrap-video script').html());
        $('.leftbar').show();
    });
    $('.closebtn').on('click',function(){
        $('.leftbar').hide();
    })



    $('.close_pop').on('click',function(){
        $('.video-pop,.popvideo,.mask').hide();
    });




    //友情链接
    $('.page5 .nav li').mouseenter(function(){
        var index = $(this).index();
        $(this).find('a').addClass('current').end().siblings().find('a').removeClass('current');
        $('.page5 .cont').hide().eq(index).show();
    })
    function scrollflink(){
        var $self = $(".flinkcont");
        $self.animate({ "margin-top" : "-50px" },1000 , function(){
            $self.css({"margin-top":"0px"}).find("a:lt(5)").appendTo($self);
        })
    }
    setInterval(scrollflink, 3000 );

















})\