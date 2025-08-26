 
import path from "path";
import dotenv from "dotenv";

dotenv.config({path: path.join(process.cwd(), '.env')})

const config = {
    port: process.env.PORT,
    database_url : process.env.DATABASE_URL,
    jwt_secret: process.env.JWT_SECRET, 
    refresh_secret: process.env.REFRESH_SECRET,
    NODE_ENV: process.env.NODE_ENV
}

export default config;