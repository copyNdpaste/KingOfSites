//$(function(){
//$(document).ready(function() {
var findsite=function(){
    console.log('findsites');//브라우저 console창에 표시됨.
    $.ajax({
        url:'/process/findsites',//버튼 클릭 시 해당 path로 요청, config.js에서 연결 설정. ajaxtestserver.js의 creafolder 함수 실행
        dataType:'json',
        type:'POST',
        success:function(sites){
            /*ajax 성공하면 받아온 result로 생성된 폴더 뿌리기..*/
            console.log('ajax success!');//브라우저 콘솔에 출력
            console.log('결과 값 sites: ',sites,'폴더 및 사이트 ',sites.length,'개');
        }
    });
};
module.exports.findsite=findsite;
//});