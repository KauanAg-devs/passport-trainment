import passport from 'passport'
import Local from 'passport-local'
import Crud from './crud'
import express from 'express'
import session from 'express-session'
import userModel from '../models/userModel'


declare module "express-session"{
    interface SessionData {
        email: string, password: string, id: string
    }
}


const Router = express.Router()
const crud = new Crud()

export default class Middlewares {
    public isUserAccepted(){

     

      
       Router.use(passport.initialize())
       Router.use(passport.session())

        passport.use(new Local.Strategy({usernameField: 'email'},async (email, password, done)=>{
           const foundUser = await crud.get({email, password})
           if (!foundUser) return done(null, false);           
           return done(null, foundUser) 
        }))

        passport.serializeUser((user, done)=>{
            const foundUser = user as {email: string, password: string, _id: string}
            done(null, foundUser)
        })

        passport.deserializeUser((id, done) => {
            userModel.findById(id);
        });

        Router.use(passport.authenticate('session'));



    }
    public routeDoesntExists(req: any, res: any) {
      return res.json({message: `route doesn't exists: 404`})
    }
}