/**
 * Created by windowss on 2017/6/5.
 */
$(function() {
    initFun("1");
    function initFun(pages) {
        console.log("pages----",pages);
        ajGet(paths["lwFinds"],'pages='+pages+'&pageSize=5', function (datas) {
            console.log(datas);
            datas.length==5?$("#addList").show():$("#addList").hide();
            var leaveWordHtml ='';
            for (var i = 0; i < datas.length; i++) {

                var vfpHtml = '';
                var stairOj = datas[i].stairOj;
                for (var j = 0; j < datas[i].vfpArr.length; j++) {
                    var vfpOj = datas[i].vfpArr[j];
                    vfpHtml += '<li><div class="nameAndImg"><img src="images/test.jpg"><span class="accName">' + vfpOj.lwName + '</span><span>回复</span><span class="accName">'+vfpOj.lwOjName+'</span></div> ' +
                        '<p>' + vfpOj.lwText + '</p>' +
                        ' <p class="LeaWordTime"><span>' + vfpOj.createdAt + '</span>  <span class="lWreply" data-pid="' + vfpOj.lwTier + '" data-namep="' + vfpOj.lwName + '">回复</span></p>' +
                        '</li>'
                }

                leaveWordHtml += '<dd><ul>' +
                    '<li class="initText"><div class="nameAndImg"><img src="images/test.jpg"><span class="accName">' + stairOj.lwName + '</span><!--<span>回复</span><span class="accName">鸟树下睡觉的猪</span>--></div> ' +
                    '<p>' + stairOj.lwText + ' </p>' +
                    ' <p class="LeaWordTime"><span>' + stairOj.createdAt + '</span>  <span class="lWreply" data-pid="' + datas[i].stairId + '" data-namep="' + stairOj.lwName + '">回复</span></p>' +
                    '</li>' + vfpHtml + '</ul></dd>'
            }
            $("#leaveWords").append(leaveWordHtml);

            lWreplyfun();
        });

    }

    //输入框格式化
    function cancelFun(){
        $(".leaveForm").removeClass("leaveFormFlx");
        $(".leaveWords").eq(0).css("padding-bottom","10px");

        //$("#myModal").modal('show');
        $("#leaveWordsTitle").attr("data-pid","0").attr("data-namep","").html('<h4>留言</h4>');
        $(".leaveForm input").val("");$(".leaveForm textarea").val("");$(".leaveForm p").hide();
    }
    //交流
    $("#communication").unbind().on("dblclick", function () {
        var value = prompt('输入交流验证码：', '');
        if(value == null){
            alert('你取消了输入！');
        }else if(value == ''){
            alert('姓名输入为空，请重新输入！');
        }else{
            ajGet(paths["comVerify"],"captcha="+value, function (datas) {
                if(datas.code=="1"){
                    window.location.href="../resume/index.html";
                }else if(datas.code=="0"){
                    alert('验证未通过');
                }
            })
        }

        //window.location.href="../resume/index.html";
    })
    //点击回复
    var lWreplyThis=null;
    function lWreplyfun(){
        $(".lWreply").unbind().on("click", function () {
            lWreplyThis=$(this);
            //点击回复后当前对象位置低于输入框则滚动到输入框上部
            var scrTop=$(this).offset().top-($(window).height()-$(".leaveForm").height());
            if(scrTop-$(document).scrollTop()> -30){
                $("html body").scrollTop(scrTop+50);
            }

            /* console.log($(window).height()-$(".leaveForm").height());
             console.log($(this).offset().top-$(document).scrollTop());*/

            $(".leaveForm").addClass("leaveFormFlx");
            $(".leaveWords").eq(0).css("padding-bottom",$(".leaveForm").css("height"));
            $("#leaveWordsTitle").attr("data-pid", $(this).attr("data-pid")).attr("data-namep",$(this).attr("data-namep")).html('<h4>回复:' + $(this).attr("data-namep")+'</h4><a id="cancel" href="javascript:void(0);">取消回复</a>');
            $("#cancel").unbind().on("click", function () {
                cancelFun();
            });
        });
    }

    //更多
    var initPage=1;
    $("#addList").on("click",function(){ initPage+=1;initFun(String(initPage))});
    //留言
    $("#accLeWould").on("click", function () {
        var lwName=$("#leWoName"),lwEmail=$("#leWoEmil"),lwWords=$("#leWords");
        lwName.val()==""?lwName.parent("li").find("p").show():lwName.parent("li").find("p").hide();
        lwEmail.val()==""?lwEmail.parent("li").find("p").show():lwEmail.parent("li").find("p").hide();
        lwWords.val()==""?lwWords.parent("li").find("p").show():lwWords.parent("li").find("p").hide();

        //var urlEnd = 'lwName=' + $("#leWoName").val() + '&lwEmail=' + $("#leWoEmil").val() + '&lwText=' + $("#leWords").val() + '&lwTier=0&lwOjName=""';
        var urlEnd = 'lwName=' + lwName.val() + '&lwEmail=' + lwEmail.val() + '&lwText=' + lwWords.val() + '&lwTier=' + $("#leaveWordsTitle").attr("data-pid")+'&lwOjName='+$("#leaveWordsTitle").attr("data-namep");

        console.log(lwName.val()!="",lwEmail.val()!="",lwWords.val()!="");
        //console.log(lWreplyThis.attr("data-pid"));
        if(lwName.val()!=""&&lwEmail.val()!=""&&lwWords.val()!=""){
            ajGet(paths["lwInserts"], urlEnd, function (datas) {
                console.log(datas);
                //initFun("1");

                if($("#leaveWordsTitle").attr("data-pid")=="0"){
                    var appHt='<dd><ul>' +
                        '<li class="initText"><div class="nameAndImg"><img src="images/test.jpg"><span class="accName">' + lwName.val() + '</span></div> ' +
                        '<p>' + lwWords.val() + ' </p>' +
                        ' <p class="LeaWordTime"><span>' + datas.createdAt + '</span>  <span class="lWreply" data-pid="' + datas.objectId + '" data-namep="' + lwName.val() + '">回复</span></p>' +
                        '</li></ul></dd>';
                    $("#leaveWords dt").after(appHt);
                    $("html body").scrollTop(0);
                }else{
                    var appHt='<li><div class="nameAndImg"><img src="images/test.jpg"><span class="accName">' + lwName.val()+ '</span><span>回复</span><span class="accName">'+$("#leaveWordsTitle").attr("data-namep")+'</span></div> ' +
                        '<p>' + lwWords.val() + '</p>' +
                        ' <p class="LeaWordTime"><span>' + datas.createdAt + '</span>  <span class="lWreply" data-pid="' + $("#leaveWordsTitle").attr("data-pid") + '" data-namep="' + lwName.val() + '">回复</span></p>' +
                        '</li>'
                    lWreplyThis.parents("ul").append(appHt);
                }
                lWreplyfun();
                cancelFun();
                //location.reload();
            })
        }

    });

})
