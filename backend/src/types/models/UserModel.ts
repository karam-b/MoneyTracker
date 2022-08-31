import { ObjectId } from 'mongodb'
import { Profile } from 'passport-google-oauth20'
import { Document } from 'mongoose'

export interface IUser_google {
  refreshToken: string
  accessToken: string
  json: Profile['_json']
}

export default interface IUser {
  _id: string | ObjectId

  userName: string
  email: string
  password: string
  picture: string | undefined
  googleInfo: undefined | IUser_google
  providers: ('local' | 'google')[]

  matchPasswords: (password: string) => boolean
  withToken: () => ProfileDoc

  updatedAt: string | Date
  createdAt: string | Date
}

export type UserMongoose = IUser &
  Document<unknown, any, IUser> & {
    _id: string | ObjectId
  }

// return of withToken()
export interface ProfileDoc {
  _id: string

  userName: string
  email: string
  googleProfile: undefined | Object
  providers: ('local' | 'google')[]
  picture?: string
  createdAt: string
  updatedAt: string
  __v: number
  token: string
}

// result of this._doc
export interface ProfileRawDoc {
  _id: string

  userName: string
  email: string
  googleProfile: undefined | Object
  providers: ('local' | 'google')[]
  picture?: string
  createdAt: string
  updatedAt: string
  __v: number

  // extra password -- no token
  password?: string
}