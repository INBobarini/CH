import { DAOMongoose } from "./_DaoMongoose.js";
import { ticketsModel } from "../../models/ticketsModel.js";


class TicketsDAOMongoose extends DAOMongoose{
    constructor (model) {super(model)}
}

export const ticketsDAOMongoose = new TicketsDAOMongoose(ticketsModel)
