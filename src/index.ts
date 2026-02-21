import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import pool from './config/db'


const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.get('/health', async(req,res)=>{
    try {   
        await pool.query('SELECT 1')
        res.json({
            status: 'ok',
            dd: 'connected'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: 'error',
            db: 'disconnected'
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})