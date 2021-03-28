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
	creatTask,
	myTasks
}



function creatTask(taskData,callback){
	const url = 'https://phab.bherila.net/api/maniphest.createtask';
	var isGivenUsernameFound=true;

	const body = {
		'api.token' :phabricatorToken,
		'title' : taskData.title
	}

	const assigneeUser=userMap.filter(item=>(item.telegramUser==taskData.assigneeUsername));
	//if assingee found
	if(assigneeUser && assigneeUser.length>0){
		body.ownerPHID=assigneeUser[0].phabricatorPHID;
		taskData.phabricatorUser=assigneeUser[0].phabricatorUser
		taskData.assigneeUsername='@'+taskData.assigneeUsername;
	}else{
		isGivenUsernameFound=false;
		//check with sender username
		const senderUser=userMap.filter(item=>(item.telegramUser==taskData.senderUsername));
		if(senderUser && senderUser.length>0){
			body.ownerPHID=senderUser[0].phabricatorPHID;
			taskData.phabricatorUser=senderUser[0].phabricatorUser;
			taskData.assigneeUsername='sender';
		}
	}		

	got.post(url,{form:body}).then(success=>{
		const response = JSON.parse(success.body);
		if(response.result){
			var taskUrl=response.result.uri;

			var completeMessage = "OK! I created this task in Phabricator and assigned it to '"+taskData.phabricatorUser+"' ("+taskData.assigneeUsername+") ";
			if(!isGivenUsernameFound){
				completeMessage+"because @"+taskData.assigneeUsername+" is not a valid assignee."
			}
			var linkPart="\n <a href='"+taskUrl+"'>Review the design mock-ups</a>";

			completeMessage=completeMessage+linkPart;

			return	callback(false,{message: completeMessage});
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

function myTasks(taskData,callback){

	/*$ curl https://phab.bherila.net/api/maniphest.search \
	-d api.token=api-token \
	-d constraints[assigned][0]=PHID-USER-uxe5wuymmopwrrvaroud \
	-d constraints[statuses][0]=open*/
	
	const url = 'https://phab.bherila.net/api/maniphest.search';
	var body = {
		'api.token' :phabricatorToken,
		'constraints[statuses][0]':'open'
	}
	const user=userMap.filter(item=>(item.telegramUser==taskData.username));
	var completeMessage='No task found.';
	if(user && user.length>0){
		body['constraints[assigned][0]'] = user[0].phabricatorPHID;
		got.post(url,{form:body}).then(success=>{
			var  response=JSON.parse(success.body);
			var taskList='';

			if(response.result){

				for(var i in response.result.data){
					taskList+='\n <a href="https://phab.bherila.net/T'+response.result.data[i].id+'">'+response.result.data[i].fields.name+'</a>';
				}
				if(taskList!=''){
					completeMessage='Here are your open tasks. \n'+taskList;
				}
				return	callback(false,{message: completeMessage});

			}else{
				return callback(true,{error_code:response.error_code});
			}
			
		})

	}else{
		return	callback(false,{message: completeMessage});

	}
}
