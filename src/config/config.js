import dotenv from 'dotenv'

dotenv.config()

export default{
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    cookieKey: process.env.COOKIE_KEY,
    sessionSecret: process.env.SESSION_SECRET,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    persistence: "MONGOOSE"//"MONGOOSE" or "FS"
}