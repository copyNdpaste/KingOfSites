var Schema={};
Schema.createSchema=function(mongoose){
    console.log('createSchema 호출됨');
    
    var BookmarkSchema=mongoose.Schema({
        bmpath:{type:String},
        bmurl:{type:String,required:true},
        bmname:{type:String},
        bmimage:{type:String}
    });
    console.log('bookmark schema 정의함');
    
    return BookmarkSchema;
}

module.exports=Schema;