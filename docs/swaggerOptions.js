import swaggerJsdoc from 'swagger-jsdoc';


const swaggerOptions = {
    definition:{
        openapi: '3.0.1',
        info:{
            title:"E-commerce CH INB",
            description:"Entregables del curso de desarrollo web backend de CH, por Iván Bobarini"
        }
    },
    apis:['./docs/**/*.yaml']
}
export const specs = swaggerJsdoc(swaggerOptions)