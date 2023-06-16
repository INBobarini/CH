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
    async loadData(){
        let fileContent = await fs.promises.readFile(this.path,'utf-8')
        return JSON.parse(fileContent)
    }
    async saveData(info){
        return await fs.promises.writeFile(this.path,JSON.stringify(info,null,'\t'))
    }
    async create (element){
        let info = await this.loadData()
        info.push(new this.Entity(element))
        return await this.saveData(info)
    }
    async readOne(criteria){
        //criteria={_id:id}
        let info = await this.loadData()
        return info.find((e)=>{e._id == criteria._id})
    }    
    async readMany(criteria,options){
        let info = await this.loadData()
        return info.filter((e)=>{e._id == criteria._id})
    }
    async updateOne(criteria, newData){
        //criteria={_id:id}
        let info = this.loadData()
        let i = info.findIndex((e)=>{e._id==criteria._id})
        info[i]=newData
        await this.saveData(info)
        return info[i]
    }
    async updateMany(criteria, newData){
        let info = await this.loadData()
        //this is a deletemany
        let infoToUpdate = info.map((e)=>{
            if(e._id==criteria._id){
                return null
            }
        })
        let updatedInfo = infoToUpdate.filter(e=>e!==null)
        //
        updatedInfo = updatedInfo.concat(newData)
        return await this.saveData(updatedInfo)
    }
    async updateManyWithDifferentData(updates) {//[{filter: { _id: _id },update: { key: value }}
        return new Error("not implemented for FS")
    }
    async deleteOne(criteria){
        let info = await this.loadData()
        let i = info.findIndex((e)=>{e._id==criteria._id})
        info.splice(i,1)
        return await this.saveData()
    }
}