import int from './int'

export class AccountRecord {
  acct_id: number
  acct_owner: number
  acct_name: string

  constructor(body: any) {
    this.acct_id = int(body['acct_id'])
    this.acct_name = body['acct_name'] as string
    this.acct_owner = int(body['acct_owner'])
  }
}
