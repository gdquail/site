// models.ts

import 'dotenv/config'
import { Schema, createConnection } from 'mongoose'
import { User } from './types'

export const connection = createConnection(process.env.MONGODB_URI ?? "")

export const userSchema = new Schema<User>({
	nickname: {type:String, required:true},
	password: {type:String, required:true},
	email: {type:String, required:false}
})

export const UserModel = connection.model<User>('User', userSchema)
