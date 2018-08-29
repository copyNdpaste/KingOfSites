var sites=function(req,res){//getjob 관련된 정보 find, 출력.
    var database=req.app.get('database');
    var category=req.query.category;//path에 요청된 query 정보에 따라 달라짐.
    console.log('sites 호출, category:',category);
    if(req.user){
        console.log('req.user 1:',req.user);
        if(database){
            console.log('DB:',database);
            console.log('req.user 2:',req.user);
            database.RecommendModel.find({category:category},function(err,rec){
                if(err){console.log('sites err:',err);}else{
                    console.log('rec:',rec);
                    res.render('sites',{sites:rec,user:req.user});
                }
            });
        }else{
            res.render('sites');
        }
    }else{
        res.render('index');
    }
}
module.exports.sites=sites;