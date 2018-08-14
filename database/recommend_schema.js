var Schema={}
Schema.createSchema=function(mongoose){
    console.log('recommend createSchema 호출됨');
    var RecommendSchema=mongoose.Schema({
        name:{type:String},
        url:{type:String},
        explain:{type:String},
        category:{type:String}
    });
    return RecommendSchema;
}
module.exports=Schema;