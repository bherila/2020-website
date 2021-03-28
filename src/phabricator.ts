import got from 'got'
const phabricatorURI = process.env.PHABRICATOR_URI || 'https://phab.bherila.net/api'
const phabricatorToken = process.env.PHABRICATOR_API_TOKEN
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

interface CreateTaskResult {
  success: boolean
  message?: string
  error_code?: string
}

export async function createTask(taskData): Promise<CreateTaskResult> {
  const url = `${phabricatorURI}/maniphest.createtask`
  const user = userMap.find((item) => item.telegramUser == taskData.username)
  const body = {
    'api.token': phabricatorToken,
    title: taskData.title,
    ownerPHID: user?.phabricatorPHID,
  }
  try {
    const success = got.post(url, { form: body })
    const response = JSON.parse(await success.json())
    if (response.result) {
      return {
        success: false,
        message: 'Task has been successfully created!',
      }
    } else {
      console.error('success.body.error_code', response.error_code)
      return { success: false, error_code: response.error_code }
    }
  } catch (error) {
    console.error('catch block error in create task', error)
  }
  //{"result":null,"error_code":"ERR-INVALID-AUTH","error_info":"API token \"AAHYaH9zv9HT5vjBbwN-G1f7itdOUqmWsjg\" has the wrong length. API tokens should be 32 characters long."}
  //{"result":{"id":"11","phid":"PHID-TASK-xss3u7w7dx6ilqzknqkl","authorPHID":"PHID-USER-qxytksntdxaqzfdtymat","ownerPHID":null,"ccPHIDs":["PHID-USER-qxytksntdxaqzfdtymat"],"status":"open","statusName":"Open","isClosed":false,"priority":"Needs Triage","priorityColor":"violet","title":"test task by lavkesh","description":"","projectPHIDs":[],"uri":"https:\/\/phab.bherila.net\/T11","auxiliary":[],"objectName":"T11","dateCreated":"1616504923","dateModified":"1616504923","dependsOnTaskPHIDs":[]},"error_code":null,"error_info":null}
}

interface MyTasksResult {
  success: boolean
  message?: string
  error_code?: string
}

export async function myTasks(taskData): Promise<MyTasksResult> {
  const url = `${phabricatorURI}/maniphest.search`
  const body = {
    'api.token': phabricatorToken,
    'constraints[statuses][0]': 'open',
  }
  const user = userMap.find((item) => item.telegramUser === taskData.username)
  let completeMessage = 'No task found.'
  if (!user) {
    return {
      success: false,
      message: completeMessage,
    }
  }

  body['constraints[assigned][0]'] = user.phabricatorPHID
  const success = await got.post(url, { form: body })
  const response = JSON.parse(success.body)
  if (response.result) {
    const taskList = (response.result.data as any[])
      .map(
        (item) =>
          `<a href="https://phab.bherila.net/T${item.id}">${item.fields.name}</a>`,
      )
      .join('\n')
    if (taskList) {
      completeMessage = 'Here are your open tasks. \n' + taskList
      return {
        success: true,
        message: completeMessage,
      }
    } else {
      return {
        success: true,
        message: 'You have no open tasks',
      }
    }
  }
  return { success: false, error_code: response.error_code }
}
