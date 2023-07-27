import { usersModel, usersGithubModel } from "../models/usersModel.js"
import {createHash, isValidPassword} from "../utils.js"
import { cartsRepository } from "../repository/cartsRepository.js"
import {config} from '../config/config.js'
import * as DTOs from "./DTOs.js"
import { winstonLogger as logger} from '../utils/winstonLogger.js'
import { usersDAOMongoose } from "../DAO/DaoMongoose/usersDaomongoose.js"
import { usersRepository } from "../repository/usersRepository.js"
import { CustomError } from "../models/errors/customError.js"

export async function registerGithubUser(userGithubLogin, userGithubName){
    let user = {userLogin:userGithubLogin, first_name:userGithubName}
    let cart = await cartsRepository.createCart()
    user.cart = cart._id 
    const newUser = await this.create(user)
    return newUser
}
export async function loginGithubUser(userGithubLogin){
    const user = await usersRepository.getUser({userLogin:userGithubLogin})
    return user
}
export async function registerUser(user){//create hash to the new password
    user.password = createHash(user.password)
    let cart = await cartsRepository.createCart()
    user.cart = cart._id 
    const newUser = await usersRepository.createUser(user)
    return newUser
}
export async function logInCheck(email, password) { // hash compare of paswords
    //check if is an admin
    let admin = await checkAdmin(email, password)
    if (admin) {return admin}
    usersDAOMongoose
    //let existingUser = await usersModel.findOne({ email: email } ); 
    let existingUser = await usersRepository.getUser({ email: email })
    logger.info(`User from repo is: ${existingUser.email}`)
    if(!isValidPassword(existingUser, password)){
        logger.warning(`password is incorrect for ${email}`)
        existingUser = null
        return new CustomError ("Incorrect password", 401)
    }
    await updateLastConnection(email)
    return existingUser? existingUser : null //careful with this null
}

export async function getUserData(user){
    let result = await usersRepository.getUser({email:user.email})
    let userDTO = new DTOs.User(result) 
    return userDTO 
}
export async function logOutUser(email){
    if (email){
        return await updateLastConnection(email)
    } 
    return new CustomError(`logout unsuccesful for email: ${email} `, 400)
}
async function checkAdmin(email, password){
    const admins = [{
        email:config.adminName, password:config.adminPassword,
    }]
    let admin = admins.find(e => e.email === email && e.password === password);
    if(admin){
        admin.role = "admin"
        admin.first_name = "adminCoderHouse"
        return admin
    }
}
async function updateLastConnection(email){
    let result = await usersRepository.updateUser(
        {email:email},{last_connection:Date.now()})
    return result
}
