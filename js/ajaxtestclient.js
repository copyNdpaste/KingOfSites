$(function(){
    $('#createfolder').click(function(){
        console.log('createfolder 버튼 눌림');//브라우저 console창에 표시됨.
        $.ajax({
            url:'/process/createfolder',//버튼 클릭 시 해당 path로 요청, config.js에서 연결 설정. ajaxtestserver.js의 creafolder 함수 실행
            dataType:'json',
            type:'POST',
            data:{
                folderName:$('#folderName').val() //ajaxtest.ejs에서 입력한 folderName의 value를 서버로 보냄
            },
            success:function(results,user){
                /*ajax 성공하면 받아온 result로 생성된 폴더 뿌리기..*/
                console.log('ajax success!');//브라우저 콘솔에 출력
                console.log('결과 값 result: ',results,'result 길이:',results.results.length,'user: ',user);
                //var foldername=result.result.foldername;
                var html='';
                var results=results.results;
                for(var i=0;i<results.length;i++){
                    /*html+='<div><button class="btn btn-primary">'+results[i].foldername+'</button>'
                    +'<button class="btn btn-primary">사이트 추가</button>'
                    //사이트 추가하기.
                    +
                    +'</div>';*/
                    //foldername에 따라 사이트 출력
                    html+='<div class="jumbotron"><button class="btn btn-primary" id="'+results[i].foldername+'">'+results[i].foldername+'</button>'
                    +'<a href="" class="btn btn-info btn-rounded" data-toggle="modal" data-target="#darkModalForm">사이트 추가</a>'
                    //사이트 추가하기.
                    
                    +'</div>';
                }
                //$('#print').html(html);
            }
        });
    });
 });
