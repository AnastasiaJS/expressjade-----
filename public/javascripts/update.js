function updateInfo(){
    console.log("==============================================")
    var formData = new FormData($("#update")[0]);
    $.ajax({
        url: '/update2',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data){
            if(200 === data.code) {
                $("#headerPic").attr('src', data.msg.url);
                $("#spanMessage").html("成功");
            } else {
                $("#spanMessage").html("失败");
            }
            console.log('imgUploader upload success, data:', data);
        },
        error: function(){
            $("#spanMessage").html("与服务器通信发生错误");
        }
    });
}