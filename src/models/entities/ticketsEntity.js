import { v4 as uuid } from 'uuid';

export default class TicketEntity {
    constructor(ticket){
        this._id = uuid()
        this.code = uuid()
        this.amount = ticket.amount
        this.purchaser = ticket.purchaser
        this.purchase_datetime = new Date()
    }
    #types = {
        amount: Number, 
        purchaser: String,
    }
    #required = {
        amount: true,
        purchaser: true,
    }

    checkTypes(){//incomplete, move to a parent class
        if (this.#types){}
    }
}