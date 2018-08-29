
/*
 * 설정
 */

module.exports = {
	server_port: 3000,
	db_url: 'mongodb://localhost:27017/local',
	db_schemas: [
	    {file:'./user_schema', collection:'users6', schemaName:'UserSchema', modelName:'UserModel'},
        //{file:'./bookmark_schema',collection:'bookmark1',schemaName:'BookmarkSchema',modelName:'BookmarkModel'},
        {file:'./folder_schema',collection:'folders',schemaName:'FolderSchema',modelName:'FolderModel'},
        {file:'./recommend_schema',collection:'recommendsites',schemaName:'RecommendSchema',modelName:'RecommendModel'}
	],
    //file:실행파일 path:route경로 method:함수이름 type:get or post #get, post 잘못 쓰면 인식 못함
    //nav 페이지 이동은 type:'get'으로.
	route_info: [
        {file:'./bookmark',path:'/process/bookmarkadding',method:'images',type:'post'},//in a bookmark.js,req.body.bookmarkUrl;이런식으로 받으므로 type:post
        {file:'./bookmarkinsert',path:'/process/bookmarkinsert',method:'siteinsert',type:'post'},
        {file:'./bookmarkupdate',path:'/process/bookmarkupdate',method:'siteupdate',type:'post'},

        {file:'./bookmark',path:'/process/del',method:'del',type:'post'},//즐겨찾기 삭제
        {file:'./bookmark',path:'/process/about',method:'about',type:'get'},
        {file:'./bookmark',path:'/process/howto',method:'howto',type:'get'},

        {file:'./mainbookmark',path:'/process/mainbookmark',method:'mainbookmark',type:'get'},//메인
       // {file:'./mainbookmark',path:'/process/findsites',method:'findsites',type:'get'},
        {file:'./mainbookmark',path:'/process/createfolder',method:'createfolder',type:'post'},
        
        {file:'./deletefolder',path:'/process/deletefolder',method:'deletefolder',type:'post'},
        
        {file:'./recommend',path:'/process/recsites',method:'showrec',type:'get'},
        
        {file:'./sites',path:'/process/sites',method:'sites',type:'get'}
	],
	facebook: {		// passport facebook
		clientID: '196604394366966',
		clientSecret: '5401f32b378a3c464f12edadb04b768e',
        callbackURL: '/auth/facebook/callback',
        profileFields:['emails','name','id']

	},
	twitter: {		// passport twitter
		clientID: 'id',
		clientSecret: 'secret',
		callbackURL: '/auth/twitter/callback'
	},
	google: {		// passport google
		clientID: 'id',
		clientSecret: 'secret',
		callbackURL: '/auth/google/callback'
	}
}