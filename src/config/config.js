import dotenv from 'dotenv'
import {Command} from 'commander'

const program = new Command()
program
    .option('-db','--daomongoose', false)
    .option('-fs','--daofs', false)
    .parse()
const persistence = program.opts()

/*
const environment = new Command()
environment.option('-prod', '--production', 'production',)
const NODE_ENV = environment.opts()
*/

dotenv.config()

export const config = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    cookieKey: process.env.COOKIE_KEY,
    sessionSecret: process.env.SESSION_SECRET,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    persistence: persistence.Fs ? "FS" : "MONGOOSE", //"MONGOOSE" or "FS"
    NODE_ENV : process.env.NODE_ENV || 'development',
    LOG_LEVEL: parseInt(process.env.LOG_LEVEL||'10'),
    baseUrl: process.env.DOMAIN + ":" + process.env.PORT+"/",
    SMTP_EMAIL: process.env.SMTP_EMAIL, 
    SMTP_CREDENTIALS: process.env.SMTP_CREDENTIALS
}
