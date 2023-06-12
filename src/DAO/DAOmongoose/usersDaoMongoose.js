import { DAOMongoose } from "./_DaoMongoose.js";
import { usersModel } from "../../models/usersModel.js";


class UsersDAOMongoose extends DAOMongoose{
    constructor (model) {super(model)}
}

export const usersDAOMongoose = new UsersDAOMongoose(usersModel)

//TESTS
/*
let newUser = await usersDAOMongoose.create({
    email: "jbalenciaga@gmail.com",
    password: "$2b$10$8tiBVxa2n6simFou6Jdiz.kfk4fmUCXj/KrOHEjQD9p3t1YuZxoA2",
    first_name: "Juana",
    last_name: "Balenciaga",
    age: 42,
    role: "admin",
    cart: "6480f905a1688af886866d60"
    }
)
console.log(newUser)
*/
//let foundUser = await usersDAOMongoose.readOne({_id:"6482168b4ee81d40f73e34a8"})
//console.log(foundUser)

//let foundUsers = await usersDAOMongoose.readMany()
//console.log(foundUsers)

//let updUser = await usersDAOMongoose.updateOne({_id:"6482168b4ee81d40f73e34a8"},{first_name: "Josefa"})
//console.log(updUser)

//let delUser = await usersDAOMongoose.deleteOne({_id:"6482168b4ee81d40f73e34a8"})
//console.log(delUser)