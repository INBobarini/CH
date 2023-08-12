import { usersModel, usersGithubModel } from "../models/usersModel.js"
import {createHash, isValidPassword} from "../utils.js"
import { cartsRepository } from "../repository/cartsRepository.js"
import {config} from '../config/config.js'
import * as DTOs from "./DTOs.js"
import { winstonLogger as logger} from '../utils/winstonLogger.js'
import { usersDAOMongoose } from "../DAO/DaoMongoose/usersDaomongoose.js"
import { usersRepository } from "../repository/usersRepository.js"
import { CustomError } from "../models/errors/customError.js"
import { emailService } from "./mailerService.js"
import { productsRepository } from "../repository/productsRepository.js"

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
    //let existingUser = await usersModel.findOne({ email: email } ); 
    let user = await usersRepository.getUser({ email: email })
    logger.info(`User from repo is: ${user.email}`)
    if(!isValidPassword(user, password)){
        logger.warning(`password is incorrect for ${user.email}`)
        user = null
        return new CustomError ("Incorrect password", 401)
    }
    await updateLastConnection(user)
    return user
}

export async function getUserData(user){//userServices
    let result = await usersRepository.getUser({email:user.email})
    logger.debug("usersRepo.getUser:"+JSON.stringify(result._id))
    let userDTO = new DTOs.User(result) 
    return userDTO 
}

export async function updateUserDocuments(user, newDocs){ //userServices
    return await usersRepository.updateUserDocuments({email:user.email}, newDocs)
}

export async function getAllUsers(){
    return await usersRepository.getUsers()
}
export async function logOutUser(email){
    if (email){
        return await updateLastConnection(email)
    } 
    return new CustomError(`logout unsuccesful for email: ${email} `, 400)
}

export async function getEmailListOfInactiveUsers(timeLimit){
    if(!timeLimit) timeLimit = 24*3600*1000 
    let users = await usersRepository.getUsers()
    if (!users){
        logger.warning(`No inactive users found for ${timeLimit/3600.000} hours`)
        return []
    }
    let inactiveUsers = users.filter(e=>{
        Date.now() - e.last_connection > timeLimit
    })
    return inactiveUsers.map((e)=>e.email)
}

export async function deleteInactiveUsers(timeLimit){
    //1. Get the inactive list of users
    let emailList = await getEmailListOfInactiveUsers(timeLimit)
    //2. Notify their account deletion
    if(emailList){
        let info = await emailService.sendAccountDeletionNotice(emailList)
        let emailsToDelete = info.accepted
    //3. Delete those that received the notification, 
        return result = await usersRepository.deleteManyUsersByEmail(emailsToDelete)
    }
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
async function updateLastConnection(user){
    let result = await usersRepository.updateUser(
        {_id:user._id},{last_connection:Date.now()})
    return result
}

export async function checkDocuments(uid){
    let user = await usersRepository.getUser({_id:uid})
    let requiredDocs = [//change these hardcoded properties to match a library of documents
        "identificacion",
        "comprobante_de_domicilio",
        "comprobante_de_estado_de_cuenta"
    ]
    let result = {}
    result.missingDocs = []
    for(const reqDoc in requiredDocs){
        if (!user.documents[reqDoc]) {
            result.missingDocs.push(reqDoc)
            return result 
        }
    }
}

export async function upgradeToPremium(uid, missingDocs){
    if(!missingDocs.length)  {
        let user = await usersRepository.updateUser({_id:uid},{role:'premium'})
        return user  
    }
    return new CustomError(`Missing docs: ${missingDocs}`, 400)
     
}

export async function notifyProductDeletion(pid){
    let product = await productsRepository.getProduct(pid)
    //if(!product)
    let foundOwner = await usersRepository.getUser({owner:product.owner})
    //if(!foundOwner)
    if (foundOwner.role === "premium"){
        let result = emailService.sendProductRemotionNotice(foundOwner.email, product.title)
    }
}



