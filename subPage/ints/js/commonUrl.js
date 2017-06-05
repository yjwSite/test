/**
 * Created by windowss on 2017/6/5.
 */


//var G_admin="http://cloud.bmob.cn/6effbb0c81d35180/";
var G_admin="http://cloud.bmob.cn/406b64c2c8e3e933/";
var paths={
    //"lwFind":G_admin+"lwFind",
    "lwFind":G_admin+"lwfins",
    "lwInsert":G_admin+"lwInsert"
};

var ajPot=function(urls,datas,succes){
    $.ajax({
        method: 'post',
        url:urls,
        data:datas,
        dataType: 'json',
        success:succes
    });




};
var ajGet=function(urls,datas,succes){
    $.ajax({
        url:urls,
        dataType:'jsonp',
        data:datas,
        jsonp:'callback',
        success:succes
    });
};