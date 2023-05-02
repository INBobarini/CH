import { usersModel } from "../models/usersSchema.js"


class sessionManager{
    constructor(){//puede convenir instanciar la clase con el model

    }

    async registerUser(user){
        const newUser = await usersModel.create(user)
        return newUser

    }
    async logInCheck(email, password) {
        const existingUser = await usersModel.findOne({ $and: [{ email: email }, { password: password }] });
        
        if (existingUser) {
            return existingUser
        }
        
        //if is not an user, check if it is an admin
        const admins = [{//move out and gitignore
            email:"adminCoder@coder.com", password:"adminCod3r123",
        }]
        let admin = admins.find(e => e.email === email && e.password === password);
        
        if(admin){
            admin.role = "admin"
            admin.first_name = "adminCoderHouse"
        }
        else{ admin = null}
        return admin
    }

    async getUserData(user){
        let result = await usersModel.findOne({email:user})
        return JSON.parse(JSON.stringify(result, null,'\t'))
    }
}

const sManager = new sessionManager()
export {sManager}
