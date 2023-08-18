import assert from 'node:assert'

import {createHash, isValidPassword} from '../../src/utils.js'

describe.only('Cryptography service', ()=>{
    it ('encrypts a given password', ()=>{
        let password = '123456as'
        let hashedPw = createHash(password)
        assert.notEqual(password, hashedPw)
    })
    it ('returns true if two passwords are equal', ()=>{
        let passwordToCheck = '123456as'
        let user = {}
        user.password = createHash('123456as')
        assert.ok(isValidPassword(user, passwordToCheck))
    })
})