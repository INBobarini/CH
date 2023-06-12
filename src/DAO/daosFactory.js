import { DAOMongoose } from "./DaoMongoose/_DaoMongoose.js";
//import { DAOFs} from "./DaoMongoose/_DaoFs.js"; 
import config from "../config/config.js"


if (config.persistence === 'MONGOOSE'){
    dao = DAOMongoose
    //carts
    //products
    //users
}
