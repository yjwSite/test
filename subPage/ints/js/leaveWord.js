/**
 * Created by windowss on 2017/6/5.
 */
$(function(){
    initFun();
    function initFun(){
        ajGet(paths["lwFind"],"",function(datas){
            console.log("ppppppppppppppp");
            console.log(datas.results);
            var yiji=[];

            for(var i=0;i<datas.results.length;i++){


                if( datas.results[i].lwTier=="0"){
                    var erji={
                        "yijis":datas.results[i],
                        "yijisId":datas.results[i].objectId,
                        "erjis":[]
                    };
                    yiji.push(erji)
                }else{
                    for(var j=0;j<yiji.length;j++){
                        if(datas.results[i].lwTier==yiji[j].yijisId){
                            yiji[j].erjis.push(datas.results[i]);
                        }
                    }
                }
            }
            console.log(yiji);


            var leaveWordHtml='<dt>留言版</dt>';

            for(var i=0;i<yiji.length;i++){

                var erjiHtml='';
                for(var j=0;j<yiji[i].erjis.length;j++){
                    var erjiOj=yiji[i].erjis[j];
                    erjiHtml+= '<li><div class="nameAndImg"><img src="images/test.jpg"><span class="accName">'+erjiOj.lwName+'</span><span>回复</span><span class="accName">鸟树下睡觉的猪</span></div> ' +
                        '<p>'+erjiOj.lwText+'</p>' +
                        ' <p class="LeaWordTime">'+erjiOj.createdAt+'</p>' +
                        '</li>'
                }
                var yijiOj=yiji[i].yijis
                leaveWordHtml+='<dd><ul>' +
                    '<li class="initText"><div class="nameAndImg"><img src="images/test.jpg"><span class="accName">'+yijiOj.lwName+'</span><span>回复</span><span class="accName">鸟树下睡觉的猪</span></div> ' +
                    '<p>'+yijiOj.lwText+' </p>' +
                    ' <p class="LeaWordTime">'+yijiOj.createdAt+'</p>' +
                    '</li>'+erjiHtml+'</ul></dd>'
            }

            $("#leaveWords").html(leaveWordHtml);



        }) ;

    }


    $("#accLeWould").on("click",function(){
      /*  ajGet(paths["lwFind"],"",function(datas){
            console.log("ppppppppppppppp");
            console.log(datas);
        }) ;*/

        var datas={
            "lwName":$("#leWoName").val(),
            "lwEmail":$("#leWoEmil").val(),
            "lwText":$("#leWords").val(),
            "lwTier":"0"
        }
        ajPot(paths["lwInsert"],datas,function(datas){
            initFun();
            console.log(datas);
        })
    });


})