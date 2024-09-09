import cors from 'cors'
import express from 'express'
import { router } from './routes'
import 'dotenv/config'

const server = express()

server.use(cors({
    origin: process.env.ENABLED_CORS?.split(';') || []
}))

server.use(express.json())

server.use(router)

server.listen(process.env.PORT || 3333, () => console.log('HTTP Server Running! 🚀'))