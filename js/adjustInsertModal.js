$(document).on("click",".foradjustmodal",function(){//수정 버튼
    console.log('foradjustmodal 호출');
    var fname=$(this).data('folder');
    var sname=$(this).data('name');
    var url=$(this).data('url');
    console.log(fname,sname,url);
    $("#adjustfolder").val(fname);
    $("#adjustname").val(sname);
    $("#adjusturl").val(url);
});
$(document).on("click",".forinsertmodal",function(){//추가 버튼
    console.log('forinsertmodal 호출');
    var fname=$(this).data('folder');
    $("#insertfolder").val(fname);
});