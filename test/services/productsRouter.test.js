import assert from 'node:assert'
import supertest from 'supertest'

import {config} from '../../src/config/config.js' 
import {productosModel} from '../../src/models/productsModel.js'

import {inputs} from '../inputs.js'
import {outputs} from '../outputs.js'
import {productsVerifications}  from '../validations/entities/productEntity.js'

const httpClient = supertest(`http://localhost:${config.port}`)

describe('/api/products',()=>{
    describe('POST', ()=>{
        describe('Sending a correct product', ()=>{
            let response
            before(async () => {
                response = await httpClient.post('/api/products')
                .send(inputs.singleProduct.ok)
            })
            after(async()=>{
                await productosModel.deleteMany({})
            })

            it('creates the product with the mandatory fields', async()=>{
                let result = new productsVerifications.Mandatory(response.body)
                assert.ok(result.okRequires)
            })
            it('creates the product with the required types', async()=>{
                let result = new productsVerifications.Types(response.body)
                assert.ok(result.okTypes)
            })
            it('status code is 201',()=>{
                assert.strictEqual(response.statusCode, 201)
            })
            //check that thumbnails is an array
        })
    })
})

describe('/api/products',()=>{
    describe('GET', ()=>{
        describe('When requesting products, and no options are given', ()=>{
            let response
            let result
            before(async () => {
                let testProds = await productosModel.insertMany(inputs.manyProducts.ok)
                if(testProds.length<10) throw new Error('failed loading test products')
                response = await httpClient.get('/api/products')
                .send()
                result = response.body
            }) 
            after(async()=>{
                await productosModel.deleteMany({})
            })
            it('retrieves an array of products inside a "payload" property', async()=>{
                assert.ok(Array.isArray(result.payload))
            })
            it('default quantity of retrieved documents is 10', async()=>{
                
                assert.equal(result.payload.length, 10)
            })
            it('has a totalPages property',()=>{
                assert.equal(result.totalPages, 2)
            })
            it('status code is 200',()=>{
                assert.strictEqual(response.statusCode, 200)
            })
        })
    })
})

describe.only('/api/products',()=>{
    describe('GET', ()=>{
        describe('When requesting for a single product', ()=>{
            let response
            let result
            before(async () => {
                let testProds = await productosModel.insertMany(inputs.manyProducts.ok)
                if(testProds.length<10) throw new Error('failed loading test products')
                response = await httpClient.get('/api/products')
                .send()
                result = response.body
            }) 
            after(async()=>{
                await productosModel.deleteMany({})
            })
            it('retrieves an array of products inside a "payload" property', async()=>{
                assert.ok(Array.isArray(result.payload))
            })
            it('default quantity of retrieved documents is 10', async()=>{
                
                assert.equal(result.payload.length, 10)
            })
            it('has a totalPages property',()=>{
                assert.equal(result.totalPages, 2)
            })
            it('status code is 200',()=>{
                assert.strictEqual(response.statusCode, 200)
            })
        })
    })
})



