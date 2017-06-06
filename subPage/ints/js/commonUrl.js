/**
 * Created by windowss on 2017/6/5.
 */


//var G_admin="http://cloud.bmob.cn/6effbb0c81d35180/";
var G_admin="http://cloud.bmob.cn/406b64c2c8e3e933/";
var paths={
    "lwFind":G_admin+"lwFind",
    //"lwFind":G_admin+"lwfins",
    "lwInsert":G_admin+"lwInsert",
    "lwInserts":G_admin+"lwinserts"
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
var ajGets=function(urls,datas,succes){
    if(datas==""){}else{
        datas="?"+datas;
    }
    $.ajax({
        url:urls+datas,
        dataType:'jsonp',
        jsonp:'callback',
        success:succes,
        error:function(e){
            console.log(e);
            console.log("eeeeeeeeeee");
        }
    });
};
var ajGet=function(urls,datas,succes){
    if(datas==""){}else{
        datas="?"+datas;
    }
    $.ajax({
        url:urls+datas,
        dataType:'jsonp',
        type:'GET',
        success:succes,
        error:function(e){

            console.log("eeeeeeeeeee");
        }
    });
};


var ssT={
    "ss":222,
    'sss':333
};
delete ssT.ss;
console.log(ssT);