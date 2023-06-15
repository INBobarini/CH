import { usersModel, usersGithubModel } from "../models/usersModel.js"
import {createHash, isValidPassword} from "../utils.js"
import { cartsRepository } from "../repository/cartsRepository.js"
import {config} from '../config/config.js'
import * as DTOs from "./DTOs.js"

export async function registerGithubUser(userGithubLogin, userGithubName){
    let user = {userLogin:userGithubLogin, first_name:userGithubName}
    let cart = await cartsRepository.createCart()
    user.cart = cart._id 
    const newUser = await this.create(user)
    return newUser
}
export async function loginGithubUser(userGithubLogin){
    const user = await usersGithubModel.findOne({userLogin:userGithubLogin})
    return user
}
export async function registerUser(user){//create hash to the new password
    user.password = createHash(user.password)
    let cart = await cartsRepository.createCart()
    user.cart = cart._id 
    const newUser = await usersModel.create(user)
    return newUser
}
export async function logInCheck(email, password) { // hash compare of paswords
    //check if is an admin
    let admin = checkAdmin(email, password)
    if (admin) {return admin}
    let existingUser = await usersModel.findOne({ email: email } );
    if(!isValidPassword(existingUser, password)){
        existingUser = null
    }
    return existingUser? existingUser : null
}

export async function getUserData(user){
    let result = await usersModel.findOne({email:user.email})
    let userDTO = new DTOs.User(result) 
    return userDTO 
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
