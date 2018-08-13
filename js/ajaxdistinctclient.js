$(function(){
    $('#distinctfolder').click(function(){
        console.log('distinctfolder 버튼 눌림');//브라우저 console창에 표시됨.
        $.ajax({
            url:'/process/distinctfolder',//버튼 클릭 시 해당 path로 요청, config.js에서 연결 설정. ajaxtestserver.js의 creafolder 함수 실행
            dataType:'json',
            type:'POST',
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
                    html+=
  '<p><button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#'+results[i]+'" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">'+results[i]+'</button>'
+'<button class="btn btn-info btn-rounded" data-toggle="modal" data-target="#darkModalForm">사이트 추가</button>'

+'<div class="row">'
  +'<div class="col">'
    +'<div class="collapse multi-collapse" id="'+results[i]+'">'
      +'<div class="card card-body">'
        //여기에 사이트 출력
                    +'<p id="p'+results[i]+'">for site</p>'
                    +'사이트'
                    +'<form action="/process/remove" method="get">'
                    +'<input type="text" placeholder="삭제할 즐겨찾기 이름" name="deletesite">'
                    +'<button class="btn btn-secondary" type="submit">삭제</button>'
                +'</form>'   
      +'</div>'
    +'</div>'
  +'</div>'
+'</div>';
                    
                   /* html+='<div>'
                    +'<div class="container mt-3">'
                        +'<div id="accordion">'
                        +'<div class="card">'
                          +'<div class="card-header">'
                            +'<a class="card-link" data-toggle="collapse" href="#collapseOne"><button class="btn btn-primary">'+results[i]+'</button></a>'
                            +'<a href="" class="btn btn-info btn-rounded" data-toggle="modal" data-target="#darkModalForm">사이트 추가</a>'
                          +'</div>'
                          +'<div id="sdf" class="collapse show" data-parent="#accordion">'
                            +'<div class="card-body">'
                            +'</div>'
                          +'</div>'
                        +'</div>'
                    +'</div>'
                    +'</div>';*/
                }
                $('#print').html(html);
            }
        });
    });
 });
