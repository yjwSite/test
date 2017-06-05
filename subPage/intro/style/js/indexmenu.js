(function(ns){
	var device;
	
	var userAgent = window.navigator.userAgent.toLowerCase();

	if((navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') == -1) || navigator.userAgent.indexOf('iPad') > 0){
		//タブレット
		device='tablet';
		
	} else if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0)){
		//スマートホン
		device='sp';
	}else{
		//PC
		device='pc';
	}
	
	
	
	var menublock;
	var modalBack;
	var win;
	var winW,winH;

	var menuBtnBox;
	var menuBtnBoxW;
	var menuBtnBoxLines;
	//縦横比率
	var contentOriginW=740;
	var contentOriginH=830;


	var menuBlock	;
	var imgBlock;
	var imgBlockBtn;
	var imgBlockBtnabs;
	var imgBlockBtnSml;

	var hoverActiveBtnImg;

	var menuBlockText;


	var footerMenu;

	var pageOpenState

	ns.yoko=true;
	var modalOnCount=0;
	
	var android=(navigator.userAgent.indexOf('Android') > -1)?true:false;
	
	
	
	
		
	ns.menuInit=function(){
		//utils.set//traceBox();
		//trace("init");
		
		modalBack=$("#modalBack");
		menuBtnBox=$("#menu_btn_box")
		menuBtnBoxW=$("#menu_btn_box").width();
		menuBtnBoxLines=$("#menu_btn_box .lines>div");
		menuBlockText=$("#menu_block .text,#menu_block .textj");

		menuBlock=$("#menu_block");

		/////////////////////////////////////
		//////実際はメニューオープンの際にやる事//////////
		/////////////////////////////////////

		
		if(android){
			//$(".lines").remove();
			menuBtnBox.addClass("android")
			menuBlock.addClass("nodelay");
		}
		ns.menuClose=function(){
			modalOnCount=0;
			menuBlock.removeClass("show hide move nodelay");
			menuBtnBox.removeClass("rotate");
		}
		
		ns.menuOpen=function(){
			menuBlock.addClass("show move")
			modalOnCount+=1;
			ns.resizeHl();
		}
		
		if(!android){
		//trace(modalOnCount)
		menuBtnBox.mouseenter(function(){
			if(!$(this).hasClass("on rotate")&&device=="pc"){
				$(this).addClass("motion")
				
			}
			//trace("ns.pageOpenBtnActive="+ns.pageOpenBtnActive+",hasclass="+menuBtnBox.hasClass("on"))
			if(ns.pageOpenBtnActive && menuBtnBox.hasClass("on") ){
				$(this).removeClass("motion")
				$(this).addClass("rotate");
				//trace("rotate")
			}
		}
		).mouseleave(function(){
			//trace("modalOnCount="+modalOnCount)
				$(this).removeClass("motion")
			if(ns.pageOpenBtnActive && modalOnCount>1){
				
				$(this).removeClass("rotate");
			}
			modalOnCount+=1;
			
		});
		
		}
		
		
		
		imgBlock=$(".img_block",menuBlock);
		imgBlockBtn=$(".btn",imgBlock);
		footerMenu=$(".footer_menu",menuBlock);
		imgBlockBtnSml=$(".topics,.contact",imgBlock);
		
		
		imgBlockBtnabs=$(".over_red,.over,.white",imgBlockBtn);
		imgBlockBtnSmls=$(".over_red,.over,.white",imgBlockBtnSml);
		hoverActiveBtnImg=[];
		imgBlockBtn.each(function(index, element) {
            var targetImage=$("a img",element);
			targetImage.data("btn",$(element));
			targetImage.data("block",$(element).closest(".block"));

			if($(element).hasClass("small")){
				targetImage.data("R",0.70)
			}else{
				targetImage.data("R",0.75)
			}
			hoverActiveBtnImg.push(targetImage);
        });

		win=$(window);
		var w=win.width();
		var h=win.height();

		ns.menuResize(w,h);


		win.load(function(){
			w=win.width();
			h=win.height();
			ns.menuResize(w,h);
		});


		$("img",menuBlockText).mouseover(function(){
			if(!pageOpenState){
				var block=$(this).closest(".block");
				block.addClass("text_hover");
				brink(block);
			}
		}).mouseout(function(){
			if(!pageOpenState){
				var block=$(this).closest(".block");
				block.removeClass("text_hover")
				brinkStop(block);
		}
			
		});

		$(window).mousemove(function(e){
			if(device=="pc"){
				var mouseP={x:e.pageX,y:e.pageY}
				for(var n=0;n<5;n++){
					var mouseIn=false;
					 var targetImage=hoverActiveBtnImg[n];
					 var block=targetImage.data("block");
					 var btn=targetImage.data("btn");
					 var R= targetImage.data("R");
					 var halfW=targetImage.width()/2;
					 var offset=targetImage.offset();
					 var centerP={x:offset.left+halfW,y:offset.top+halfW}
					 var difX=mouseP.x-centerP.x;
					 var difY=mouseP.y-centerP.y;
					 var RL=Math.sqrt(Math.pow(difX,2)+Math.pow(difY,2));
					 if(RL<=halfW*R){
						 mouseIn=true;
					 }
					 if(btn.hasClass("brink") && !mouseIn && !block.hasClass("text_hover")){
							brinkStop(block)
					 }else if(!btn.hasClass("brink") && mouseIn){
						 brink(block)
					 }
				}

			}
		})

		$("a",imgBlockBtn).click(function(e){
			var mouseP;
			var mouseP={x:e.pageX,y:e.pageY}
			var targetImage=$("img",this);
			 var R= targetImage.data("R");
			var halfW=targetImage.width()/2;
			var offset=targetImage.offset();
			var centerP={x:offset.left+halfW,y:offset.top+halfW}
			var difX=mouseP.x-centerP.x;
			var difY=mouseP.y-centerP.y;
			var RL=Math.sqrt(Math.pow(difX,2)+Math.pow(difY,2));
			if(RL<=halfW*R){

			}else{
				return false;
			}
		})

		$("body").bind("touchmove",function(e){
			if($("body").hasClass("modal_show")){
				e.preventDefault();
				e.stopPropagation();
			}
		})

	}


	$(function(){
		//初期化
		ns.menuInit();
		
		//リサイズイベント
		$(window).resize(function(){
			var w=win.width();
			var h=win.height();
			ns.menuResize(w,h)
			
		})
		
	})

	//////////////////////////////////
	//
	//ボタンのブリンク(イベント設置はns.menuInit内に)
	//
	/////////////////////////////////

	function brink(block){
		if(utils.Browser!="ie8"){
			if(!$('.btn',block).hasClass("brink")||$('.btn',block).hasClass("end")){
				$(".text,.textj",block).addClass("move");
				$('.btn',block).addClass('brink');
				utils.setAnimeEnd($('.btn',block)[0],function(e){
					$('.btn',block).addClass("end");
			})
			$('.btn',block).removeClass('hide');
			}
		}
	}
	function brinkStop(block){
		$(".text,.textj").removeClass("move");
		$('.btn').removeClass('brink');
		$('.btn').addClass('hide');

	}
	
	/////////////////////////////////////
	//下層ページにリサイズイベントがないので
	//下層ページメーニューのりサイズはns.menuResizeを使うこと。
	/////////////////////////////////////

	ns.menuResize=function(w,h){
		winW=w;
		winH=h;

		////trace2("winW="+w)

		var menuBlockTop;
		var menuBlockHeight;
		var menuBlockWidth="100%";
		var menuBlockTopResio=0.64;
		var imgBlockBtnHeight;
		var menuBlockMinH=540;
		var menuBlockMinH2=505;
		var winWMax=1271;
		var tateMenublockW=76.1;
		var winMinW=978;
		
		var scaleResio=winH/winW;

		if(scaleResio>1.1){
			if(ns.yoko){
			ns.yoko=false;
			menuBlock.removeClass("yoko").addClass("tate");
				if($("#menu_block").hasClass("move")){
					menuBlock.addClass("nodelay");
					////trace("nodelay1")
				}
			}
		}else{
			if(!ns.yoko){
			ns.yoko=true;
			menuBlock.removeClass("tate").addClass("yoko");
				if($("#menu_block").hasClass("move")){
					menuBlock.addClass("nodelay");
				}
			}
		}



		var footerMenuLeft;
		var breakPtTate;
		var menuBlockWResio;
		var menuBlockHResio;

		var elmt;
		var imgBlockBtnabsW;
		var imgBlockBtnabsH;
		var imgBlockBtnH;
		var imgBlockBtnTop;
		var imgBlockBtnSmlH;
		var menuBlockTopLimit=70;
		var footerMargin;
		var topResio=1;

		menuBlockWResio=winW/winWMax;
		imgBlockBtnHeight=$("img.over_red",imgBlockBtn.eq(0)).width()*1.145;
		
		if(ns.yoko){
			////trace("yoko")
			breakPtTate=menuBlockMinH/menuBlockTopResio;
			menuBlockText.attr("style","");
			menuBlock.attr("style","");
			imgBlockBtnabs.attr("style","");
			imgBlock.attr("style","");
		
			if(winH>breakPtTate){
				menuBlockTop=winH*(1-menuBlockTopResio);
				menuBlockHeight=winH*(menuBlockTopResio);

			}else if(winH>menuBlockMinH){
				topResio=Math.pow(winH/breakPtTate,0.5);

				menuBlockTop=(winH*topResio-menuBlockMinH);
				if(menuBlockTop<menuBlockTopLimit){menuBlockTop=menuBlockTopLimit}
					if(device=='sp'){
						//trace("9%")
						menuBlockTop="9%";
					}
				menuBlockHeight=menuBlockMinH-menuBlockTopLimit;//*menuBlockWResio;
			
			}else{
				topResio=Math.pow(winH/breakPtTate,0.5);
				menuBlockTop=menuBlockTopLimit;
				if(device=='sp'){
					var menuH=footerMenu.offset().top-menuBlock.offset().top+footerMenu.height();
					menuBlockTop=(winH-menuH)*0.4;
					//trace("menuBlockTop"+menuBlockTop)
					if(android){
						//trace("androidTop")
						menuBlockTop="9%";
					}
				}
				menuBlockHResio=winH/menuBlockMinH;

				if(winW<winMinW){
					if(device=='pc'){
						var w_=Math.round(winH/menuBlockMinH*100);
						menuBlockWidth=w_+"%";
					}else{
						menuBlockWidth="100%";
					}
				}else{
					if(winW>winWMax){
						menuBlockWidth=winWMax*menuBlockHResio;
					}else{
						menuBlockWidth=winW*menuBlockHResio,1.8;
					}
					if(device=='pc'){
						menuBlockWidth*=menuBlockHResio
					}
				}
				menuBlockHeight=winH-menuBlockTopLimit;
			}
			
			
			footerMargin=winH*0.15*topResio;
			imgBlock.css({
				"margin-bottom":footerMargin
			});
			menuBlock.css({
				"top":menuBlockTop,
				"height":menuBlockHeight,
				"width":menuBlockWidth

			});
			
			imgBlockBtnHeight=$("img.over_red",imgBlockBtn.eq(0)).width()*1.145;
			////trace($("img.over_red",imgBlockBtn.eq(0)).width())
			imgBlockBtn.css({
				"height":Math.round(imgBlockBtnHeight)
			})
			
			imgBlockBtnSmls.each(function(index, element) {
				var elmt=$(element);
				var imgBlockBtnSmlsH=elmt.height();
				var imgBlockBtnH=$(".over_red",imgBlock).height();
				var imgBlockBtnT=(imgBlockBtnH-imgBlockBtnSmlsH)/2
				$("img",imgBlockBtnSml).css("top",imgBlockBtnT)
			});
			
		
		}else{
			//縦の場合

			menuBlock.attr("style","");
			imgBlockBtn.attr("style","");
			footerMenu.attr("style","");
			imgBlockBtnabs.attr("style","");
			imgBlock.attr("style","");

			$(".contact .normal,.topics .normal").attr("style","");
			breakPtTate=winH*0.92788;
			
			var imgBlockH=imgBlock.height()*1.175+imgBlock.position().top;
			
			////trace2("breakPtTate="+breakPtTate+",imgBlockH="+imgBlockH)
			if(imgBlockH>breakPtTate){
				menuBlockWResio=tateMenublockW*breakPtTate/imgBlockH+"%";
				////trace("Resio="+breakPtTate/imgBlockH)
				menuBlock.css("width",menuBlockWResio);
			}

			menuBlockText.each(function(index, element) {
				var parent=$(this).closest(".block");
                var H=parent.height();
				var imgH=$("img",this).height();

				var top=(H-imgH)/2;
				if(parent.attr("class").match(/contact|topics/)){
					top-=menuBlock.width()*0.0043;
				}
				$(this).css("top",top);
			});
			imgBlockBtnabs.each(function(index, element) {
				var elmt=$(element);
				var imgBlockBtnabsW=elmt.width();
				var imgBlockBtnW=elmt.closest(".btn").width();
				var imgBlockBtnL=(imgBlockBtnW-imgBlockBtnabsW)/2
				if(utils.serface||android){//Surface画像ズレ対策
					elmt.css("left",imgBlockBtnL)
				}
			});

			var menuH=footerMenu.offset().top-menuBlock.offset().top+footerMenu.height();
			var mTop=(winH-menuH)*0.4;
			//trace(mTop)
			menuBlock.css("top",mTop);
		}

		//ボタンの設定

		if(ns.yoko){
			menuBtnBox.attr("style","");
			menuBtnBoxLines.attr("style","");
		}else{
			contentScaleResio=winW/contentOriginW;
			ns.contentW=contentOriginW*contentScaleResio;
			ns.contentH=contentOriginH*contentScaleResio;
		}

		var menuBtnBoxW=menuBtnBox.width();
		menuBtnBox.css({
			"height":menuBtnBoxW
		})


		if(w<=960){
			
			var menuBtnBoxSize;
			var menuBtnBoxTop;
			var headerHight;
			

		 if(device=='sp'){
				menuBtnBoxSize=w*31/640;
				menuBtnBoxTop=w*26/640;
				

				if(ns.yoko){
					////trace2("hit3")
					menuBtnBoxSize=w*31/640*0.7;
					menuBtnBoxTop=w*26/640*0.7;
					
				}

				headerHight=menuBtnBoxTop*2+menuBtnBoxSize;

				menuBtnBox.css({
					"width":menuBtnBoxSize,
					"top":menuBtnBoxTop,
					"height":menuBtnBoxSize,
					"right":w*44/960*0.7
				})


			 }else{
				 menuBtnBoxSize=w*31/960;
				 menuBtnBoxTop=w*26/960;
					if(ns.yoko){

						menuBtnBoxSize=w*31/960*0.7;
						menuBtnBoxTop=w*26/960*0.7;
					}
				headerHight=menuBtnBoxTop*2+menuBtnBoxSize;

				menuBtnBox.css({
					"width":menuBtnBoxSize,
					"top":menuBtnBoxTop,
					"right":w*44/960

				})

				

				
				}
				menuBtnBoxW=menuBtnBoxSize;

		}else{

			
		}

		menuBtnBox.css({
							"height":menuBtnBoxSize
						})

		var lineH=Math.ceil(menuBtnBoxW*0.096);

		if(ns.yoko){
			if(lineH<1){lineH=1;}
		}else{
			if(lineH<2){lineH=2;}
		}

		menuBtnBoxLines.css({
		"height":lineH
		});
		var ltop1=Math.round(menuBtnBoxW*0.131);
		var ltop2=Math.round(menuBtnBoxW*0.452);
		var lineSpace=ltop2-(ltop1+lineH)
		var ltop3=ltop2+lineH+lineSpace;

		menuBtnBoxLines.eq(0).css("top",ltop1);
		menuBtnBoxLines.eq(1).css("top",ltop2);
		menuBtnBoxLines.eq(2).css("top",ltop2);
		menuBtnBoxLines.eq(3).css("top",ltop3);

	}

})(ns)
