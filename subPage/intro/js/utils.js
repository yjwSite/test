var utils={
	setTraceBox:function(){
		utils.init()
		utils.traceBox=jQuery("<div>test</div>");
		utils.traceBox.css({"color":"black"});
		
		utils.traceBox.css({"top":"0.5em","left":"0.5em","z-index":100000,"position":"fixed","color":"red","font-size":"1em"});	
		
		jQuery("body").append(utils.traceBox);
		window["trace"]=function(txt){
			utils.traceBox.html(utils.traceBox.html()+"<br />"+String(txt));
		}
		window["trace2"]=function(txt){
			utils.traceBox.html(String(txt));
		}
	},
	
	setScaleBase:function(){
		var scaleBox=jQuery("<div></div>");
		scaleBox.css({"position":"absolute","top":"100px","left":"20px","z-indx":100,
		"background-color":"red","width":"200px","height":"10px"});
		jQuery("body").append(scaleBox);
		window["setScale"]=function(l,t){
			if(!l){l=0;}
			if(!t){t=0;}
			scaleBox.css({"left":l+"px","top":t+"px"})
		}
	},
	
	hiddenTraceBox:function(){
				utils.traceBox.css({"visibility":"hidden"});
	},
	
	ua:null,
	dv:null,
	
	init:function(){
		
		var transition=false;
		var vp;//vender prefix
		var transitionEnd;
		var animationEnd;
		
		var ua=navigator.userAgent;
		utils.ua=ua;
		utils.ipad;
		utils.android;
		
		//scrollTop Element
		utils.scrollelement=( ua.indexOf('WebKit') > 0 )?jQuery("body"):jQuery('html');
		
		if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') == -1){
		//for tablet
			utils.tablet=true;
		 }else if(ua.indexOf('iPod') > 0 ||ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0){
			utils.sp=true;
		 }else{
			utils.pc=true;
		 }
		
		//animation transitionの判定
	
		 var props = ['WebkitTransition', 'MozTransition', 'OTransition', 'transition','transitionProperty','msTransform'];
		 var events= ['webkitTransitionEnd','transitionend','oTransitionEnd','transitionend','transitionend' ];
		 var events_a= ['webkitAnimationEnd','animationend','oAnimationEnd','animationend','animationend' ];
		
		var bodyElement=document.getElementsByTagName("body");
		//console.log("bodyElement="+bodyElement)
	
		for ( var n in props ){
		  if (document.getElementsByTagName("body")[0].style[ props[n]] !== undefined){
			  if(!transition){
				 transition=true;
				  switch (n){
							case "0":vp= "-webkit-";break;
							case "1":vp= "-moz-";break;
							case "2":vp= "-o-";break;
							case "3":vp= "";break;
							case "4": vp= "";break;
							case "5": vp= "-ms-";transition=false;break;
				  }
	
				  transitionEnd=events[n];
				  animationEnd=events_a[n];
			  }
		  }
		 }
		
		utils.transitionEnd=transitionEnd;
		utils.animationEnd=animationEnd;
		utils.transition=transition;
		utils.vp=vp;
		
		if(ua.indexOf('Chrome')>-1){
				utils.Browser="chrome";
		}else if(ua.indexOf('Safari')> -1){
			if(ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1){
				
				utils.Browser="iPhone";
				
				if(ua.indexOf('iPad') > -1){
					utils.ipad=true;	
				}
			}else if(ua.indexOf('iPod')  > -1){
				utils.Browser="iPad"
			}else if(ua.indexOf('Android') > -1){
				utils.android=true;
				utils.Browser="iPhone";
				//utils.Browser="ie9";
			}else{
				utils.Browser="safari";
			}
			
			
		}else if(ua.indexOf('Firefox')> -1){
			utils.Browser="firefox";	
		}else if(ua.indexOf('Opera')> -1){
			utils.Browser="opera";	
		}else if(ua.indexOf('MSIE 9')> -1){
			utils.Browser="ie9";	
		}else if(ua.indexOf('MSIE 8')> -1){
			utils.Browser="ie8";
		}else if(ua.indexOf('MSIE 7')> -1){
			utils.Browser="ie7";
		}else if(ua.indexOf('MSIE 6')> -1){
			utils.Browser="ie6";
		}else{
			//ie10,11を含む
			utils.Browser="atherWebBrowsew";
		}
		
		if(ua.indexOf("MSIE")>-1){
			//ie10以下
			utils.dv="ie";
		}else if(utils.Browser=="iPhone"||utils.Browser=="iPad"||utils.Browser=="Android"){
			utils.dv="sp";
		}else{
			utils.dv="mb";
		}
		
		if(utils.ua.indexOf('Windows NT') > -1 && utils.ua.indexOf('ARM')>-1){
				//windows tablet
				utils.serface=true;
		}
	},
		
	Browser:null,
	
	blink:function(){
		
		jQuery(this).stop().css({"opacity":0}).animate({opacity:1},500,"easeOutCubic");
	},
	blink2:function(){
		//ƒuƒŠƒ“ƒN;
		jQuery(this).stop().css({"opacity":0.5}).delay(100).animate({opacity:0.8},1500,"easeOutCubic");
	},
	
	unselectable:function(obj){
		//‘I‘ð•s‰Â‚É‚·‚é;
		obj.attr("onSelectStart", "return false;");
		obj.attr("onMouseDown", "return false;");
		obj.css({"-moz-user-select": "none", "-khtml-user-select": "none", "user-select":"none"});
		obj.focus(function(){jQuery(this).blur()})
	},
	
	jump:function(url,target){
		//ƒŠƒ“ƒNæ‚ÖƒWƒƒƒ“ƒv;
		if(target=="_blank"){
			var win=window.open(url,"win1");
		}else{
			window.location.href=url;	
		}
	},
	
	hitCheck:function(obj,mousep){
		var objQt=obj.length;
		var key=false;
		
		for(var n=0;n<objQt;n++){
			var minX,minY,maxX,maxY;
			var targetObj=jQuery(obj[n]);
			var offset=targetObj.offset()
			 minX=offset.left;
			 maxX=minX+targetObj.width();
			 minY=offset.top;
			 maxY=minY+targetObj.height();
		
			 if(mousep.x>minX && mousep.x<maxX && mousep.y>minY && mousep.y<maxY){
				 return true; 
				 break;
			 }
		}
		
		return false;
	},
	
	getImageSize:function(image){
		//‰æ‘œƒTƒCƒYŽæ“¾
		var run, mem, w, h, key = "actual";
 
		// for Firefox, Safari, Google Chrome
		if ("naturalWidth" in image) {
			return {width: image.naturalWidth, height: image.naturalHeight};
		}
		if ("src" in image) { // HTMLImageElement
			if (image[key] && image[key].src === image.src) {return  image[key];}
			 
			if (document.uniqueID) { // for IE
				w = jQuery(image).css("width");
				h = jQuery(image).css("height");
				
			} else { // for Opera and Other
				mem = {w: image.width, h: image.height}; // keep current style
				jQuery(this).removeAttr("width").removeAttr("height").css({width:"",  height:""});    // Remove attributes in case img-element has set width  and height (for webkit browsers)
				w = image.width;
				h = image.height;
				image.width  = mem.w; // restore
				image.height = mem.h;
			}
			return image[key] = {width: w, height: h, src: image.src}; // bond
		}
		 
		// HTMLCanvasElement
		return {width: image.width, height: image.height};
	},
	

	
	
	changeEase:function(props,time,ease,stepfunc,endfunc){
		//イージングで運動,props[0]がstartValue,props[1]がEndValue
		if(ease==null){
			ease=jQuery.easing.def;
		}
		
		var FRAME_RATE=25;//40frame/sec;

		var count=0;

		var propNum=0;

		var timer;
		var stopObj={stop:function(){clearTimeout(timer)}};
	
		var startProp=props[0];
		var stopProp=props[1];
		

		var totalDiv=Math.floor(time/FRAME_RATE);
		
		var d=time;
		var difProp=(stopProp-startProp)
		
		setProp();
		
		function setProp(){
			
			var x=count/totalDiv;
			var t=FRAME_RATE*count;
			
			var val=jQuery.easing[ease](x, t, 0, 1, d);
			
			count+=1;
		
			var nowProp=startProp+val*difProp;
			
			
			if(count<totalDiv){
				stepfunc(nowProp);
				timer=setTimeout(setProp,FRAME_RATE);
			}else{
				if(endfunc instanceof Function){
					clearTimeout(time)
					endfunc(stopProp);
				}
			}
		}
		return stopObj;
	},
	
	
	checkPointInner:function(polygon,point){
	        var cn = 0;
	        for(var i = 0; i < polygon.length - 1; i++){
	            // 上向きの辺。点Pがy軸方向について、始点と終点の間にある。ただし、終点は含まない。(ルール1)
	            if( ((polygon[i].y <= point.y) && (polygon[i+1].y > point.y))
	            // 下向きの辺。点Pがy軸方向について、始点と終点の間にある。ただし、始点は含まない。(ルール2)
	                || ((polygon[i].y > point.y) && (polygon[i+1].y <= point.y)) ){
	            // ルール1,ルール2を確認することで、ルール3も確認できている。
	            
	                // 辺は点pよりも右側にある。ただし、重ならない。(ルール4)
	                // 辺が点pと同じ高さになる位置を特定し、その時のxの値と点pのxの値を比較する。
	                vt = (point.y - polygon[i].y) / (polygon[i+1].y - polygon[i].y);
	                if(point.x < (polygon[i].x + (vt * (polygon[i+1].x - polygon[i].x)))){
	                    ++cn;
	                }
	            }
	        }
	        var result=(cn%2==0)?false:true;
	      	return result;
	},
	
	addEvent:function(obj,str,func){
		//イベント設置
		//obj.dispatchEvent(ev)またはobj.dispatchEvent(new Event(str))でイベント発生
		var ev=document.createEvent("HTMLEvents");
		ev.initEvent(str, true, true);
		obj.addEventListener(str,func,false);
		return ev;
	},
	
	removeEvent:function(obj,str,func){
		obj.removeEventListener(str,func);
	},

	getTotal:function(ar){
		//数字の配列の合計を求める
		var result=0;
		var num=ar.length;
		for(var n=0;n<num;n++){
			result+=ar[n];
		}
		return result;
	},
	setAnimeEnd:function(obj,func){
		obj.addEventListener(utils.animationEnd,function(e){
			obj.removeEventListener(utils.animationEnd,arguments.callee);
			if(func instanceof Function){
				//コールバック
				func(obj);
			}
		},false);
	},
	
	setTransEnd:function(obj,func){
		obj.addEventListener(utils.transitionEnd,function(e){
			obj.removeEventListener(utils.transitionEnd,arguments.callee);
			if(func instanceof Function){
				//コールバック
				func(obj);
			}
		},false);
	},
	
	checkDeviceFontSize:function(){

		if(utils.Browser!="ie8" && utils.Browser!="ie7" && utils.Browser!='ie6'){
			var m=jQuery("<span>");
			m.css({"font-size":"10px","opacity":0});
			m.text("測定基準字")
			jQuery("body").append(m);
			var fontSize=Math.floor(5000/m.width())/100;

			if(fontSize<0.95){
				//cssルールを追加

				var style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
				style.type = 'text/css';
				var stylesheet = document.styleSheets.item(1);//既存スタイルを取得
				var idx = stylesheet.cssRules.length;

				//末尾に追加
				stylesheet.insertRule("html:not(:target) body{ font-size: "+14*fontSize+"px !important;}", idx);
				/*stylesheet.insertRule("p { font-size: "+14*fontSize+"px;}", idx+1);
				stylesheet.insertRule("#copyright { font-size: "+12*fontSize+"px;}", idx+2);*/
			}
			m.remove();
		}
	}
}

//画像切り替え
$(function(){
    var $setElem = $('.switch'),
    pcName = '_pc',
    spName = '_sp',
    replaceWidth = 767;
 
    $setElem.each(function(){
        var $this = $(this);
        function imgSize(){
            var windowWidth = parseInt($(window).width());
            if(windowWidth >= replaceWidth) {
                $this.attr('src',$this.attr('src').replace(spName,pcName)).css({visibility:'visible'});
            } else if(windowWidth < replaceWidth) {
                $this.attr('src',$this.attr('src').replace(pcName,spName)).css({visibility:'visible'});
            }
        }
        $(window).resize(function(){imgSize();});
        imgSize();
    });
});