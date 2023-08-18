import mongoose from 'mongoose'

const CNX_STR = 'mongodb://localhost:27017/testDb'

export const mochaHooks = {
    async beforeAll(){
        await mongoose.connect(CNX_STR)
    },
    async afterAll(){
        await mongoose.connection.dropDatabase(),
        awaitmongoose.connection.close()
    }
}