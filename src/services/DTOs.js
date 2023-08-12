export class User{
    constructor (user){
        this.uid = user._id
        this.email = user.email
        this.full_name = user.first_name + " " + user.last_name,
        this.age = user.age
        this.role = user.role
        this.documents = user.documents
        this.last_connection = user.last_connection
    }
}

