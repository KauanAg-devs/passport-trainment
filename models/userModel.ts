import {model, Schema } from 'mongoose'

const userModel = model(`myColl`, new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
    }))

export default userModel