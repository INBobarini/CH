import * as fs from 'fs'
import { v4 as uuid } from 'uuid';

export function cleanObject(obj){
    return JSON.parse(JSON.stringify(obj,null,'\t'))
}


class productEntity {
    constructor(product){
        this._id = uuid(),
        this.title = product.title,
        this.description = product.description,
        this.price = product.price,
        this.thumbnail = product.thumbnail,
        this.code = product.code,
        this.stock = product.stock
    }
    #types = {
        _id: String,
        title: String,
        description: String, 
        price: Number,
        thumbnail: String,
        code: String,
        stock: Number
    }
    #required = {
        _id: false,
        title: true,
        description: true, 
        price: true,
        thumbnail: true,
        code: true,
        stock: true
    }

    checkTypes(){
        if (this.#types){}
    }
}
export class DAOFs{
    constructor(Entity, pathToFile){
        this.Entity = Entity
        this.path = pathToFile
    }

    //get model() { return this.#model }
    
    async create (element){
        let fileContent = await fs.promises.readFile(this.path,'utf-8')
        let info = JSON.parse(fileContent)
        info.push(new this.Entity(element))
        let updatedInfo = await fs.promises.writeFile(this.path,JSON.stringify(info,null,'\t'))
        return updatedInfo 
    }
    async readOne(criteria){
        /*let result = await this.#model.findOne(criteria).lean()
        if(!result) throw new Error ('NOT FOUND TO READ')
        result=cleanObject(result)
        //let noIdResult = result.map(e=>delete e._id)
        return result*/
        //
    }    
    async readMany(criteria,options){
        /*if(!criteria){criteria={}}
        let result =  await this.#model.paginate(criteria, options
        ).then({})
        result = cleanObject(result)
        return result*/
    }
    async updateOne(criteria, newData){
        /*let result= await this.#model.findByIdAndUpdate(
            criteria, 
            newData,
            { new: true, projection: { _id: 0 } }
            )
        .lean()
        if(!result) throw new Error ('NOT FOUND TO UPDATE')
        delete result._id
        return result*/
    }
    async updateMany(criteria, newData){
        /*let result = await this.#model.findByIdAndUpdate(criteria, newData)
        return result*/
    }
    async updateManyWithDifferentData(updates) {//[{filter: { _id: _id },update: { key: value }}
        /*
        const bulkOps = updates.map(({ filter, update }) => ({
          updateOne: {
            filter,
            update
          }
        }));
        return await this.#model.bulkWrite(bulkOps);
        */
      }

    async deleteOne(criteria){
        /*
        let result = await this.#model.findOneAndDelete(
            criteria, 
            { projection: { _id: 0 } }
            )
        .lean()
        if (!result) throw new Error('NOT FOUND TO DELETE')
        delete result._id
        return result
    }   
    async deleteMany(criteria) {
        await this.#model.deleteMany(criteria)
        */
    }
}