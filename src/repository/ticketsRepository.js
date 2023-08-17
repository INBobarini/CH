import { dao } from "../DAO/daosFactory.js";

class TicketsRepository {
    constructor(dao){
        this.dao = dao
    }
    async createTicket(amount, purchaser){
        const ticketData = {amount:amount,purchaser:purchaser}
        return await this.dao.create(ticketData)
    }
    async readTickets(purchaser){
        return await this.dao.readMany({purchaser:purchaser.email})
    }
}

export const ticketsRepository = new TicketsRepository(dao.tickets)