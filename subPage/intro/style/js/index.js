var ns={};

(function(ns){
	var win;
	ns.iP6Hsize=737;//iPhone6の縦サイズが736;
	ns.iP6Hsize=415;//iPhone6の縦サイズが414;
	ns.verSize;
	ns.hrSize;
	ns.yoko=false;
	ns.content;
	ns.pointerImage=[];
	ns.numSimg=[];
	ns.clockBox;
	ns.resizeHl;
	
	ns.loadEnd;
	
	ns.index;//indexページ
	
	$(function(){
		//console.log("index")
		//utils.setTraceBox();
		utils.init();
		
		win=$(window);
		ns.content=$("#content");
		ns.pagesBox=$("#pages_box");
		
		var h=win.height();
		var w=win.width();
		
		ns.verSize=(h>w)?h:w;
		ns.hrSize=(h<w)?h:w;
		if(ns.verSize<ns.iP6Hsize){
			$("#front_flame").css("border-width",5*ns.hrSize/640);
		}
		
		ns.index=$("#index_page");
		
		if(!utils.pc){
			
		}
		
		var src;
		var img;
		
		var loadCount=0;
		
		var loadImages=[];
		loadImages.push("img/index/main_back.jpg");
		
		for(var n=0;n<5;n++){
			//ポインター
			src="img/index/pointer"+(n+1)+".png";
			loadImages.push(src);
		}
		
		for(var n=0;n<4;n++){
			//00など
			src="img/index/nums/nums"+(n+1)+".png";
			loadImages.push(src);
		}
		
		
		
		var menuImagesSrc=["sbtn_over","sbtn_over_black","sbtn_white","btn_over","btn_over_black","btn_white","circle_black","circle_red"];
		for(var n=0;n<8;n++){
			src="img/index_menu/"+menuImagesSrc[n]+".png";
			loadImages.push(src);
		}
		
		var pageImagesSrc=["main_play","main_learn","main_celebrate"];
		var pageImagesLightSrc=["main_play_light","main_learn_light","main_celebrate_light"];
		var textImageSrc=["play","learn","celebrate"];
		
		ns.mouseOverImages=[];
		
		for(var n=0;n<3;n++){
			var imgSet=[];
			var img1=new Image();
			img1.onload=loadCheck;
			img1.src="img/index/menu/"+pageImagesSrc[n]+".png";
			imgSet.push(img1);
			
			var img2=new Image();
			img2.onload=loadCheck;
			img2.src="img/index/menu/"+pageImagesLightSrc[n]+".png";
			imgSet.push(img2);
			
			var img3=new Image();
			img3.onload=loadCheck;
			img3.src="img/index/menu/"+textImageSrc[n]+".png";
			imgSet.push(img3);
			
			ns.mouseOverImages.push(imgSet);
			
		
		}
		
		
		
		
		
		
		
		
	
		
		for(var n=0;n<loadImages.length;n++){
			img=new Image();
			if(n>0&& n<6){
			ns.pointerImage.push(img);
			}
			if(n>=6 && n<10){
				ns.numSimg.push(img);
			}
			src=loadImages[n];
			
			if(utils.Browser=="ie8"||utils.Browser=="ie9"){
				//ieのロードイベント対策
				src=src+"?"+Number(new Date());	
			}
			img.onload=loadCheck;
			img.src=src;
		}
			/*if(n<4){
				img=new Image();
				ns.numSimg.push(img);
				src="img/index/nums/nums"+(n+1)+".png";
				if(utils.Browser=="ie8"||utils.Browser=="ie9"){
					//ieのロードイベント対策
					src=src+"?"+Number(new Date());	
				}
				img.onload=loadCheck;
				img.src=src;
			}*/
			
		
		
		//必要な画像のロードチェック
		
		var maxLoadCount=loadImages.length+ns.mouseOverImages.length*3;
		function loadCheck(){
			loadCount+=1;
			if(loadCount>=maxLoadCount){
			//if(utils.transition){
				if(utils.Browser!="ie8"){
						ns.setCanvas();
				}else{
					ns.setCanvas8();
				}
				
				ns.initPageChange();
				
				//console.log("imgloadEnd")
				$(window).resize(ns.resizeHl).trigger("resize");
				$(window).trigger("orientationchange");
				$(".copyright").addClass("show");
				setTimeout(function(){
					$("#canvas_area").addClass("show");
					//trace("show")
				},200);
				
				
			}
		
		}
		//}
		win.load(function(){
			//console.log("load")
			orientationChengeHl();
			ns.resizeHl();
		})
		
		
		ns.menuInit();
		
		
		if(utils.pc){
			$(window).mousewheel(mousewheelHl);
			
			$(window).mousemove(mousemoveHl);
			if(utils.Browser=="ie8"){
				$("body").mousemove(mousemoveHl);
			}
			
			
		}else{
			$(window).bind("orientationchange",orientationChengeHl);
		}
		$(window).scroll(scrolllHl);
		
		$("body").bind("touchmove",function(e){
			//e.preventDefault()
		})
		
		if(!utils.pc){
			$("body").addClass("mob");
		}
		if(utils.sp){
		///SPで見た時のフォントサイズ調整
			$("body").addClass("sp");
			if(utils.android){
				//Androidでページがcanvasでうまく描画できない対策
				//なぜかタブレットではこれをするとうまくいかない
				$("#wrapper").addClass("sp");
			}
		}else{
			if(utils.android){
				//タブレットではこうしないとテキストが上に来ない
				$("#pages_box").addClass("tb");
			}
		}
		
		checkDeviceFontSize();
		
		ns.resizeHl=function(){
			h=win.innerHeight();
			w=win.innerWidth();
			
			
			if(utils.pc && utils.Browser!="ie8" || utils.android){
				if(utils.android){
					
					if(w>h){
						ns.yoko=true;
					}else{
						ns.yoko=false;
					}
				}
				ns.clockResize(w,h);	
			}
			if(utils.Browser=="ie8"){
				ns.clockResize8(w,h);
			}
			ns.pageResize(w,h);
			ns.menuResize(w,h);
			//ns.menuResize(w,h);
			//trace("ns.resizeHl")
		}
		
		function orientationChengeHl(){
			
			if(!utils.android){
				if(Math.abs(window.orientation)==90){
					ns.yoko=true;
					ns.content.addClass("yoko");
				}else{
					
					ns.yoko=false;
					ns.content.removeClass("yoko");
				}
			ns.clockResize(w,h);
			ns.pageResize(w,h);
			ns.menuResize(w,h)
			}
		}
		
		function mousewheelHl(e){
			
		}
		
		function scrolllHl(e){
			
		}
		
		function mousemoveHl(e){
			
			var p={x:e.pageX,y:e.pageY}
			ns.pageChangeMousemoveHl(p)	
		}
		
		
		
	});
	
	function checkDeviceFontSize(){
	
		if(utils.Browser!="ie8" && utils.Browser!="ie7" && utils.Browser!='ie6'){
			var m=$("<span>");
			m.css({"font-size":"10px","opacity":0});
			m.text("測定基準字")
			$("body").append(m);
			var fontSize=Math.floor(5000/m.width())/100;
			
		
	
			if(fontSize<0.95){			
				//cssルールを追加
	
				var style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
				style.type = 'text/css';
				var stylesheet = document.styleSheets.item(1);//既存スタイルを取得
				var idx = stylesheet.cssRules.length;
	
				//末尾に追加
				stylesheet.insertRule("html:not(:target) body{ font-size: "+15*fontSize+"px !important;}", idx);
				/*stylesheet.insertRule("p { font-size: "+14*fontSize+"px;}", idx+1);
				stylesheet.insertRule("#copyright { font-size: "+12*fontSize+"px;}", idx+2);*/	
			}
			m.remove();	
		}

}
})(ns)