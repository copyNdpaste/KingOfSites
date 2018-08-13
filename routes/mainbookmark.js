/*이 부분에서 클릭 되자마자 폴더, 사이트 출력하기.
우선 폴더부터 생성.*/
var path=require('path');
var bmname;
var mainbookmark=function(req,res){//네비에서 mainbookmark 클릭되면 mainbookmark.ejs 렌더링
    console.log('/process/mainbookmark 패스 요청됨.');
    var database=req.app.get('database');
    // 인증 안된 경우
    if (!req.user) {
        console.log('사용자 인증 안된 상태임.');
        //res.render('index.ejs', {login_success:false});
        res.render('index.ejs', {login_success:false,user:req.user});
    } else {
        console.log('사용자 인증된 상태임.');
        //폴더 찾는 ajax... 해서 rendering 시 폴더 값들 넘기기.
        console.log('distinct 호출');
        
        database.FolderModel.distinct("foldername",function(err,folders){
            console.log('folders:',folders);
            if(folders.length>0){//폴더 있음
                console.log('폴더 찾음');
                
                database.FolderModel.find({},function(err,sites){
                    console.log('sites:',sites);
                    if(sites.length>0){//폴더,사이트 있음
                        console.log('sites 찾음');
                        res.render('mainbookmark.ejs', {login_success:true,user:req.user,folders:folders,sites:sites});
                    }else{
                        console.log('아무 것도 못찾음'); //DB에 값 없을 때 출력
                    }
                });
            }else{
                console.log('폴더 못찾음'); //DB에 값 없을 때 출력
                res.render('mainbookmark.ejs',{login_success:true,user:req.user});
            }
        });
    }
};
var findsites=function(req,res){
    var database=req.app.get('database');
    console.log('findsites 호출됨');
    database.FolderModel.find({},function(err,sites){
        console.log('sites',sites);
        if(sites.length>0){//폴더,사이트 있음
            console.log('sites 찾음');
            //res.render('ajaxtest.ejs',{sites:sites});
        }else{
            console.log('아무 것도 못찾음'); //DB에 값 없을 때 출력
        }
    });
};
var addFolder=function(database,foldername,userid,callback){
    console.log('addFoler 호출됨: '+foldername+', '+userid);
    database.FolderModel.find({foldername:foldername,userid:userid},function(err,results){
        console.log('foldername:',foldername,'userid:',userid);
        if(results.length>0){//폴더 중복
            console.log('길이:',results.length);
            console.log('폴더 이름이 중복됨');
            callback(err,results);
        }else{
            console.log('폴더 등록 가능'); //DB에 값 없을 때 출력
            var folder=new database.FolderModel({"foldername":foldername,"userid":userid});
            folder.save(function(err){//중복되는 폴더 없으면 추가.
                console.log('폴더 추가함');
                console.log(folder);
                callback(null,folder);
            });
        }
    });
};
var createfolder=function(req, res) {
	console.log('/process/createfolder 호출됨.'); //config.js의 설정과 route_loader에 의해 실행됨
    var database=req.app.get('database');
    try{
        var paramName=req.body.folderName;//client에서 ajax로 보낸 input value
        var paramId=req.user.facebook.email;
        console.log('요청 파라미터들: '+paramName+', '+paramId);
        if(database){
            addFolder(database,paramName,paramId,function(err,result){
                if(err) throw err;
                if(result){//result가 있으면 DB에 폴더 추가 성공한 것임.
                    console.log('result: ',result,'user: ',req.user);
                    console.dir(result);//폴더 내용
                    /*폴더 추가 후 폴더 검색하고 출력*/
                    database.FolderModel.distinct("foldername",function(err,folders){
                        if(folders.length>0){//폴더 있음
                            //res.render('index.ejs');
                            console.log('folders:',folders);
                            database.FolderModel.find({},function(err,sites){
                                if(sites.length>0){//폴더,사이트 있음
                                    console.log('sites:',sites);
                                    //res.render('index.ejs');
                                    //res.redirect('/views/ajaxtest.ejs');
                                    res.render('mainbookmark.ejs', {login_success:true,user:req.user,folders:folders,sites:sites});
                                    //res.render('ajaxtest.ejs',{sites:sites});
                                }else{
                                    console.log('아무 것도 못찾음'); //DB에 값 없을 때 출력
                                }
                            });
                            ////////////////////////////////
                            //res.render('ajaxtest.ejs', {login_success:true,user:req.user,folders:folders,sites:sites});
                        }else{
                            console.log('폴더 못찾음'); //DB에 값 없을 때 출력
                            res.render('mainbookmark.ejs',{login_success:true,user:req.user});
                        }
                    });
                    /*database.FolderModel.find({/userid:paramId},function(err,results){
                        if(err){
                            //callback(err,null);
                            console.log('db에 데이터 없음');
                            return;
                        }
                        if(results.length>0){
                            console.log('폴더 찾음, 찾은 폴더 수: ',results.length);
                            console.log('폴더 명:',results);
                            //res.send({results:results,user:req.user});//찾은 폴더 ajax client에 넘겨주기
                            //res.send({results:results,user:req.user});//찾은 폴더 ajax client에 넘겨주기
                            res.render('ajaxtest',{folders:results,user:req.user});
                            //callback(null,results);
                        }else{
                            console.log('폴더 못찾음'); //DB에 값 없을 때 출력
                            //callback(null,null);
                        }
                    });*/
                    //res.send({result:result,user:req.user});//res.render하면 새로고침 됨. ajax를 호출한 클라이언트로 객체 넘겨줌.
                    //res.render('ajaxtext',{user:req.user});
                }else{
                    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                    res.write('<h2>폴더 추가 실패</h2>');
                    console.dir(result);
                    res.end();
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

var distinctfolder=function(req,res){
    var database=req.app.get('database');
    console.log('distinctfolder 호출됨');
    database.FolderModel.distinct("foldername",function(err,results){
        console.log('folders',results);
        if(results.length>0){//폴더 있음
            res.send({results:results});
        }else{
            console.log('폴더 못찾음'); //DB에 값 없을 때 출력
        }
    });
};

var findfolder=function(req,res){
    var database=req.app.get('database');
    console.log('distinctfolder 호출됨');
    database.FolderModel.distinct("foldername",function(err,results){
        console.log('folders',results);
        if(results.length>0){//폴더 있음
            res.send({results:results});
        }else{
            console.log('폴더 못찾음'); //DB에 값 없을 때 출력
        }
    });
};

/*var findsites=function(req,res){
    var database=req.app.get('database');
    console.log('findsites 호출됨');
    database.FolderModel.aggregate([
    {
        $group : {
            _id : {
                foldername:"$foldername",
                total:{$sum:1},
                bmname:{$max:"$bmname"},
                bmurl:{$max:"$bmurl"},
                bmimage:{$max:"$bmimage"},
                date:{$max:"$date"}
            }
        }
    },
    {
        $project : {
            bmname:1,
            total:1
        }
    }],function(err,sites){
        console.log('sites',sites);
        if(sites){//sites 있음
            res.render('ajaxtest',{sites:sites});
        }else{
            console.log('sites 못찾음'); //DB에 값 없을 때 출력
        }
    });
};*/

module.exports.mainbookmark=mainbookmark;
module.exports.createfolder=createfolder;
module.exports.distinctfolder=distinctfolder;
module.exports.findfolder=findfolder;
module.exports.findsites=findsites;