import { usersModel, usersGithubModel } from "../models/usersModel.js"
import {createHash, isValidPassword} from "../../utils.js"
import {cManager} from "./cartsManagerDb.js"
import config from '../../config/config.js'

class sessionManager{
    constructor(){//puede convenir instanciar la clase con el model

    }
    async registerGithubUser(userGithubLogin, userGithubName){
        let user = {userLogin:userGithubLogin, first_name:userGithubName}
        let cart = await cManager.createOne()
        user.cart = cart._id 
        const newUser = await usersGithubModel.create(user)
        return newUser
    }

    async loginGithubUser(userGithubLogin){
        const user = await usersGithubModel.findOne({userLogin:userGithubLogin})
        return user
    }

    async registerUser(user){//create hash to the new password
        user.password = createHash(user.password)
        let cart = await cManager.createOne()
        user.cart = cart._id 
        const newUser = await usersModel.create(user)
        return newUser
    }
    async logInCheck(email, password) { // hash compare of paswords
        //check if is an admin
        const admins = [{//move out and gitignore
            email:config.adminName, password:config.adminPassword,
        }]
        let admin = admins.find(e => e.email === email && e.password === password);
        if(admin){
            admin.role = "admin"
            admin.first_name = "adminCoderHouse"
            return admin
        }
        
        let existingUser = await usersModel.findOne({ email: email } );
        if(!isValidPassword(existingUser, password)){
            existingUser = null
        }
        if (existingUser) {
            return existingUser
        }else{
            return null
        }
        
    }

    async getUserData(user){
        let result = await usersModel.findOne({email:user})
        return JSON.parse(JSON.stringify(result, null,'\t'))
    }
}

const sManager = new sessionManager()
export {sManager}
