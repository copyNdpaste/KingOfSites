var uploadFile = $('.fileBox .uploadBtn');
uploadFile.on('change', function(){
    console.log('파일 업로드');
	if(window.FileReader){
		var filename = $(this)[0].files[0].name;
	} else {
		var filename = $(this).val().split('/').pop().split('\\').pop();
	}
	$(this).siblings('.fileName').val(filename);
});
var uploadFileinsert = $('.fileBoxinsert .uploadBtninsert');
uploadFileinsert.on('change', function(){
    console.log('파일 업로드');
	if(window.FileReader){
		var filename = $(this)[0].files[0].name;
	} else {
		var filename = $(this).val().split('/').pop().split('\\').pop();
	}
	$(this).siblings('.fileNameinsert').val(filename);
});
