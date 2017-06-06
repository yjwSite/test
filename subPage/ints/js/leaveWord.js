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
            console.log(yiji);


            var leaveWordHtml = '<dt>留言版</dt>';

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

            $(".lWreply").on("click", function () {
                $("#myModal").modal('show');
                $("#myModalLabel").attr("data-pid", $(this).attr("data-pid")).attr("data-namep",$(this).attr("data-namep")).html("回复:  " + $(this).attr("data-namep"));

            })
            $(".leaveWordsTitle").on("click", function () {
                //$(".lwconts").show(200);
                $(".lwconts").toggle(200);
            })

        });

    }


    $("#accLeWould").on("click", function () {
        var urlEnd = 'lwName=' + $("#leWoName").val() + '&lwEmail=' + $("#leWoEmil").val() + '&lwText=' + $("#leWords").val() + '&lwTier=0&lwOjName=""';
        ajGet(paths["lwInserts"], urlEnd, function (datas) {
            initFun();
            console.log(datas);
            $(".lwconts").toggle(200);
            //location.reload();
        })
    });

    $("#accLeWouldHf").on("click", function () {
        var urlEnd = 'lwName=' + $("#leWoNameHf").val() + '&lwEmail=' + $("#leWoEmilHf").val() + '&lwText=' + $("#leWordsHf").val() + '&lwTier=' + $("#myModalLabel").attr("data-pid")+'&lwOjName='+$("#myModalLabel").attr("data-namep");
       console.log(urlEnd);
        ajGet(paths["lwInserts"], urlEnd, function (datas) {
            //location.reload();
            initFun();
            $("#myModal").modal('hide');
            console.log(datas);
        })
    });

})
