//Modal 출력하기.
/*$(document).on('click','#siteadding',function(){//insert modal의 버튼 클릭
        console.log('modal siteadding 버튼 눌림');//브라우저 console창에 표시됨.

        $.ajax({
            url:'/process/bookmarkinsert',//버튼 클릭 시 해당 path로 요청, config.js에서 연결 설정. ajaxtestserver.js의 creafolder 함수 실행
            dataType:'json',
            type:'POST',
            data:{
                folderName:$('#folderName').val(), //ajaxtest.ejs에서 입력한 folderName의 value를 서버로 보냄
                bookmarkUrl:$('#bookmarkurl').val(),
                bookmarkName:$('#bookmarkname').val(),
                bookmarkImage:formData
            },
            success:function(results,user){
                console.log('ajax success!');//브라우저 콘솔에 출력
                console.log('결과 값 result: ',results,'result 길이:',results.results.length,'user: ',user);
                //var foldername=result.result.foldername;
                var html='';
                var results=results.results;
                for(var i=0;i<results.length;i++){

                    html+='<div><button class="btn btn-primary">'+results[i].foldername+'</button>'
                    +'<button class="btn btn-primary" id="siteadd">사이트 추가</button>'
                    +'<a href="/process/update" class="btn btn-info btn-rounded" data-toggle="modal" data-target="#darkModalForm">수정</a>'

                    //사이트 추가하기.\
                    
                    +'</div>';
                }
                $('#print').html(html);
            }
        });
    });
*/

/*$(document).on('click','#siteadd',function(){//새로 생기는 태그를 클릭하기 위함.
    $(this).slideUp();
    console.log('siteadd 버튼 눌림');//브라우저 console창에 표시됨.
});*/