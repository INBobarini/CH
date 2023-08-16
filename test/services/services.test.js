import assert from 'node:assert'
import {config} from '../../src/config/config.js' 
import supertest from 'supertest'
import { productsDAOMongoose } from '../../src/DAO/DaoMongoose/productsDaoMongoose.js'


let correctProduct = {
  title: "Mesa de comedor",
  description: "Madera maciza",
  code: "843he59jd",
  price: 10000,
  stock: 5,
  status: true,
  thumbnail: "dining_table.jpeg",
  owner: "admin"
}



//-----------------------------------------------------------------------------------------------------------------

const httpClient = supertest(`http://localhost:${config.port}`)

describe.only('api rest', () => {
  
  describe('/api/productos', () => {
    /*
    beforeEach(async () => {
      await usuariosDaoMongoose.deleteMany({})
    })

    afterEach(async () => {
      await usuariosDaoMongoose.deleteMany({})
    })
    */
    describe('when given a correct product', () => {
      it('saves it correctly', async () => {
        const response = await httpClient.post('/api/productos').send()
        assert.strictEqual(response.statusCode, 201)
        assert.deepStrictEqual(response.body, resultadoEsperado)
      })
    })

    describe('GET', () => {
      
      describe('when passed no pid', () => {
        it('lists every product', async () => {
          const response = await httpClient.post('/api/productos').send(datosUsuario)
          assert.strictEqual(response.statusCode, 201)
          assert.deepStrictEqual(response.body, resultadoEsperado)
        })
      })
    })
  })

  describe('GET', () => {
    describe('cuando envio peticion y hay usuarios', () => {
      it('devuelve la coleccion de usuarios y codigo 200', async () => {

        const usuarioEnLaDB = {
          id: 'uniddementira',
          nombre: 'pepe',
          apellido: 'loco',
          email: 'pepe@loco',
          password: 'abc123',
          rol: 'user',
          mascotas: []
        }
        await usuariosDaoMongoose.create(usuarioEnLaDB)

        const response = await httpClient.get('/api/usuarios')

        assert.strictEqual(response.statusCode, 200)
        assert.deepStrictEqual(response.body, [usuarioEnLaDB])

      })
    })
  })
})

