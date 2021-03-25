require('dotenv').config();
const phabricatorToken = process.env.PHABRICATOR_API_TOKEN;

const got = require('got');

const userMap = [
{
	telegramUser: 'bengwho',
	phabricatorUser: 'bwh',
	phabricatorPHID: 'PHID-USER-uxe5wuymmopwrrvaroud',
},
{
	telegramUser: 'auerbachb',
	phabricatorUser: 'bretton',
	phabricatorPHID: 'PHID-USER-ctgxmxk5ycdossfbktfy',
},
{
	telegramUser: 'lavkesh1608',
	phabricatorUser: 'lavkesh',
	phabricatorPHID: 'PHID-USER-qxytksntdxaqzfdtymat',
},
]

module.exports = {
	creatTask
}



function creatTask(taskData,callback){
	const url = 'https://phab.bherila.net/api/maniphest.createtask';

	const body = {
		'api.token' :phabricatorToken,
		'title' : taskData.title
	}

	const user=userMap.filter(item=>(item.telegramUser==taskData.username));
	if(user && user.length>0){
		body.ownerPHID=user[0].phabricatorPHID;
	}	

	got.post(url,{form:body}).then(success=>{
		const response = JSON.parse(success.body);
		if(response.result){
			return	callback(false,{message:'Task has been successfully created!'});
		}else{
			console.log("success.body.error_code",response.error_code)
			return callback(true,{error_code:response.error_code});
		}
		//{"result":null,"error_code":"ERR-INVALID-AUTH","error_info":"API token \"AAHYaH9zv9HT5vjBbwN-G1f7itdOUqmWsjg\" has the wrong length. API tokens should be 32 characters long."}

		//{"result":{"id":"11","phid":"PHID-TASK-xss3u7w7dx6ilqzknqkl","authorPHID":"PHID-USER-qxytksntdxaqzfdtymat","ownerPHID":null,"ccPHIDs":["PHID-USER-qxytksntdxaqzfdtymat"],"status":"open","statusName":"Open","isClosed":false,"priority":"Needs Triage","priorityColor":"violet","title":"test task by lavkesh","description":"","projectPHIDs":[],"uri":"https:\/\/phab.bherila.net\/T11","auxiliary":[],"objectName":"T11","dateCreated":"1616504923","dateModified":"1616504923","dependsOnTaskPHIDs":[]},"error_code":null,"error_info":null}

	}).catch(error=>{
		console.log("catch block error in create task",error)
	})

}