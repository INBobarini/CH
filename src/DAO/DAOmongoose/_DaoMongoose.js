export function cleanObject(obj){
    return JSON.parse(JSON.stringify(obj,null,'\t'))
}

export class DAOMongoose{
    #model
    constructor(mongooseModel){
        this.#model = mongooseModel
    }

    get model() { return this.#model }

    
    async create (element){
        return cleanObject(await this.#model.create(element))
    }
    async readOne(criteria){
        let result = await this.#model.findOne(criteria).lean()
        if(!result) throw new Error ('NOT FOUND TO READ')
        result=cleanObject(result)
        //let noIdResult = result.map(e=>delete e._id)
        return result
    }    
    async readMany(criteria,options){
        //CRITERIA/QUERY NOT tested
        let result =  await this.#model.paginate(
            criteria,
            {
                limit:options.limit??10, 
                page:options.page??1, 
                sort:options.sort
            }
        )
        result = cleanObject(result)
        //let noIdResult = result.map(e=>delete e._id)
        return result
    }
    async updateOne(criteria, newData){
        let result= await this.#model.findByIdAndUpdate(
            criteria, 
            newData,
            { new: true, projection: { _id: 0 } }
            )
        .lean()
        if(!result) throw new Error ('NOT FOUND TO UPDATE')
        delete result._id
        return result
    }
    async updateMany(criteria, newData){
        let result = await this.#model.findByIdAndUpdate(criteria, newData)
        return result
    }
    async deleteOne(criteria){
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
    }
}



