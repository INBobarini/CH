import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import {Strategy as GithubStrategy} from 'passport-github2'
import * as sessionsService from "../services/sessionsService.js"
import { clientID, clientSecret, githubCallbackUrl } from '../config/githubLogin.js'
import { winstonLogger as logger } from '../utils/winstonLogger.js'
import { CustomError } from '../models/errors/customError.js'

passport.use('register', new LocalStrategy(
    { passReqToCallback: true, usernameField:'email' }, async (req, _u, _p, done) => {
        try{
            const { email, password, age, first_name, last_name } = req.body
            const newUser = {
                email:email,
                password:password,
                age:age,
                first_name:first_name,
                last_name:last_name,
            }
            const user = await sessionsService.registerUser(newUser)
            done(null, user)
        }catch(err){done(err.message)}
}))

passport.use('login', new LocalStrategy(
    { passReqToCallback: true , usernameField:'email'}, async (req, _u, _p, done) => {
        let { email, password } = req.body
        
        try {
            let user = await sessionsService.logInCheck(email, password)
            password = null
            done(null,user)
        } catch (err) {
            new CustomError("Regular login failed", 401, "loginPS")
            return done(err.message)
        }
    })
)

passport.use('github', new GithubStrategy({clientID, clientSecret, callbackURL: githubCallbackUrl
  }, async (accessToken, refreshToken, profile, done) => {
    let user
    try {
        user = await sessionsService.loginGithubUser(profile._json.login)
        if(!user){
            user = await sessionsService.registerGithubUser(profile._json.login, profile._json.name)
        }
    } catch (error) {
        console.log("error Passport: "+ error.message)
    }
    done(null, user)
  }))

passport.serializeUser((user, next) => { next(null, user) }) 
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

export const autenticationRegister = passport.authenticate('register',{failWithError:true})
export const autenticationLogin = passport.authenticate('login', {failWithError: true})
export const autenticationLoginGh = passport.authenticate('github', {failWithError: true})