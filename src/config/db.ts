import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config()

const pool = new Pool({
    //connection
    host: process.env.DB_HOST,
    port: Number(process.env.PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    //behavior
    max: 10,
    min: 2,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    allowExitOnIdle: false

})

export default pool