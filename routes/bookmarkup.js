/*var path=require('path');
var bmname;

var updateBookmark=function(database,foldername,bmupdate,bmurl,bmname,bmimage,userid,callback){
    console.log('updateBookmark 호출됨: '+foldername+', '+bmupdate+', '+bmurl+', '+bmname+', '+bmimage);
    //query: 기존 bmname으로 찾기
    database.FolderModel.findOneAndUpdate({userid:userid,foldername:foldername,bmname:bmupdate},{$set:{bmname:bmname,bmurl:bmurl,bmimage:bmimage}},function(err,results){ 
        console.log('정보 수정1');
        if(err){
            callback(err,null);
            console.log('db에 데이터 없음');
            return;
        }
        if(results){
            results.foldername=foldername;
            results.bmname=bmname;
            results.bmurl=bmurl;
            results.bmimage=bmimage;
            results.userid=userid;
            console.log('results 바뀜'+results);
            callback(null,results);
        }
        callback(null,results);
    });
    console.log('정보 수정2');

};
var siteupdate=function(req, res) {
//$(document).ready(function() {
	console.log('/process/siteupdate 호출됨.'); //config.js의 설정과 route_loader에 의해 실행됨
    var database=req.app.get('database');
    console.log('req.body:',req.body);

    try{
        //form에서 받아옴
        var paramFolder=req.body.bookmarkFolder; //html 파일에서 입력된 input 값들
        var paramUrl=req.body.bookmarkUrl; //html 파일에서 입력된 input 값들
        var paramName=req.body.bookmarkName; //이 이름으로 수정됨
        var paramUpdateName=req.body.updateName;//수정하기 위해 선택된 즐겨찾기 이름
        var user=req.user.facebook.email;

        console.log('폴더명:'+paramFolder+'변경 전 즐겨찾기:'+paramUpdateName+', '+'변경 후:'+paramUrl+', '+paramName);

        var file=req.files; //요청된 파일
        console.log(res.files);
        
        if(!file){
            console.log('파일 없음');
        }else{
            console.log('file정보:');
            console.log(file);
            console.log(file[0]);
        }
        var imgpath=file[0].path; //업로드할 이미지 경로
                console.log(imgpath);
        

        if(database){
                updateBookmark(database,paramFolder,paramUpdateName,paramUrl,paramName,imgpath,user,function(err,results){
                console.log('updated:',results);
                if(err) throw err;
                if(results){
                    console.log('updatedsite로 이동');
                    console.log(results);
                    res.render('updatedsite',{results:results});
                }else{
                    res.render('siteadderror');
                }
            });
        }else{
            res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
            res.write('<h2>db 연결 실패</h2>');
            res.end();
        }
    }catch(err) {
        console.dir(err.stack);
    }		     
};

module.exports.siteupdate=siteupdate;*/