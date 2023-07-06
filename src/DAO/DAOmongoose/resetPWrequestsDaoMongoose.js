import { DAOMongoose } from "./_DaoMongoose.js";
import { resetPWRequestModel } from "../../models/resetPwRequestsModel.js";


class ResetPWRequestsDAOMongoose extends DAOMongoose{
    constructor (model) {super(model)}
}

export const resetPWRequestsDAOMongoose = new ResetPWRequestsDAOMongoose(resetPWRequestModel)



