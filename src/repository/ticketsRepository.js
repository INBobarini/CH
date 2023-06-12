import { ticketsDAOMongoose } from "../DAO/DaoMongoose/ticketsDaoMongoose.js";

class TicketsRepository {
    constructor(dao){
        this.dao=dao
    }
    async createTicket(amount, purchaser){//{{}}
        const ticketData = {amount:amount,purchaser:purchaser}
        return await this.dao.create(ticketData)
    }
}

export const ticketsRepository = new TicketsRepository(ticketsDAOMongoose)