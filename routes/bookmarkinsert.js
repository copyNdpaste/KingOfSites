var path=require('path');
var bmname;

var insertBookmark=function(database,bmurl,foldername,bmname,bmimage,userid,callback){
    console.log('insertBookmark 호출됨: '+userid+', '+bmname+', '+bmurl+', '+foldername+', '+bmimage);
    //query: 기존 bmname으로 찾기
    database.FolderModel.find({userid:userid,foldername:foldername,bmname:bmname},function(err,results){
        console.log('bmname:',bmname);
        if(results.length>0){
            console.log('길이:',results.length);
            console.log('폴더 내에 즐겨찾기 이름이 중복됨');
            callback(err,results);
        }else{
            console.log('즐겨찾기 등록 가능'); //DB에 값 없을 때 출력
            var bm=new database.FolderModel({"foldername":foldername,"userid":userid,"bmurl":bmurl,"bmname":bmname,"bmimage":bmimage});
            bm.save(function(err){
                console.log('사이트 추가함');
                console.log(bm);
                callback(null,bm);
            });
        }
    });
};
var siteinsert=function(req, res){
	console.log('/process/bookmarkinsert 호출됨.'); //config.js의 설정과 route_loader에 의해 실행됨
    var database=req.app.get('database');
    try{
        //form에서 받아옴
        console.log('req.body:',req.body);
        
        var paramUrl=req.body.bookmarkUrl; //html 파일에서 입력된 input 값들
        var paramFolderName=req.body.folderName; //이 이름으로 수정됨
        var paramName=req.body.bookmarkName;//수정하기 위해 선택된 즐겨찾기 이름
        var user=req.user.facebook.email;
        var file=req.files; //요청된 파일
        var imgpath;
        console.log('url: ',paramUrl,'folder: ',paramFolderName,'name: ',paramName,'id: ',user);
        console.log('file정보: ');
        console.dir(file[0]);
        console.log(file.length);
        console.log(file[0].path);
        if(file.length!=0){
            console.log('file not empty');
            imgpath=file[0].path; //업로드할 이미지 경로
        }else{
            console.log('file empty');
            imgpath='empty';
        }
        if(database){
            insertBookmark(database,paramUrl,paramFolderName,paramName,imgpath,user,function(err,results){
                if(err) throw err;
                if(results){
                    console.log('insertedsite로 이동');
                    console.log(results);
                    res.render('insertedsite',{results:results,user:user});//추후에 폴더, 사이트 다 나오게..
                }else{
                    res.render('siteadderror');
                }
            });
        }else{
            res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
            res.write('<h2>db 연결 실패</h2>');
            res.end();
        }
    }catch(err){
        console.dir(err.stack);
    }		     
};
module.exports.siteinsert=siteinsert;