/**
 * Created by windowss on 2017/6/5.
 */
$(function() {
    initFun();
    function initFun() {

        ajGet(paths["lwFind"], "", function (datas) {
            var yiji = [];

            for (var i = 0; i < datas.results.length; i++) {


                if (datas.results[i].lwTier == "0") {
                    var erji = {
                        "yijis": datas.results[i],
                        "yijisId": datas.results[i].objectId,
                        "erjis": []
                    };
                    yiji.push(erji)
                } else {
                    for (var j = 0; j < yiji.length; j++) {
                        if (datas.results[i].lwTier == yiji[j].yijisId) {
                            yiji[j].erjis.push(datas.results[i]);
                        }
                    }
                }
            }
            //console.log(yiji);


            var leaveWordHtml = '<dt><h3>留言版</h3><h6 id="communication">交流</h6></dt>';

            for (var i = 0; i < yiji.length; i++) {

                var erjiHtml = '';
                var yijiOj = yiji[i].yijis;
                for (var j = 0; j < yiji[i].erjis.length; j++) {
                    var erjiOj = yiji[i].erjis[j];
                    erjiHtml += '<li><div class="nameAndImg"><img src="images/test.jpg"><span class="accName">' + erjiOj.lwName + '</span><span>回复</span><span class="accName">'+erjiOj.lwOjName+'</span></div> ' +
                        '<p>' + erjiOj.lwText + '</p>' +
                        ' <p class="LeaWordTime"><span>' + erjiOj.createdAt + '</span>  <span class="lWreply" data-pid="' + erjiOj.lwTier + '" data-namep="' + erjiOj.lwName + '">回复</span></p>' +
                        '</li>'
                }

                leaveWordHtml += '<dd><ul>' +
                    '<li class="initText"><div class="nameAndImg"><img src="images/test.jpg"><span class="accName">' + yijiOj.lwName + '</span><!--<span>回复</span><span class="accName">鸟树下睡觉的猪</span>--></div> ' +
                    '<p>' + yijiOj.lwText + ' </p>' +
                    ' <p class="LeaWordTime"><span>' + yijiOj.createdAt + '</span>  <span class="lWreply" data-pid="' + yiji[i].yijisId + '" data-namep="' + yijiOj.lwName + '">回复</span></p>' +
                    '</li>' + erjiHtml + '</ul></dd>'
            }

            $("#leaveWords").html(leaveWordHtml);

            //$("#leaveWords").scrollTop(1000);
            //点击回复
            $(".lWreply").unbind().on("click", function () {

                var scrTop=$(this).offset().top-($(window).height()-$(".leaveForm").height());
                if(scrTop-$(document).scrollTop()> -30){
                    $("html body").scrollTop(scrTop+50);
                }



           /*     console.log($(window).height()-$(".leaveForm").height());
                console.log($(this).offset().top-$(document).scrollTop());*/

                $(".leaveForm").addClass("leaveFormFlx");
                $(".leaveWords").eq(0).css("padding-bottom",$(".leaveForm").css("height"));


                $("#leaveWordsTitle").attr("data-pid", $(this).attr("data-pid")).attr("data-namep",$(this).attr("data-namep")).html('<h4>回复:' + $(this).attr("data-namep")+'</h4><a id="cancel" href="javascript:void(0);">取消回复</a>');
                $("#cancel").unbind().on("click", function () {
                    cancelFun();
                });
            });

            //交流
            $("#communication").unbind().on("dblclick", function () {
                var value = prompt('输入交流验证码：', '');






                if(value == null){
                    alert('你取消了输入！');
                }else if(value == ''){
                    alert('姓名输入为空，请重新输入！');
                    //show_prompt();
                }else{
                    //alert('你好，'+value);
                    ajGet(paths["comVerify"],"captcha="+value, function (datas) {

                        console.log(datas);
                        if(datas.code=="1"){
                            window.location.href="../resume/index.html";
                        }else if(datas.code=="0"){
                            alert('验证未通过');
                        }
                    })
                }

                //window.location.href="../resume/index.html";
            })

        });



    }
    function cancelFun(){
        $(".leaveForm").removeClass("leaveFormFlx");
        $(".leaveWords").eq(0).css("padding-bottom","10px");

        //$("#myModal").modal('show');
        $("#leaveWordsTitle").attr("data-pid","0").attr("data-namep","").html('<h4>留言</h4>');
        $(".leaveForm input").val("");$(".leaveForm textarea").val("");$(".leaveForm p").hide();
    }

    //留言
    $("#accLeWould").on("click", function () {
        var lwName=$("#leWoName"),lwEmail=$("#leWoEmil"),lwWords=$("#leWords");
        lwName.val()==""?lwName.parent("li").find("p").show():lwName.parent("li").find("p").hide();
        lwEmail.val()==""?lwEmail.parent("li").find("p").show():lwEmail.parent("li").find("p").hide();
        lwWords.val()==""?lwWords.parent("li").find("p").show():lwWords.parent("li").find("p").hide();

        //var urlEnd = 'lwName=' + $("#leWoName").val() + '&lwEmail=' + $("#leWoEmil").val() + '&lwText=' + $("#leWords").val() + '&lwTier=0&lwOjName=""';
        var urlEnd = 'lwName=' + lwName.val() + '&lwEmail=' + lwEmail.val() + '&lwText=' + lwWords.val() + '&lwTier=' + $("#leaveWordsTitle").attr("data-pid")+'&lwOjName='+$("#leaveWordsTitle").attr("data-namep");

        console.log(lwName.val()!="",lwEmail.val()!="",lwWords.val()!="");
        if(lwName.val()!=""&&lwEmail.val()!=""&&lwWords.val()!=""){
            ajGet(paths["lwInserts"], urlEnd, function (datas) {
                initFun();
                console.log(datas);
                cancelFun();
                //location.reload();
            })
        }

    });

})
