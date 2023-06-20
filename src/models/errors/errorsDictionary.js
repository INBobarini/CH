class ArgumentError extends Error {
    constructor(description){
        super()
        this.description = description
        this.type = "Invalid argument"
        this.status = 400
    }
}

class NotFoundError extends Error {
    constructor(description){
        super()
        this.description = description
        this.type = "Not Found"
        this.status = 404
    }
}

class OtherError extends Error {
    constructor(description){
        super()
        this.description = description
        this.type = "Internal error"
        this.status = 500
    }
}

export const customError = {
    ArgumentError,
    NotFoundError,
    OtherError
}

/*
Además, generar un customizador de errores 
y crear un diccionario para tus errores
 más comunes al crear un producto, agregarlo al carrito, etc.
*/