import dotenv from 'dotenv'
import {Command} from 'commander'

const program = new Command()

program
    .option('-db','--daomongoose', false)
    .option('-fs','--daofs', false)
    .parse()

const persistence = program.opts()
console.log(persistence)

dotenv.config()

export const config = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    cookieKey: process.env.COOKIE_KEY,
    sessionSecret: process.env.SESSION_SECRET,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    persistence: persistence.Fs ? "FS" : "MONGOOSE" //"MONGOOSE" or "FS"
}
