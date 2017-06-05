(function(ns){
	ns.pageOpenBtnActive=true;
	ns.nowPageNum=0;
	ns.lastPageNum=0;
	ns.pageImgLinkActive=false;
	ns.menuBtnActive=true;
	
	ns.drawW;
	ns.drawH;
	ns.halfP;
	ns.canvas;
	ns.context;
	ns.timer;
	ns.pageImages;
	ns.pageOpenBtn;
	
	
	var nowPageClock;
	var lastPageClock;
	var pagesBox;
	var pagesboxText;
	
	var loadEnd;
	var initEnd;
	var winW,winH;
	
	var loadCount=0;
	var pageImagesSrc=["main_play","main_learn","main_celebrate","circle_black","circle_red"];
	var menuImagesSrc=["sbtn_over","sbtn_over_black","sbtn_white","btn_over","btn_over_black","btn_white"];
	
	ns.pageImages=[];
	
	var indexPage;
	var linkBtn;
	var pageSlideBtns;
	var pageComments;
	
	var pageOpenState;
	var mainImage;
	var pageMainR;
	var pageMainMouseOn;
	var mainImageCenter;
	var eightSlideTimer;
	var linkInterval=2000;
	var jumpState;
	

	
	ns.initPageChange=function(){
		
		ns.pageOpenBtn=$("#content .btns img");
		var modalBack=$("#modal_back");
		var menuBtnBox=$("#menu_btn_box");
		pageSlideBtns=$("#page_pointers [class^='pointer']");
		pageSlideBtns.each(function(index, element) {
            $(element).data("num",index+1);
        });
		pageComments=$("#page_comment p");
		pagesBox=$("#pages_box");
		pagesboxText=$("#pages_box .main_images .text");
		
		indexPage=$("#index_page");
		linkBtn=$("#pages_box .link_btn")
		mainImage=$("#pages_box .main_img");
		
		menuBtnBox.click(function(){
			//trace("click,ns.menuBtnActive="+ns.menuBtnActive)
			if(ns.menuBtnActive){
				ns.menuBtnActive=false;
				menuBtnClick();
				ns.nowPageNum=0;
			}
		})
		
		pageSlideBtns.click(function(){
			var num=$(this).data("num");
			if(utils.Browser=="ie8"){
				pageSlide8(num);
			}else{
				pageSlide(num);
			}
		})
		
		linkBtn.click(function(){
			linkBtnTreger();
		})
		
		
		
	
		pagesBox.click(pagesBoxClickHl);

		pagesboxText.click(pagesboxTextClickHl);
		if(utils.pc){
			pagesboxText.mouseover(pagesboxTextMouseoverHl)
		}
		
		
		if(utils.Browser!=="ie8"){
			ns.pageOpenBtn.mouseover(function(){
				
				if(ns.pageOpenBtnActive){
					var num=$(this).attr("class").replace("zoom","").replace("btn","");
					ns.clockBox.showPointerHalo(num)
				}
			})
		}
		
	
		
		ns.pageOpenBtn.click(function(){
			if(ns.pageOpenBtnActive){
				ns.menuBtnActive=false;
				ns.pageOpenBtnActive=false;
				$(this).removeClass("zoom")
				var num=$(this).attr("class").replace(" zoom","" ).replace("btn","");
				//trace("num="+num)
				ns.nowPageNum=0;
				//ns.clockBoxはie8を切り分け済
				ns.clockBox.openPage(Number(num));
			}
		})
		
	
		
		ns.pageOpenEnd=function(num){
			//trace("ns.pageOpenEnd")
			//トップページのチェンジページアニメーション終了後にコール
			if(num==1||num==2||num==3|num==4||num==5){
				//リンク	
				var href="";
				switch(num){
					case 1:	href="./funny/";break;
					case 2:	href="./learn/";break;
					case 3:	href="./celebrate/";break;
					case 4:	href="./contact/";break;
					case 5:	href="./topics/";break;
				}
				window.location.href=href;
				
				
				ns.pageOpenBtnActive=true;
				ns.menuBtnActive=true;
				ns.clockBox.resumeTopPage();
				
			}else if(num==0){
				//indexページ表示
				
				setTimeout(function(){
					ns.menuBtnActive=true;
					if(utils.Browser=="ie9"||menuBtnBox.hasClass("android")){
						var ieBtn = $('#ie_btn',menuBtnBox);
						modalBack.removeClass("hide").addClass("show");
						modalBack.unbind();
						$(".close",ieBtn).addClass("show");
						$(".open",ieBtn).removeClass("show");
						ieBtn.addClass("show");
						ns.pageImgLinkActive=false;
						ns.menuOpen();
						
					}
				},500);
				ns.nowPageNum=0;
			}else{
				pagesBox.addClass("show");
				pageComments.removeClass("show");
				if(utils.Browser=="ie8"){
					pageSlide8(num);
				}else{
					pageSlide(num,"left");
				}
				
				linkBtn.removeClass("disactive");
				
				menuBtnClick();
				ns.menuBtnActive=true;
				ns.pageOpenBtnActive=true;
				
			}
			pageOpenState=true;			
			
			loadEnd=true;	
		}
		
		ns.resumeTopPageEnd=function(){
			//ページクローズ’アニメーション終了後にコール
			//trace("resumeTopPageEnd")
			setTimeout(function(){
				ns.menuBtnActive=true;
				pageComments.removeClass("show");
			},500)
		}	
		
		
		
		ns.pageSlideEnd=function(){
			ns.pageSlide=false;
		}
		
		
		
		function menuBtnClick(){
			//trace("menuBtnClick")
			if(utils.Browser=="ie8" || utils.Browser=="ie9"||menuBtnBox.hasClass("android")){
				var ieBtn = $('#ie_btn',menuBtnBox)
				modalBack.removeClass("show");
                if($(".close",ieBtn).hasClass("show")&&pageOpenState){
					//モーダル消去、トップページへ
					//trace("モーダル消去、トップページへ")
					//trace(pageOpenState)
					nowPageClock=null;
					lastPageClock=null;
					$(".close",ieBtn).removeClass("show");
					$(".open",ieBtn).addClass("show");
					ns.pageImgLinkActive=false;
					ns.clockBox.resumeTopPage();
					pagesBox.removeClass("show");
					ns.menuClose();//メニュー消しindexmenu.js
					pageOpenState=false;
					pagesBox.removeClass("on");
					indexPage.removeClass("show");
					
					pagesboxText.removeClass("show hideleft hideright");
					//ns.menuBtnActive=true;
					ns.pageOpenBtnActive=true;
					if(eightSlideTimer){
						clearTimeout(eightSlideTimer);
					}
					pagesboxText.removeClass("show");
					pageComments.removeClass("show");
					pageSlideBtns.removeClass("active");
					
					
				}else if($(".open",ieBtn).hasClass("show")){
					//モーダル表示、インデックスページ表示
					modalBack.removeClass("hide").addClass("show");
					modalBack.unbind();
					$("#front_flame").removeClass("dark");
					if(utils.Browser=="ie8"){
						
						
						
							$(".close",ieBtn).addClass("show");
							$(".open",ieBtn).removeClass("show");
							ieBtn.addClass("show");
							ns.pageImgLinkActive=false;
							ns.menuOpen();
							if(ns.nowPageNum==0){
								ns.clockBox.openPage(0);
								indexPage.addClass("show");
								ns.resizeHl();
							}else{
								linkBtn.removeClass("disactive");
								
							}
					}else{
					//ie9とAndroid
					//モーダル出る、個別メニュー
					//
					if(ns.nowPageNum==0){
							ns.clockBox.openPage(0);
							indexPage.addClass("show");
							
						}else{ 
							linkBtn.removeClass("disactive");
							
						}
						//trace("モーダル出る、個別メニュー2")	
						$(".open",ieBtn).removeClass("show");
						$(".close",ieBtn).addClass("show");
						$("#front_flame").addClass("dark");
					}
					
				}
                
            }else{
				//trace("menuBtnClick")
				if(!$(".open",menuBtnBox).hasClass("show")&&pageOpenState){
					
					linkBtn.addClass("disactive");
					
					//モーダル消去、トップページへ
					modalBack.addClass("hide");
					pagesBox.addClass("hide");
					
					$("#front_flame").removeClass("dark");
					utils.setTransEnd(modalBack[0],function(){
						if(modalBack.hasClass("show")){
							modalBack.removeClass("show hide");
							ns.menuClose();
							pagesBox.removeClass("show hide");
							pagesboxText.removeClass("show hideleft hideright");
							pageComments.removeClass("show");
							nowPageClock=null;
							lastPageClock=null;
							pageOpenState=false;
							//ns.menuBtnActive=true;
							ns.pageOpenBtnActive=true;
						}
						//仮ns.menuBtnActive=true;
					});
					
					$(".open",menuBtnBox).addClass("show");
					menuBtnBox.removeClass("on rotate");
					ns.pageImgLinkActive=false;
					ns.clockBox.resumeTopPage();
					if(ns.nowPageNum==0){
						//インデックスページを消す
						
						indexPage.addClass("hide");
						utils.setTransEnd(indexPage[0],function(){
							indexPage.removeClass("show hide");
						});
					}
					
					pagesBox.removeClass("on");
					
				}else{
					//trace("モーダル表示,pageOpenState="+pageOpenState)
					if(!pageOpenState){
						
						//モーダル表示、インデックスページ表示
						modalBack.removeClass("hide").addClass("show");
						modalBack.unbind();
						//trace("unbind");
						$(".open",menuBtnBox).removeClass("show");
						$("#front_flame").addClass("dark");
						menuBtnBox.addClass("on")
						ns.pageImgLinkActive=false;
						
						utils.setTransEnd(modalBack[0],function(){
							ns.menuOpen();
						});
						if(ns.nowPageNum==0){
							nowPageClock=null;
							indexPage.addClass("show");
							
							ns.clockBox.openPage(0);
						}
						//trace(ns.pageOpenBtnActive)
					}
					
				}
            }
            
		}
		initEnd=true;
		
	}
	
	function pageSlide8(num){
		if(num!=ns.nowPageNum){
			ns.nowPageNum=num;
			$( mainImage).removeClass("show");
			$(mainImage).eq(ns.nowPageNum-1).addClass("show");
			pagesboxText.removeClass("show");
			pagesboxText.eq(ns.nowPageNum-1).addClass("show");
			pageSlideBtns.removeClass("active");
			pageSlideBtns.eq(num-1).addClass("active");
			pageComments.removeClass("show");
			pageComments.eq(ns.nowPageNum-1).addClass("show");
			
			ns.pageResize(winW,winH)
			if(eightSlideTimer){
				clearTimeout(eightSlideTimer);
			}
			eightSlideTimer=setTimeout(function(){
				var newNum=ns.nowPageNum+1;
				if(newNum>3){
					newNum=1;	
				}
				pageSlide8(newNum)
			},6000)
					
			
		}
		
	}
/*	
	function pageSlide(num,dir){
		//ページチェンジ後のスライド発生
		
		if(num!=ns.nowPageNum){
			if(ns.nowPageNum!=0){
				lastPageClock=nowPageClock;
				nowPageClock=null;
				
				lastPageClock.slideCount=0;
				if(dir){
					lastPageClock.hideDir="left";
				}else{
					if(ns.nowPageNum==1&&num==2||ns.nowPageNum==2&&num==3||ns.nowPageNum==3&&num==1){
						lastPageClock.hideDir="left";
					}else{
						lastPageClock.hideDir="right";
					}
				}
			}
			pageSlideBtns.removeClass("active");
			pageSlideBtns.eq(num-1).addClass("active");
			nowPageClock=new pageClock(num);
			nowPageClock.init();
			if(dir){
				nowPageClock.showDir="right";
			}else{
				if(ns.nowPageNum==1&&num==2||ns.nowPageNum==2&&num==3||ns.nowPageNum==3&&num==1){
					nowPageClock.showDir="right";
				}else{
					nowPageClock.showDir="left";
				}
			}
			
			ns.nowPageNum=num;
			ns.pageSlide=true;
		}
	}
	*/
	//var cCount=0;
	
	function pageChange(nowNum,nextNum,dir){
		
		//ページの切換え
		pageSlide(nextNum,dir)
		
	}
	
	function pageClock(num){
		this.prototype=Object;
		this.x;
		this.y;
		this.w;
		this.h;
		this.serialNum=num-1;
		this.showDir;
		this.hideDir;
		var img;
		var overImg;
		var slideCourDiv=25;
		this.slideCount;
		this.scale=1;
		this.startTime;
		this.nowTime;
		var changeInterval=6000;
		var dispatchObj;
		var HallowCount=0;
		var HallowCountMax=0;
		//trace("new pageClock")
		
		this.init=function(){
			//img=ns.pageImages[this.serialNum];
			img=ns.mouseOverImages[this.serialNum][0];
			overImg=ns.mouseOverImages[this.serialNum][1];
			
			
			this.slideCount=0;
			this.w=this.h=ns.drawW*0.754*this.scale;
			this.x=(winW+this.w)/2;
			this.y=0;
			dispatchObj=utils.addEvent(pagesBox[0],"slideEnd",function(){
				
				nowPageClock.clockStart();
				ns.pageSlide=false;
			})
			
			
		};
		
		
		
		this.slideRender=function(){	
		
		
			var slideResio=this.slideCount/slideCourDiv;
			
			this.w=this.h=ns.drawW*0.754*this.scale;
			
			
			this.y=(ns.drawH-this.h)/2-ns.drawH*0.055;
			this.x=Math.pow((1-slideResio),3)*(winW+this.w)/2;
			if(ns.canvasDoubleSize){
				this.x*=2;
			}
			if(this.showDir=="left"){
				this.x*=-1;
			}
			var startP={
				x:ns.halfP.x+this.x-this.w/2,
				y:ns.halfP.y-this.y-this.h/2
			}
			var endP={
				x:startP.x+this.w,
				y:startP.y+this.h
			};
			var circleR=this.w*1/2*0.5;
			ns.context.save();
			ns.context.beginPath();
			ns.context.drawImage(img,startP.x,startP.y,endP.x-startP.x,endP.y-startP.y)
			ns.context.restore();
			
			if(slideResio==1){
				pagesBox[0].dispatchEvent(dispatchObj);
				pagesboxText.eq(this.serialNum).removeClass("hideleft hideright").addClass("show");
				pageComments.eq(this.serialNum).addClass("show");
			}else{
				this.slideCount+=1;
			}
			
			
		}
		
		this.slideOutRender=function(){
			var slideResio=this.slideCount/slideCourDiv;
			this.w=this.h=ns.drawW*0.754*this.scale;
			
			this.y=(ns.drawH-this.h)/2-ns.drawH*0.055;
			if(this.hideDir=="left"){
				this.x=-Math.pow((slideResio),0.2)*(winW+this.w)/1.85;
			}else{
				this.x=Math.pow((slideResio),0.2)*(winW+this.w)/1.85;
			}
			if(ns.canvasDoubleSize){
				this.x*=2;
			}
			var startP={
				x:ns.halfP.x+this.x-this.w/2,
				y:ns.halfP.y-this.y-this.h/2
			}
			var endP={
				x:startP.x+this.w,
				y:startP.y+this.h
			};
			var circleR=this.w*1/2*0.5;
			ns.context.save();
			ns.context.beginPath();
			ns.context.globalAlpha=Math.pow(1-slideResio,3);			
			ns.context.drawImage(img,startP.x,startP.y,endP.x-startP.x,endP.y-startP.y)
			ns.context.restore();
			if(slideResio==0){
				if(this.hideDir=="left"){
					pagesboxText.eq(this.serialNum).addClass("hideleft");
				}else{
					pagesboxText.eq(this.serialNum).addClass("hideright");
				}
				pageComments.eq(this.serialNum).removeClass("show");
			}
			
			if(slideResio==1){
				//pagesBox[0].dispatchEvent(dispatchObj);
				lastPageClock=null;
				
			}else{
				this.slideCount+=1;
			}
		}
		
		this.clockStart=function(){
			
			this.startTime=Number(new Date());
		}
		
		this.clockRender=function(){
			
			this.nowTime=Number(new Date())-this.startTime;
			var clockResio=this.nowTime/changeInterval;
			if(clockResio>1){
				clockResio=1;
				var nextNum=this.serialNum+1;
				if(nextNum>2){nextNum=0}
				setTimeout(function(){
					pageChange(this.serialNum+1,nextNum+1,"left");
				},200)
			}
			this.w=this.h=ns.drawW*0.754*this.scale;
			this.y=(ns.drawH-this.h)/2-ns.drawH*0.055;
			this.x=0;
			var circleR=this.w*1/2;
			
				var startP={
				x:ns.halfP.x+this.x-this.w/2,
				y:ns.halfP.y-this.y-this.h/2
			}
			var endP={
				x:startP.x+this.w,
				y:startP.y+this.h
			};
			
			
			
			ns.context.save();
			ns.context.beginPath();
			ns.context.fillStyle="rgba(0,0,0,0.12)";
			ns.context.arc(ns.halfP.x,ns.halfP.y-this.y,circleR,0,Math.PI*2);
			ns.context.fill();
			ns.context.closePath();
			ns.context.beginPath();
			ns.context.moveTo(ns.halfP.x,ns.halfP.y-this.y);
			ns.context.fillStyle="rgba(255,0,0,0.5)";
			ns.context.arc(ns.halfP.x,ns.halfP.y-this.y,circleR,-Math.PI/2,-Math.PI/2+(Math.PI*2)*clockResio);
			ns.context.fill();
			ns.context.closePath();
			ns.context.restore();
			
			var resio=HallowCount/HallowCountMax;
			var easeResio=Math.pow(1-resio,5);
			
			ns.context.beginPath();
			
			ns.context.drawImage(img,startP.x,startP.y,endP.x-startP.x,endP.y-startP.y);
			//ns.context.restore();
			
			if(HallowCount<HallowCountMax){
				
				ns.context.fillStyle="rgba(255,255,255,"+Math.pow(1-resio,0.7)+")";
				ns.context.arc(ns.halfP.x,ns.halfP.y-this.y,circleR*0.93,0,Math.PI*2);
				ns.context.fill();
				ns.context.closePath();
				ns.context.globalAlpha=resio;
			}
			if(HallowCount<HallowCountMax){
				ns.context.globalAlpha=easeResio;
				//ns.context.save();
				
			
				/*ns.context.lineWidth=circleR/40;
				ns.context.strokeStyle="rgba(255,255,255,"+easeResio*0.2+")";
				ns.context.arc(ns.halfP.x,ns.halfP.y-this.y,circleR+circleR*0.2*resio,0,Math.PI*2);
				ns.context.closePath();
				ns.context.stroke();*/
				
				ns.context.drawImage(overImg,startP.x,startP.y,endP.x-startP.x,endP.y-startP.y);
				//ns.context.globalAlpha=1;
				
				
				
				HallowCount+=1;
				
			}
			ns.context.restore();
		}
		
		this.showHallow=function(){
				HallowCount=0;
				HallowCountMax=10;
		}
	}
	
	
	ns.pageSlideRender=function(){
		//スライド中のレンダリング
		
		if(initEnd&&loadEnd){
			if(lastPageClock){
				lastPageClock.slideOutRender();
			}
			if(nowPageClock){
				nowPageClock.slideRender();
			}
		}
	}
	
	ns.pageClockRender=function(){
		//クロック動作中のレンダリング
		if(initEnd&&loadEnd){
			if(nowPageClock){
				nowPageClock.clockRender();
			}else{
				//index_page表示
			}
		}
	}
	
	ns.pageResize=function(w,h){
		winW=w;
		winH=h;
		if(initEnd){
			pagesboxText.css("width",w/2);
			pageMainR=mainImage.width()/2;
			
			var offset=mainImage.offset();
			mainImageCenter={
				x:offset.left+pageMainR,
				y:offset.top+pageMainR
			}
			
			var breakH=540;
			if(h<breakH){
				var borderWidth=Math.floor(5*h/breakH);
				$("#front_flame").css("border-width",borderWidth+"px")
			}else{
				$("#front_flame").attr("style","");
			}
		}
		
		if(ns.yoko){
			$("#page_comment").addClass("yoko");
		}else{
			$("#page_comment").removeClass("yoko");
		}
	}
	
	
	
	ns.pageChangeMousemoveHl=function(p){
		try{
			var difX=p.x-mainImageCenter.x;
			var difY=p.y-mainImageCenter.y;
			var R=Math.sqrt(Math.pow(difX,2)+Math.pow(difY,2));
			if(utils.Browser!="ie8"){
				if(pageOpenState&&initEnd&&loadEnd){
					if(!ns.pageSlide){
						
						
						if(pageMainR>R && !pageMainMouseOn){
							pageMainMouseOn=true;
							pagesBox.addClass("on");
							nowPageClock.showHallow();
						}else if(pageMainR<=R && pageMainMouseOn){
							pageMainMouseOn=false;
							pagesBox.removeClass("on");
						}
					}
				}
			}else{
				if(pageMainR>R && !pageMainMouseOn){
					pageMainMouseOn=true;
					pagesBox.addClass("on");
				}else if(pageMainR<=R && pageMainMouseOn){
					pageMainMouseOn=false;
					pagesBox.removeClass("on");
				}
			}
		}catch(e){
			
		}
		
		/*ポインターマウスアウト*/
		if(ns.haloPointer && !ns.haloPointer.hideHalo){
			
			var difX=p.x-ns.halfP.x-ns.haloPointer.x;
			var difY=p.y-ns.halfP.y+ns.haloPointer.y;
			var distance=Math.sqrt(Math.pow(difX,2)+Math.pow(difY,2));
			
			var limitR=ns.haloPointer.clipR*0.966
			if(limitR>ns.haloPointer.w &&distance>limitR){
				
				ns.pageOpenBtn.eq(ns.haloPointer.serialNum).removeClass("zoom")
				ns.clockBox.hidePointerHalo();
				//ns.haloPointer=null;
			}else if(limitR<=ns.haloPointer.w){
				//limitR>ns.haloPointer
			}
		}
	}
	
	function pagesBoxClickHl(e){
		
		if(utils.pc){
			
			if(pageMainMouseOn&&!ns.pageSlide){
				
				linkBtnTreger();
				pageMainMouseOn=false;
			}
			
		}else{
			if(!ns.pageSlide){
				var difX=e.pageX-mainImageCenter.x;
				var difY=e.pageY-mainImageCenter.y;
				var R=Math.sqrt(Math.pow(difX,2)+Math.pow(difY,2));
				if(pageMainR>R){
					linkBtnTreger()
				}
			}
		}
	}
	
	function linkBtnTreger(){
			if(!jumpState){
				jumpState=true;
				setTimeout(function(){
					jumpState=false;
				},linkInterval);
				
				if(ns.nowPageNum!=0){
						var href;
						switch(ns.nowPageNum){
							case 1:href="./funny/";break;
							case 2:href="./learn/";break;
							case 3:href="./celebrate/";break;
						}
						
						window.location.href=href;
				}
			}
		}
	
	function pagesboxTextClickHl(){
		
		if(!ns.pageSlide && $(this).hasClass("show")){
			linkBtn.trigger("click");
		}
	}
	
	function pagesboxTextMouseoverHl(e){
		if(utils.Browser!="ie8"&& utils.dv=="mb"){
			var difX=e.pageX-mainImageCenter.x;
			var difY=e.pageY-mainImageCenter.y;
			var R=Math.sqrt(Math.pow(difX,2)+Math.pow(difY,2));
			if(pageMainR<R ){
				if(!ns.pageSlide && $(this).hasClass("show")){
					nowPageClock.showHallow();
				}
			}
		}
	}
	
	ns.pageChangeDrawBox=function(contentW,contentH,contentLeft,contentTop){
		//ページのサイズ決定
		if(contentH*1.1+contentTop>winH){
			if(utils.pc){
				var dif=-7.6+Math.round(((contentH*1.1+contentTop)-winH)/contentH*1000)/10;
				if(dif>5){dif=5}
				linkBtn.css("bottom",dif+"%");
			}else{
				if(ns.yoko){
					linkBtn.css({
						"bottom":8+"%",
						"right":"-12%",
						"min-width":"10px"});
				}else{
					linkBtn.attr("style","");
				}
			}
		}else{
			linkBtn.attr("style","");
		}
	}
	
	
})(ns)
