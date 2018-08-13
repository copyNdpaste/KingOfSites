/*$(document).ready(function() {
    $('.forcard').click(function() {*/


/*$(document).on('click','.input',function(e){
    e.preventDefault();*/

/*$(function(){
    $('input').click(function(){*/
$(document).ready(function() {
        console.log('findcard 버튼 눌림');//브라우저 console창에 표시됨.
        $.ajax({
            url:'/process/findcard',//버튼 클릭 시 해당 path로 요청, config.js에서 연결 설정. ajaxtestserver.js의 creafolder 함수 실행
            dataType:'json',
            type:'POST',
            success:function(results,user){
                /*ajax 성공하면 받아온 result로 생성된 폴더 뿌리기..*/
                console.log('ajax success!');//브라우저 콘솔에 출력
                console.log('결과 값 result: ',results,'폴더 및 사이트 ',results.length,'개','user: ',user);
                var folder='';
                var card='';
                for(var i=0;i<results.length;i++){
                    console.log(i);
                    var foldername=results[i]._id.foldername;
                    var bmname=results[i]._id.bmname;
                    if(bmname==null) continue;
                    var bmurl=results[i]._id.bmurl;
                    var bmimage=results[i]._id.bmimage;
                    console.log('foldername:',foldername,', ','bmname:',bmname,'bmurl:',bmurl,'bmimage',bmimage);
                    if(foldername&&bmname&&bmurl&&bmimage){//일단 내용물 있을 경우만...
                        var pid='p'+foldername;
                    folder+=
                      '<p id="button'+foldername+'"><button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#'+foldername+'" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">'+foldername+'</button>'
                    +'<button class="btn btn-info btn-rounded" data-toggle="modal" data-target="#darkModalForm">사이트 추가</button></p>';

                    card+='<div class="row">'
                      +'<div class="col">'
                        +'<div class="collapse multi-collapse" id="'+foldername+'">'
                          +'<div class="card card-body">'
                        +foldername+','+bmname+bmurl+bmimage
                            //여기에 사이트 출력
                        /////////////////////////////사이트 카드 넣기....///////////////////////////////////////////////////
                    +'<div class="row">'
                        //if foldername이 현재 foldername과 같다면 그 안에 있는 내용 출력하기!!!
                        //if(foldername == )
                        //for(var i=0;i<results.length;i++){
                            +'<div class="col-sm-4">'
                            +'<div class="card">'
                                +'<div class="card-body">'
                                    +'<h4 class="card-title">'+bmname+'</h4>'
                                    +'<p class="card-text">여기에 사용자가 작성한 "사이트에 대한 설명"이 들어감</p>'
                                    +'<a href="'+bmurl+'" class="btn btn-primary btn-rounded" id="">사이트로 이동</a>'                     
                                    +'<a href="/process/update" class="btn btn-info btn-rounded" data-toggle="modal" data-target="#adjustModalForm" id="'+bmname+'">수정</a>'
                                +'</div>'
                            +'<img class="card-img-bottom" src="../'+bmimage+'" alt="Card image" style="width:100%">'
                            +'</div>'
                            +'</div>'
                        }//카드 생성
                        +'</div>'
                        ////////////////////card///////////////////////
                            +'<p id="'+pid+'">for site</p>'
                            +'사이트'
                            +'<form action="/process/remove" method="get">'
                            +'<input type="text" placeholder="삭제할 즐겨찾기 이름" name="deletesite">'
                            +'<button class="btn btn-secondary" type="submit">삭제</button>'
                            +'</form>'   
                          +'</div>'
                        +'</div>'
                      +'</div>'
                    +'</div>';
                        
                    //}//폴더명 있는지
                     

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
                    //$('#print').append(html);
                    $('#folderprint').html(folder);
                    $('#cardprint').html(card);
                }//폴더, 파일 수 for
                

                
            }//ajax success 끝
        });
    });
 //});
