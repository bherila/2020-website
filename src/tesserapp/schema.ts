export type DataType = 'string' | 'uuid' | 'int' | 'text' | 'file'

export interface ISql {
  identityProperty: string
  searchProperties: (string | string[])[]
  columnOverride: Record<string, string>
  table: string
  readOnly?: boolean
}

export interface IKVStore {
  partitionKeyProp: string
  rowKeyProp: string
  table: string
}

export interface IEntity {
  properties: Record<string, Argument>
  sql?: ISql
  kvStore?: IKVStore
}

export type ISchema = Record<string, IEntity>

export interface StringArgument {
  type: 'string'
  required?: boolean
  minLength?: number
  maxLength?: number
  noStore?: boolean
  collection?: 'set' | 'list'
}

export interface FileArgument {
  type: 'file'
  required?: boolean
  noStore?: boolean
}

export interface OtherArgument {
  type: string
  required?: boolean
  noStore?: boolean
  collection?: 'set' | 'list'
}

export type Argument = StringArgument | FileArgument | OtherArgument

export interface Callback {
  callback: string
}

export interface IQueueJob {
  type: 'queue'
  params: Record<string, Argument>
  actions: Callback[]
}

export interface ICronJob {
  type: 'cron'
  at: string
  actions: Callback[]
}

export interface IService {}

export interface ApiDescription {
  backgroundJobs: Record<string, IQueueJob | ICronJob>
  services: Record<string, IService>
}
