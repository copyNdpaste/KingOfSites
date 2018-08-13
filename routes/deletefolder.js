var deletefolder=function(req,res){
    console.log('deletefolder 호출');
    var database=req.app.get('database');
    try{
        var foldername=req.body.folderName;//client에서 ajax로 보낸 input value
        var userid=req.user.facebook.email;
        console.log(foldername+', '+userid);

        database.FolderModel.deleteMany({foldername:foldername,userid:userid},function(err,results){
            console.log('folder 삭제 후 남은 값 돌려주기');
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
        });
    }catch(e){
        console.log('삭제 안됨:',e);
        return;
    }
};
module.exports.deletefolder=deletefolder;