/*$(function(){
    $('#deletefolder').click(function(){
        console.log('deletefolder 버튼 눌림');//브라우저 console창에 표시됨.
        $.ajax({
            url:'/process/deletefolder',//버튼 클릭 시 해당 path로 요청, config.js에서 연결 설정. ajaxtestserver.js의 creafolder 함수 실행
            dataType:'json',
            type:'POST',
            data:{
                folderName:$('#folderName').val() //ajaxtest.ejs에서 입력한 folderName의 value를 서버로 보냄
            },
            success:function(results,user){
                console.log('페이지 이동');
                window.location.replace('index.ejs');
            }
        });
    });
 });
*/