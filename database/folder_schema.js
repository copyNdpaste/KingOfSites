var Schema={};
Schema.createSchema=function(mongoose){
    console.log('createSchema 호출됨');
    
    var FolderSchema=mongoose.Schema({
        foldername:{type:String,default:Date.now},
        userid:{type:String,required:true},
        bmurl:{type:String},
        bmname:{type:String},
        bmimage:{type:String,default:'empty'},
        date: { type: Date, default: Date.now }
    });
    console.log('folder schema 정의함');
    
    return FolderSchema;
}

module.exports=Schema;