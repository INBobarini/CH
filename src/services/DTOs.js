export class User{
    constructor (user){
        this.email = user.email
        this.full_name = user.first_name + " " + user.last_name,
        this.age = user.age
        this.role = user.role
    }
}