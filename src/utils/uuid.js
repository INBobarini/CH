import {v4 as uuidv4} from 'uuid'

class Uuid {
    constructor(){
        this.uuid = uuidv4()
    }
    toString(){
        return this.uuid
    }
}

export {Uuid}