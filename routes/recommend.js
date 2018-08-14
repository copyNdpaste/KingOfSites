var showrec=function(req,res){
    console.log('/process/recsites 패스 요청됨.');
    var database=req.app.get('database');
    // 인증 안된 경우
    if (!req.user) {
        console.log('사용자 인증 안된 상태임.');
        res.render('index.ejs', {login_success:false,user:req.user});
    } else {
        console.log('사용자 인증된 상태임.');
        console.log('recsites 호출');
        res.render('recsites.ejs', {login_success:true,user:req.user});
/*
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
        });*/
    }
};

module.exports.showrec=showrec;