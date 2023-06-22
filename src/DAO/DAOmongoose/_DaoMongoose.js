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
        if(!criteria){criteria={}}
        let result =  await this.#model.paginate(criteria, options
        ).then({})
        result = cleanObject(result)
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
    async updateManyWithDifferentData(updates) {//[{filter: { _id: _id },update: { key: value }}
        
        const bulkOps = updates.map(({ filter, update }) => ({
          updateOne: {
            filter,
            update
          }
        }));
        return await this.#model.bulkWrite(bulkOps);
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


/*
// Usage example
const updates = [
    {
      filter: { _id: '60c78d69c8a8d41cdd1a72a1' },
      update: { price: 10 }
    },
    {
      filter: { _id: '60c78d69c8a8d41cdd1a72a2' },
      update: { quantity: 5 }
    }
  ];

updateMultipleProducts(updates);
*/
