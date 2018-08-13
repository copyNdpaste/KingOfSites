
/*
 * 설정
 */

module.exports = {
	server_port: 3000,
	db_url: 'mongodb://localhost:27017/local',
	db_schemas: [
	    {file:'./user_schema', collection:'users6', schemaName:'UserSchema', modelName:'UserModel'},
        {file:'./bookmark_schema',collection:'bookmark1',schemaName:'BookmarkSchema',modelName:'BookmarkModel'},
        {file:'./folder_schema',collection:'folders',schemaName:'FolderSchema',modelName:'FolderModel'}

	],
    //file:실행파일 path:route경로 method:함수이름 type:get or post #get, post 잘못 쓰면 인식 못함
	route_info: [
               // {file:'./bookmarkup',path:'/process/bookmarkup',method:'siteupdate',type:'post'},

        
        
        {file:'./bookmark',path:'/process/bookmarkadding',method:'images',type:'post'},//in a bookmark.js,req.body.bookmarkUrl;이런식으로 받으므로 type:post
       // {file:'./bookmarkupdate',path:'/process/bookmarkupdate',method:'bookmarkupdate',type:'post'},
        
        {file:'./bookmarkinsert',path:'/process/bookmarkinsert',method:'siteinsert',type:'post'},
        {file:'./bookmarkupdate',path:'/process/bookmarkupdate',method:'siteupdate',type:'post'},

        
        
        //{file:'./bookmark',path:'/process/siteview',method:'viewer',type:'get'}, //in a bookmark.js
        //{file:'./bookmark',path:'/process/addbookmark',method:'addbookmark',type:'get'}, //in a bookmark.js 
        //{file:'./bookmark',path:'/process/siteview',method:'siteview',type:'get'}, //in a bookmark.js 
        //{file:'./bookmark',path:'/process/navtest',method:'navtest',type:'get'},//
        {file:'./bookmark',path:'/process/del',method:'del',type:'post'},//즐겨찾기 삭제
        {file:'./bookmark',path:'/process/about',method:'about',type:'get'},
        {file:'./bookmark',path:'/process/howto',method:'howto',type:'get'},

        {file:'./mainbookmark',path:'/process/mainbookmark',method:'mainbookmark',type:'get'},//메인
        {file:'./mainbookmark',path:'/process/createfolder',method:'createfolder',type:'post'},
        {file:'./deletefolder',path:'/process/deletefolder',method:'deletefolder',type:'post'},
        //{file:'./ajaxtestserver',path:'/process/distinctfolder',method:'distinctfolder',type:'post'},//ajaxtext의 버튼 눌리면 실행
        
        {file:'./mainbookmark',path:'/process/findsites',method:'findsites',type:'get'}//ajaxtext의 버튼 눌리면 실행

	],
	facebook: {		// passport facebook
		clientID: '196604394366966',
		clientSecret: '5401f32b378a3c464f12edadb04b768e',
		//callbackURL: 'http://localhost:3000/auth/facebook/callback',
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