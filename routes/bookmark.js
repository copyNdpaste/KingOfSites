
/*var addBookmark=function(database,bmurl,bmname,bmimage,callback){
    console.log('addBookmark 호출됨: '+bmurl+', '+bmname+', '+bmimage);
    database.BookmarkModel.find({bmname:bmname},function(err,results){
        console.log('bmname:',bmname);
        if(results.length>0){
            console.log('길이:',results.length);
            console.log('즐겨찾기 이름이 중복됨');
            callback(err,results);
        }else{
            console.log('즐겨찾기 등록 가능'); //DB에 값 없을 때 출력
            var bm=new database.BookmarkModel({"bmurl":bmurl,"bmname":bmname,"bmimage":bmimage});
            bm.save(function(err){
               
                console.log('사이트 추가함');
                console.log(bm);
                callback(null,bm);
            });
            //callback(null,null);
        }
    });
};*/
/*var addBookmark=function(database,bmurl,bmname,bmimage,callback){
    console.log('addBookmark 호출됨: '+bmurl+', '+bmname+', '+bmimage);
    var bm=new database.BookmarkModel({"bmurl":bmurl,"bmname":bmname,"bmimage":bmimage});
    bm.save(function(err){
        if(err){
            callback(err,null);
            return;
        }
        console.log('사이트 추가함');
        callback(null,bm);
    });
};*/
/*
var siteViewer=function(database,callback){
    console.log('siteViewer 호출됨');
    database.BookmarkModel.find({},function(err,results){
        if(err){
            callback(err,null);
            console.log('db에 데이터 없음');
            return;
        }
        if(results.length>0){
            console.log('즐겨찾기 찾음');
            callback(null,results);
        }else{
            console.log('즐겨찾기 못찾음'); //DB에 값 없을 때 출력
            callback(null,null);
        }
    });
};*/

var images=function(req, res) {
	console.log('/process/bookmarkadding 호출됨.'); //config.js의 설정과 route_loader에 의해 실행됨
    var database=req.app.get('database');
    try{
        var paramUrl=req.body.bookmarkUrl; //html 파일에서 입력된 input 값들
        var paramName=req.body.bookmarkName;
        var file=req.files; //요청된 파일
        var imgpath=file[0].path; //업로드할 이미지 경로
                
        console.log('file정보: ');
        console.log(file);
        console.log(imgpath);
        console.log('요청 파라미터들:'+paramUrl+', '+paramName);

        if(database){
            addBookmark(database,paramUrl,paramName,imgpath,function(err,result){
                if(err) throw err;
                if(result){
                    console.dir(result);
                    res.render('addbookmark',{user:req.user});
                }else{
                    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                    res.write('<h2>사이트 추가 실패</h2>');
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
/*
var viewer=function(req,res){
    var database=req.app.get('database');
    console.log('즐겨찾기 보기, siteViewer() 호출');
    if(database){
        siteViewer(database,function(err,results){//즐겨찾기 찾으면 callback으로 results받아옴
            //여기에 ejs 파일 렌더링 res.render('mysite',data);
            console.log('results의 값:',results);
            if(results==null){
                res.render('index',{user:req.user});
            }else{
                res.render('mysite',{results:results,user:req.user});
                console.log('mysite 불러오기');
                console.log(results);   
            }
        });
    }
};*/

/*var mainpage=function(req,res){
    console.log('mainpage 호출됨');
    res.render('addbookmark',{user:req.user});
};
*/
var navtest=function(req,res){
    console.log('navtest 호출됨');
    res.render('navtest',{user:req.user});
}


/*
var addbookmark=function(req,res){
    console.log('/process/addbookmark 패스 요청됨.');
        if(!req.user){
            console.log('사용자 인증 안된 상태임.');
            res.render('index.ejs',{login_success:false,user:req.user});
        }else{
            console.log('사용자 인증된 상태');
            res.render('addbookmark.ejs',{login_success:true,user:req.user});
        }
};*/
/*
var siteview=function(req,res){
    console.log('/process/siteview 패스 요청됨.');
    //console.log('req.user의 정보');
    //console.dir(req.user);
    // 인증 안된 경우
    if (!req.user) {
        console.log('사용자 인증 안된 상태임.');
        //res.render('index.ejs', {login_success:false});
        res.render('mainbookmark.ejs', {login_success:false,user:req.user});
    } else {
        console.log('사용자 인증된 상태임.');
        //res.render('index.ejs', {login_success:true});
        viewer(req,res);
    }
};*/
var deleteone=function(database,fname,sname,callback){
    console.log('deleteone 호출됨');
    console.log('삭제할 폴더: '+fname+'이름: '+sname);
    database.FolderModel.deleteOne({foldername:fname,bmname:sname},function(err,results){
        console.log('삭제 완료');
        if(err){
            console.log('삭제 중 에러 발생');
            callback(err,null);
            return;
        }else{
            callback(null,results);
        }
    });
};
var del=function(req,res){
    //$(document).on("click",".forinsertmodal",function(){
    console.log('remove 호출');
    var database=req.app.get('database');

    var fname=req.body.fname;
    var sname=req.body.sname;
    console.log(fname,sname);
    //});
    console.log('즐겨찾기 삭제, deleteone() 호출');
    if(database){
        deleteone(database,fname,sname,function(err,results){
            console.log('삭제됨',results);
            if(results){//result가 있으면 사이트 삭제 성공한 것임.
                database.FolderModel.distinct("foldername",function(err,folders){
                    if(folders.length>0){//폴더 있음
                        console.log('folders:',folders);
                        database.FolderModel.find({},function(err,sites){
                            if(sites.length>0){//폴더,사이트 있음
                                console.log('sites:',sites);
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
            }else{
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>폴더 추가 실패</h2>');
                console.dir(results);
                res.end();
            }
        });
    }
};

var about=function(req,res){
    console.log('about 호출됨');
    res.render('about',{user:req.user});
};
var howto=function(req,res){
    console.log('howto 호출됨');
    res.render('howto',{user:req.user});
};
module.exports.images=images;
//module.exports.viewer=viewer;
//module.exports.mainpage=mainpage;
module.exports.navtest=navtest;
module.exports.del=del;
module.exports.about=about;
module.exports.howto=howto;
//module.exports.addbookmark=addbookmark;
//module.exports.siteview=siteview;